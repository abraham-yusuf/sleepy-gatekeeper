# Sleepy Gatekeeper Roadmap

Dormant since '97, reviving payments for the AI agent era. This roadmap outlines key milestones, focusing on Solana integration, AI agents, and trustless features like Anchor escrow.

## Phase 1: MVP (Current - Q1 2026)
- x402 payments on EVM (Base Sepolia) and SVM (Solana Devnet).
- Protected routes for articles and APIs.
- Facilitator integration for HTTP 402 flows.
- Basic AI skills in .agents/.claude/etc.
- Validation scripts for config/routes.

## Phase 2: Enhancements (Q1-Q2 2026)
- **Anchor Escrow Integration (New Milestone)**: Add on-chain escrow for Solana payments to make settlements trustless.
  - Q1: Develop and deploy Anchor program (init/release/refund).
  - Q2: Integrate to proxy/withX402, hybrid with facilitator.
  - Vibe: Simple Rust program, TS client. AI agents trigger releases for automated creator payouts.
  - Target: Graveyard Hackathon submission (resurrect trustless escrows).
- Solana and Base mainnet launch.
- Bot AI agent for monitoring creator activity (e.g., payment settlements).
- Expand protected content: Add music/art/NFT/articles/videos/podcasts paywalls.

## Phase 3: Marketplace & Scaling (Q3 2026+)
- Skills marketplace: Sell/buy AI skills/tools via x402 + escrow.
- Onchain social features: Gated feeds with escrow-backed access.
- Gaming/DAO integrations: Escrow for in-game/in-group transactions.
- Future: Multi-chain escrow (extend to EVM via Wormhole), AI-optimized payments.

Timeline subject to community feedback. Contributions welcome—focus on modular, test-driven code.
