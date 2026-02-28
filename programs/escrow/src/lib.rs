use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU");

#[program]
pub mod escrow {
    use super::*;

    /// Maker (buyer) deposits amount into PDA vault, records taker (payee) and timeout.
    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        amount: u64,
        timeout: i64,
    ) -> Result<()> {
        require!(amount > 0, EscrowError::ZeroAmount);

        let clock = Clock::get()?;
        let escrow = &mut ctx.accounts.escrow;
        escrow.maker = ctx.accounts.maker.key();
        escrow.taker = ctx.accounts.taker.key();
        escrow.amount = amount;
        escrow.timeout = clock.unix_timestamp + timeout;
        escrow.is_released = false;
        escrow.bump = ctx.bumps.escrow;

        // Transfer from maker ATA to vault PDA
        let cpi_accounts = Transfer {
            from: ctx.accounts.maker_token.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
            authority: ctx.accounts.maker.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        emit!(EscrowInitialized {
            escrow: escrow.key(),
            maker: escrow.maker,
            taker: escrow.taker,
            amount,
            timeout: escrow.timeout,
        });

        Ok(())
    }

    /// Taker (payee) claims funds after confirmation (e.g., service delivered).
    pub fn release(ctx: Context<Release>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;
        require!(!escrow.is_released, EscrowError::AlreadyReleased);

        let amount = escrow.amount;
        let maker_key = escrow.maker;
        let taker_key = escrow.taker;
        let bump = escrow.bump;

        // Use PDA seeds to sign CPI transfer from vault to taker
        let seeds = &[
            b"escrow",
            maker_key.as_ref(),
            taker_key.as_ref(),
            &[bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.taker_token.to_account_info(),
            authority: ctx.accounts.escrow.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        token::transfer(cpi_ctx, amount)?;

        let escrow = &mut ctx.accounts.escrow;
        escrow.is_released = true;

        emit!(EscrowReleased {
            escrow: escrow.key(),
            amount,
        });

        Ok(())
    }

    /// Maker refunds if timeout has elapsed.
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;
        require!(!escrow.is_released, EscrowError::AlreadyReleased);

        let clock = Clock::get()?;
        require!(clock.unix_timestamp >= escrow.timeout, EscrowError::TimeoutNotReached);

        let amount = escrow.amount;
        let maker_key = escrow.maker;
        let taker_key = escrow.taker;
        let bump = escrow.bump;

        // Use PDA seeds to sign CPI transfer back to maker
        let seeds = &[
            b"escrow",
            maker_key.as_ref(),
            taker_key.as_ref(),
            &[bump],
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.maker_token.to_account_info(),
            authority: ctx.accounts.escrow.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        token::transfer(cpi_ctx, amount)?;

        emit!(EscrowRefunded {
            escrow: escrow.key(),
            amount,
        });

        Ok(())
    }
}

// ---------------------------------------------------------------------------
// State Account
// ---------------------------------------------------------------------------

#[account]
#[derive(InitSpace)]
pub struct Escrow {
    pub maker: Pubkey,          // buyer / payer
    pub taker: Pubkey,          // payee / receiver
    pub amount: u64,
    pub timeout: i64,           // unix timestamp
    pub is_released: bool,
    pub bump: u8,
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

#[event]
pub struct EscrowInitialized {
    pub escrow: Pubkey,
    pub maker: Pubkey,
    pub taker: Pubkey,
    pub amount: u64,
    pub timeout: i64,
}

#[event]
pub struct EscrowReleased {
    pub escrow: Pubkey,
    pub amount: u64,
}

#[event]
pub struct EscrowRefunded {
    pub escrow: Pubkey,
    pub amount: u64,
}

// ---------------------------------------------------------------------------
// Account Structs
// ---------------------------------------------------------------------------

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct InitializeEscrow<'info> {
    #[account(
        init,
        payer = maker,
        space = 8 + Escrow::INIT_SPACE,
        seeds = [
            b"escrow",
            maker.key().as_ref(),
            taker.key().as_ref(),
        ],
        bump
    )]
    pub escrow: Account<'info, Escrow>,

    #[account(mut)]
    pub maker: Signer<'info>,

    /// CHECK: taker is any account (payee), no constraint needed
    pub taker: UncheckedAccount<'info>,

    #[account(
        mut,
        constraint = maker_token.mint == mint.key(),
        constraint = maker_token.owner == maker.key()
    )]
    pub maker_token: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = maker,
        associated_token::mint = mint,
        associated_token::authority = escrow
    )]
    pub vault: Account<'info, TokenAccount>,

    pub mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, anchor_spl::associated_token::AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Release<'info> {
    #[account(
        mut,
        seeds = [
            b"escrow",
            escrow.maker.as_ref(),
            escrow.taker.as_ref(),
        ],
        bump = escrow.bump,
        has_one = taker,
    )]
    pub escrow: Account<'info, Escrow>,

    #[account(mut)]
    pub taker: Signer<'info>,

    #[account(
        mut,
        constraint = taker_token.mint == mint.key(),
        constraint = taker_token.owner == taker.key()
    )]
    pub taker_token: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = escrow
    )]
    pub vault: Account<'info, TokenAccount>,

    pub mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(
        mut,
        seeds = [
            b"escrow",
            escrow.maker.as_ref(),
            escrow.taker.as_ref(),
        ],
        bump = escrow.bump,
        has_one = maker,
    )]
    pub escrow: Account<'info, Escrow>,

    #[account(mut)]
    pub maker: Signer<'info>,

    #[account(
        mut,
        constraint = maker_token.mint == mint.key(),
        constraint = maker_token.owner == maker.key()
    )]
    pub maker_token: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = escrow
    )]
    pub vault: Account<'info, TokenAccount>,

    pub mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
}

#[error_code]
pub enum EscrowError {
    #[msg("Amount must be greater than zero")]
    ZeroAmount,
    #[msg("Timeout not reached yet")]
    TimeoutNotReached,
    #[msg("Escrow already released")]
    AlreadyReleased,
}
