use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("6a3tn1sZrWVRn2r3F8AkERmtQsVmBNDwTwJMmArDgMk4");

#[program]
pub mod escrow {
    use super::*;

    /// Initialize an escrow: maker deposits USDC into a PDA vault.
    /// Taker (payee), amount, and timeout are recorded on-chain.
    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        amount: u64,
        timeout: i64,
    ) -> Result<()> {
        require!(amount > 0, EscrowError::ZeroAmount);

        let clock = Clock::get()?;
        require!(
            timeout > clock.unix_timestamp,
            EscrowError::TimeoutInPast
        );

        // Save escrow state
        let escrow_state = &mut ctx.accounts.escrow_state;
        escrow_state.maker = ctx.accounts.maker.key();
        escrow_state.taker = ctx.accounts.taker.key();
        escrow_state.amount = amount;
        escrow_state.timeout = timeout;
        escrow_state.is_released = false;
        escrow_state.bump = ctx.bumps.escrow_state;

        // Transfer tokens from maker's token account to vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.maker_token_account.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
            authority: ctx.accounts.maker.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

        emit!(EscrowInitialized {
            maker: ctx.accounts.maker.key(),
            taker: ctx.accounts.taker.key(),
            amount,
            timeout,
        });

        Ok(())
    }

    /// Release escrowed funds to the taker after payment confirmation.
    /// Only the maker (payer) can authorize release.
    pub fn release(ctx: Context<Release>) -> Result<()> {
        let escrow_state = &ctx.accounts.escrow_state;
        require!(!escrow_state.is_released, EscrowError::AlreadyReleased);

        let amount = escrow_state.amount;
        let maker_key = escrow_state.maker;
        let taker_key = escrow_state.taker;
        let bump = escrow_state.bump;

        // PDA signer seeds for vault authority
        let seeds: &[&[u8]] = &[
            b"escrow",
            maker_key.as_ref(),
            taker_key.as_ref(),
            &[bump],
        ];
        let signer = &[seeds];

        // Transfer tokens from vault to taker's token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.taker_token_account.to_account_info(),
            authority: ctx.accounts.escrow_state.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(
            CpiContext::new_with_signer(cpi_program, cpi_accounts, signer),
            amount,
        )?;

        // Mark as released
        let escrow_state = &mut ctx.accounts.escrow_state;
        escrow_state.is_released = true;

        emit!(EscrowReleased {
            maker: maker_key,
            taker: taker_key,
            amount,
        });

        Ok(())
    }

    /// Refund escrowed funds to the maker if timeout has elapsed.
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        let escrow_state = &ctx.accounts.escrow_state;
        require!(!escrow_state.is_released, EscrowError::AlreadyReleased);

        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp >= escrow_state.timeout,
            EscrowError::TimeoutNotReached
        );

        let amount = escrow_state.amount;
        let maker_key = escrow_state.maker;
        let taker_key = escrow_state.taker;
        let bump = escrow_state.bump;

        // PDA signer seeds for vault authority
        let seeds: &[&[u8]] = &[
            b"escrow",
            maker_key.as_ref(),
            taker_key.as_ref(),
            &[bump],
        ];
        let signer = &[seeds];

        // Transfer tokens from vault back to maker's token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.maker_token_account.to_account_info(),
            authority: ctx.accounts.escrow_state.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(
            CpiContext::new_with_signer(cpi_program, cpi_accounts, signer),
            amount,
        )?;

        emit!(EscrowRefunded {
            maker: maker_key,
            taker: taker_key,
            amount,
        });

        Ok(())
    }
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

#[account]
#[derive(InitSpace)]
pub struct EscrowState {
    pub maker: Pubkey,
    pub taker: Pubkey,
    pub amount: u64,
    pub timeout: i64,
    pub is_released: bool,
    pub bump: u8,
}

// ---------------------------------------------------------------------------
// Account validation structs
// ---------------------------------------------------------------------------

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,

    /// CHECK: The taker (payee) — validated only as a pubkey; no signature needed at init time.
    pub taker: UncheckedAccount<'info>,

    pub mint: Account<'info, Mint>,

    #[account(
        init,
        payer = maker,
        space = 8 + EscrowState::INIT_SPACE,
        seeds = [b"escrow", maker.key().as_ref(), taker.key().as_ref()],
        bump,
    )]
    pub escrow_state: Account<'info, EscrowState>,

    #[account(
        init,
        payer = maker,
        token::mint = mint,
        token::authority = escrow_state,
        seeds = [b"vault", escrow_state.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = maker_token_account.owner == maker.key() @ EscrowError::InvalidTokenOwner,
        constraint = maker_token_account.mint == mint.key() @ EscrowError::InvalidMint,
    )]
    pub maker_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Release<'info> {
    #[account(
        mut,
        constraint = maker.key() == escrow_state.maker @ EscrowError::Unauthorized,
    )]
    pub maker: Signer<'info>,

    #[account(
        mut,
        seeds = [b"escrow", escrow_state.maker.as_ref(), escrow_state.taker.as_ref()],
        bump = escrow_state.bump,
    )]
    pub escrow_state: Account<'info, EscrowState>,

    #[account(
        mut,
        seeds = [b"vault", escrow_state.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = taker_token_account.owner == escrow_state.taker @ EscrowError::InvalidTokenOwner,
        constraint = taker_token_account.mint == vault.mint @ EscrowError::InvalidMint,
    )]
    pub taker_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(
        mut,
        constraint = maker.key() == escrow_state.maker @ EscrowError::Unauthorized,
    )]
    pub maker: Signer<'info>,

    #[account(
        mut,
        seeds = [b"escrow", escrow_state.maker.as_ref(), escrow_state.taker.as_ref()],
        bump = escrow_state.bump,
    )]
    pub escrow_state: Account<'info, EscrowState>,

    #[account(
        mut,
        seeds = [b"vault", escrow_state.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = maker_token_account.owner == escrow_state.maker @ EscrowError::InvalidTokenOwner,
        constraint = maker_token_account.mint == vault.mint @ EscrowError::InvalidMint,
    )]
    pub maker_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

// ---------------------------------------------------------------------------
// Custom errors
// ---------------------------------------------------------------------------

#[error_code]
pub enum EscrowError {
    #[msg("Amount must be greater than zero")]
    ZeroAmount,
    #[msg("Escrow has already been released")]
    AlreadyReleased,
    #[msg("Timeout has not been reached yet")]
    TimeoutNotReached,
    #[msg("Timeout must be in the future")]
    TimeoutInPast,
    #[msg("Unauthorized: signer does not match expected authority")]
    Unauthorized,
    #[msg("Token account owner mismatch")]
    InvalidTokenOwner,
    #[msg("Token mint mismatch")]
    InvalidMint,
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

#[event]
pub struct EscrowInitialized {
    pub maker: Pubkey,
    pub taker: Pubkey,
    pub amount: u64,
    pub timeout: i64,
}

#[event]
pub struct EscrowReleased {
    pub maker: Pubkey,
    pub taker: Pubkey,
    pub amount: u64,
}

#[event]
pub struct EscrowRefunded {
    pub maker: Pubkey,
    pub taker: Pubkey,
    pub amount: u64,
}
