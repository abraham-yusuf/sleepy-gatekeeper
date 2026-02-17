# OS Sleepy Gatekeeper 402 App

Dormant since '97, woke up just to tax your robot. This is a Next.js app demonstrating payment-protected content and API routes using the x402 protocol, supporting both EVM (Base Sepolia) and SVM (Solana Devnet). It integrates AI agents, skills marketplace, and now enhances with trustless Anchor escrow for Solana payments.

## Project Roadmap

See **ROADMAP.md** for our complete product roadmap including:
- Solana and Base mainnet launch plans
- Bot AI agent integration for creator activity monitoring
- Skills marketplace for selling AI skills and tools
- Future features and timeline (now including Anchor escrow for trustless payments)

## Documentation

Comprehensive documentation is available in the `/docs` directory:
- **Documentation Index** - Complete documentation guide and navigation
- **API Reference** - Public API endpoints documentation
- **Core Functions** - Functions, utilities, and configuration reference
- **Component Documentation** - React components and pages reference
- **Usage Guide** - Step-by-step integration and usage instructions
- **Testing Guide** - Manual and automated testing procedures
- **TECHSTACK** - Documents the complete technical stack, architecture, and styling system for the Sleepy Gatekeeper 402 platform.
- **PRD.md** (new) - Product Requirements Document, including features like Anchor escrow.

## Prerequisites

- Node.js v20+ (install via [nvm](https://github.com/nvm-sh/nvm))
- pnpm v10 (install via [pnpm.io/installation](https://pnpm.io/installation))
- Valid EVM and SVM addresses for receiving payments
- URL of a facilitator supporting the desired payment network, see [facilitator list](https://www.x402.org/ecosystem?category=facilitators)
- For Solana escrow: Anchor CLI (install via `cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked`), Solana CLI, and a Devnet wallet.

## Setup

1. Copy `.env-local` to `.env`:

```bash
cp .env-local .env
```

and fill required environment variables:
- `FACILITATOR_URL` - Facilitator endpoint URL
- `EVM_ADDRESS` - Ethereum address to receive payments
- `SVM_ADDRESS` - Solana address to receive payments
- (New) `ESCROW_PROGRAM_ID` - Deployed Anchor program ID for escrow (after setup)

2. Install and build all packages:

```bash
pnpm install && pnpm build
```

3. **Validate your configuration** (recommended):

```bash
npm run validate:all
```

This will check:
- EVM and Solana addresses are properly formatted
- All protected routes support both payment networks
- Facilitator connectivity
- (New) Escrow program deployment and integration

See [TESTING.md](/abraham-yusuf/sleepy-gatekeeper/blob/main/TESTING.md) for detailed testing and validation instructions.

4. Run the server:

```bash
pnpm dev
```

## Anchor Escrow Integration (New Feature for Trustless Payments)

To make x402 payments more decentralized, we've added an optional Anchor-based escrow for Solana (SVM). This holds funds in an on-chain PDA vault during payment, releasing only after confirmation (e.g., via facilitator callback or AI agent trigger). This reduces reliance on third-party facilitators for settlement.

### Why Add This?
- Revive "trustless escrow" vibe from early crypto, aligned with HTTP 402 revival.
- Hybrid flow: Use facilitator for UX, escrow for security.
- Compatible with AI agents (e.g., agent monitors and triggers release).
- Targets Graveyard Hackathon tracks like Onchain Social or Creator Economy.

### Coding Vibe for AI Assistants (Claude Opus/Copilot)
- **Style**: Modular, builder-pattern like existing paywall in proxy.ts. Use Rust for Anchor program (simple init/release/refund instructions). TS for client integration.
- **Directory Structure**: Add `/programs/escrow` for Anchor program, `/lib/escrow.ts` for client utils.
- **Steps to Implement**:
  1. **Create Anchor Program**: In `/programs/escrow/src/lib.rs`, define accounts and instructions:
     - `InitializeEscrow`: Deposit USDC to PDA vault, set maker/taker/amount.
     - `Release`: Taker claims after payment confirm (check facilitator sig or oracle).
     - `Refund`: Timeout refund to maker.
     - Use SPL Token for USDC (Token-2022 compatible).
     - Example IDL: Generate with `anchor build`.
  2. **Deploy to Devnet**: `anchor deploy --provider.cluster devnet`.
  3. **Integrate to Proxy/Handlers**: In `proxy.ts`, after x402 success, call Anchor via `@coral-xyz/anchor`:
     ```ts
     import { AnchorProvider, Program } from "@coral-xyz/anchor";
     import { Connection, Keypair, PublicKey } from "@solana/web3.js";
     import idl from "./escrow-idl.json"; // Generated IDL

     // Setup provider
     const connection = new Connection("https://api.devnet.solana.com");
     const wallet = Keypair.fromSecretKey(/* your key */); // Or use wallet adapter
     const provider = new AnchorProvider(connection, wallet, {});

     // Load program
     const program = new Program(idl, new PublicKey(process.env.ESCROW_PROGRAM_ID!), provider);

     // Example: Initialize escrow in payment flow
     async function initEscrow(amount: number, payer: PublicKey, payee: PublicKey) {
       const [vaultPda] = PublicKey.findProgramAddressSync([Buffer.from("escrow")], program.programId);
       await program.methods.initializeEscrow(amount)
         .accounts({ payer, payee, vault: vaultPda, tokenProgram: TOKEN_PROGRAM_ID })
         .rpc();
     }

     // In paymentProxy or withX402: After facilitator confirm, call release
     async function releaseEscrow() {
       await program.methods.release()
         .accounts({ /* accounts */ })
         .rpc();
     }
     ```
  4. **Hybrid Flow**: If facilitator fails, fallback to direct escrow. For AI agents: Add skill in `.agents/skills` to monitor escrow state via Solana RPC.
  5. **Testing**: Extend `npm run validate:escrow` to deploy test program, simulate payments.
- **Dependencies**: Add `"@coral-xyz/anchor": "^0.29.0"`, `"@solana/spl-token": "^0.3.11"`.
- **Edge Cases**: Handle timeouts, multi-sig releases for DAOs, AI-triggered refunds.

## Testing & Validation

The project includes comprehensive testing and validation tools for payment processes:

### Quick Validation

```bash
# Validate all payment configurations
npm run validate:all

# Or run individual checks:
npm run validate:config       # Check addresses and facilitator URL
npm run validate:routes       # Verify routes support both networks
npm run validate:facilitator  # Test facilitator connectivity
npm run validate:escrow       # (New) Test Anchor program and integration
```

### Manual Testing

For detailed manual testing procedures, troubleshooting, and network-specific testing instructions, see **TESTING.md**. Now includes escrow-specific tests (e.g., simulate deposit/release on Devnet).

## Example Routes

(The rest remains the same as original: Article Routes, Weather API, Response Format, paymentProxy vs withX402, Extending the Example)

