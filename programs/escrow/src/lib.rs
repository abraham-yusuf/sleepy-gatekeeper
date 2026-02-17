use anchor_lang::prelude::*;

declare_id!("6a3tn1sZrWVRn2r3F8AkERmtQsVmBNDwTwJMmArDgMk4");

#[program]
pub mod escrow {
    use super::*;

    /// Initialize an escrow: maker deposits USDC into a PDA vault.
    /// Taker (payee), amount, and timeout are recorded on-chain.
    pub fn initialize_escrow(
        _ctx: Context<InitializeEscrow>,
        _amount: u64,
        _timeout: i64,
    ) -> Result<()> {
        // TODO: Step 2 — full implementation
        Ok(())
    }

    /// Release escrowed funds to the payee after payment confirmation.
    pub fn release(_ctx: Context<Release>) -> Result<()> {
        // TODO: Step 2 — full implementation
        Ok(())
    }

    /// Refund escrowed funds to the maker if timeout has elapsed.
    pub fn refund(_ctx: Context<Refund>) -> Result<()> {
        // TODO: Step 2 — full implementation
        Ok(())
    }
}

// ---------------------------------------------------------------------------
// Account structs (placeholders — fleshed out in Step 2)
// ---------------------------------------------------------------------------

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Release<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
}
