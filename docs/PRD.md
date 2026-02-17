# Product Requirements Document (PRD) for Sleepy Gatekeeper

## Overview
Sleepy Gatekeeper revives HTTP 402 for micro-payments in creator economy, AI agents, and web3. Core product: Paywall-protected content/APIs with x402, now enhanced with Anchor escrow for trustless Solana settlements.

## Target Users
- Creators: Protect articles, videos, podcasts, APIs, skills with payments.
- AI Agents: Auto-pay for access (e.g., weather data, skills).
- Developers: Build on top for onchain social/gaming.

## Key Features
1. **x402 Paywalls**: As-is, with facilitator.
2. **Anchor Escrow (New Core Feature)**:
   - **Requirements**:
     - Trustless holding: Funds in PDA vault during payment.
     - Instructions: Initialize (deposit), Release (after confirm), Refund (timeout).
     - Integration: Hook into x402 success callback in proxy.ts.
     - Assets: USDC on Solana (SPL Token).
     - UX: Wallet prompt for escrow init/release.
     - Security: PDA seeds, authority checks.
     - AI Vibe: Agents query escrow state via RPC, trigger actions.
   - **MVP Scope**: Solana-only, hybrid with facilitator. No multi-sig yet.
   - **Metrics**: 99% uptime, <5s settlement, test coverage >80%.
3. **Skills Marketplace**: Pay for AI skills with escrow-backed transactions.
4. **Validation Tools**: Extend for escrow.

## Technical Requirements
- Stack: Next.js, @x402/*, Anchor (Rust), @solana/web3.js.
- Environments: Devnet for testing, Mainnet ready.
- Dependencies: See TECHSTACK.
- Coding Vibe for Implementation:
  - Modular: Separate escrow lib/program.
  - Error Handling: Graceful fallback if escrow fails (use facilitator).
  - Testing: Unit (Anchor tests), E2E (simulate payments).
  - Example Flow: User hits paywall → x402 prompt → Escrow init → Facilitator confirm → Escrow release → Content unlock.

## Risks & Mitigations
- Facilitator dependency: Mitigate with escrow fallback.
- Solana fees: Optimize instructions for low cost.
- AI Compatibility: Ensure RPC-readable states.

This PRD guides development—use for prompting Claude/Copilot to generate code aligned with vibe.
