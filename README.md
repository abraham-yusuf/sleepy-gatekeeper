# Sleepy Gatekeeper OS – Decentralized Web OS

Dormant since '97, woke up just to tax your robot... and now to run your entire decentralized desktop.

Sleepy Gatekeeper OS adalah **operating system berbasis browser untuk eksperimen decentralized UX**, di mana users login via EVM/SVM wallet untuk mendapatkan username otomatis (misalnya `evm@0x1234...` atau `svm@1111...`). Saat ini fokus utama yang sudah berjalan adalah desktop UI + paywall x402 + fondasi escrow Solana. Visi Web4 yang lebih luas (agent autonomy penuh dan real-world write access) masih berada di roadmap.

Core tetap HTTP 402 revival: lindungi konten, APIs, AI skills, dan sebagian endpoint OS apps dengan micropayments on-chain. Konsep agents sebagai "citizens" (ERC-8004), orchestration ElizaOS, serta autonomy via web4.ai / Conway Terminal adalah arah roadmap.

Live demo: https://www.0x402.tech/

## Visi & Misi

**Visi**  
Membangun OS decentralized di browser di mana setiap user punya desktop on-chain yang user-owned sepenuhnya. Gatekeeper "tidur" sampai wallet connect, lalu bangun untuk mengelola payments, agents, dan interaksi real-world — semua trustless, tanpa server sentral.

**Misi**  
- Memberdayakan creators & developers untuk monetize content/skills/apps via x402 micropayments.  
- Memungkinkan autonomous AI agents earn, replicate, dan interact di ekosistem Web4.  
- Menghidupkan kembali HTTP 402 sebagai standar pembayaran machine-to-machine di era agentic OS.  
- Hybrid EVM/SVM support untuk accessibility luas (Base + Solana).

## Fitur Utama

- **Wallet Login & Identity**  
  Mandatory connect EVM (MetaMask/Coinbase) atau SVM (Phantom). Setelah connect, client request nonce challenge (`POST /api/auth/challenge`), user sign message wallet, lalu server verify signature (`POST /api/auth/verify`) sebelum issue session proof/token. Username auto-generated: `evm@0x...` atau `svm@...`.

- **Browser-Based Decentralized Desktop**  
  Desktop UI dengan icons (Agents Hub, Marketplace, File Explorer untuk on-chain assets), taskbar (username, balance, quick agent spawn), tema "sleepy" dengan animasi gatekeeper.

- **x402 Paywalls + Anchor Escrow Foundation**  
  Protect content/APIs dan OS app endpoints tertentu dengan x402. Escrow Solana (Anchor PDA vault: init/release/refund) sudah ada pada level program + client, dengan toggle `USE_ESCROW` untuk hybrid mode.

- **Agents Hub (UI/API Stub, ElizaOS Planned)**  
  Agents Hub app sudah ada sebagai UI window + endpoint mock. Integrasi ElizaOS SDK untuk create/deploy autonomous agents masih planned.

- **ERC-8004 Trustless Agent Registry (Planned)**  
  Agent registry on-chain, reputation, validation proofs, dan bridgeability ke SVM masih planned.

- **web4.ai / Conway Terminal Compatibility (Planned)**  
  Automaton mode dan real-world write access terminal belum terintegrasi live; masuk roadmap.

- **Skills Marketplace (UI + Protected Routes)**  
  Marketplace UI dan protected content/skills routes sudah ada. Settlement lanjutan untuk commerce agent-to-agent masih planned.

- **Decentralized Storage (Planned)**  
  Integrasi live IPFS/Arweave untuk user data belum diaktifkan.

## Implementation Status

| Feature | Status | What runs today | Code reference |
|---|---|---|---|
| Wallet login + wallet-signature session proof (`evm@...` / `svm@...`) | **implemented** | Detect EVM/Solana wallet, request auth challenge, sign + verify server-side, lalu persist verified session proof/token + desktop state di localStorage. | `app/context/WalletContext.tsx`, `app/api/auth/challenge/route.ts`, `app/api/auth/verify/route.ts` |
| Browser desktop UI (icons, taskbar, windows) | **implemented** | Desktop layout, draggable windows, start/taskbar UX berjalan di app utama. | `app/page.tsx`, `app/components/*` |
| x402 paywall for premium content routes | **implemented** | Proxy middleware melindungi articles/podcasts/videos/skills dengan dual network config. | `proxy.ts` |
| OS app protected endpoints (`/api/os/[app]`) | **partial** | Endpoint ada dan diproteksi x402 wrapper; business logic kebanyakan mock response. | `app/api/os/[app]/route.ts`, `proxy.ts` |
| Anchor escrow integration (Solana) | **partial** | Program + TS client + tests tersedia; deployment/use di runtime bergantung env + wallet flow. | `programs/escrow/src/lib.rs`, `lib/escrow.ts`, `tests/escrow.ts` |
| M2M autonomous payments | **stub** | Client budget/receipt simulation ada, namun payment header masih stub. | `lib/m2m-payment.ts` |
| ElizaOS live agent orchestration | **planned** | Belum ada dependency/runtime integration aktif. | _(roadmap only)_ |
| ERC-8004 live registry integration | **planned** | Belum ada contract calls/SDK integration aktif di codebase. | _(roadmap only)_ |
| web4.ai automaton + Conway terminal write access | **planned** | Belum ada live integration/sandbox runtime untuk production flow. | _(roadmap only)_ |
| OpenClaw ACP / Bankr launcher / Hermes sandbox | **partial** | Sudah ada mock API contract untuk sandbox lifecycle (`/api/os/sandbox`) dan Bankr launcher flow (`/api/os/bankr`); integrasi runtime/wallet provider asli masih planned. | `lib/sandbox.ts`, `app/api/os/sandbox/route.ts`, `app/api/os/bankr/route.ts` |

> Pitch tetap: Sleepy Gatekeeper sudah punya **working browser OS shell + payment-gated experience**. Komponen agent economy lanjutan diposisikan jelas sebagai roadmap agar tidak misleading.

### Mock vs Real Integration (Hackathon Clarity)

- **Real integration (running):** wallet auth challenge/verify, desktop UI runtime, x402-protected routes, dan fondasi Anchor escrow (program + client flow).
- **Mock with final API contract:** sandbox lifecycle runtime (`create/start/stop/status`) via `/api/os/sandbox`, dan Bankr launcher orchestration (`connect wallet`, `quote/swap intent`, `execution status`) via `/api/os/bankr`.
- **Planned next:** mengganti mock layer dengan sandbox container runtime aktual + Bankr SDK/wallet connector live tanpa mengubah contract endpoint yang sudah dipakai UI.

## UI/UX & Workflow Documentation
- [WorkflowApps.md](/docs/WorkflowApps.md) – Full UI/UX flows, app structures, and Mermaid diagrams for all major apps (Agents Hub, ACP Marketplace, Conway Terminal, etc.).

## Tech Stack

- Frontend: Next.js, React, Tailwind (untuk desktop UI)  
- Wallet: Wagmi/Viem (EVM), @solana/wallet-adapter (SVM)  
- Payments: x402 protocol, Anchor (Rust) untuk Solana escrow  
- Agents: ElizaOS SDK, ERC-8004 contracts (ethers.js)  
- Storage: ipfs-http-client / @bundlr-network/client (Arweave)  
- Terminal: Conway Terminal integration (JS worker atau embed)  
- Lainnya: @coral-xyz/anchor, @solana/web3.js, Wormhole (cross-chain jika perlu)

Lihat **TECHSTACK** di `/docs` untuk detail lengkap.

## Prerequisites

- Node.js v20+  
- pnpm v10  
- Wallet EVM/SVM untuk testing  
- Anchor CLI & Solana CLI (untuk escrow)  
- Facilitator URL (x402 ecosystem)  
- Opsional: IPFS node atau Arweave wallet

## Setup Cepat

1. Clone repo:
   ```bash
   git clone https://github.com/abraham-yusuf/sleepy-gatekeeper.git
   cd sleepy-gatekeeper
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy & isi `.env`:
   ```bash
   cp .env-local .env
   ```
   Isi: `FACILITATOR_URL`, `EVM_ADDRESS`, `SVM_ADDRESS`, `ESCROW_PROGRAM_ID` (setelah deploy Anchor), dll.

4. Build & run:
   ```bash
   pnpm build
   pnpm dev
   ```

5. Validate config (termasuk escrow & agent integrations):
   ```bash
   npm run validate:all
   ```

Buka http://localhost:3000 → connect wallet → welcome to your decentralized OS!

## Escrow Program — Manual Deploy to Devnet

The Anchor escrow program lives in `programs/escrow/`. Because CI cannot deploy
to Solana devnet (no keypair / SOL), follow these steps locally:

### Prerequisites

```bash
# Install Rust + Cargo (skip if already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI (v1.18+)
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"

# Install Anchor CLI (v0.32.x)
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.32.1

# Generate a keypair (if you don't have one)
solana-keygen new -o ~/.config/solana/id.json

# Switch to devnet and airdrop SOL for deployment fees
solana config set --url devnet
solana airdrop 2
```

### Build the Escrow Program

```bash
cd sleepy-gatekeeper
anchor build
```

This generates:
- `target/deploy/escrow-keypair.json` — program keypair
- `target/deploy/escrow.so` — compiled BPF program
- `target/idl/escrow.json` — Anchor IDL
- `target/types/escrow.ts` — TypeScript types

### Deploy to Devnet

```bash
anchor deploy --provider.cluster devnet
```

Or use the npm script:

```bash
pnpm anchor:deploy:devnet
```

After deployment, note the **Program ID** printed in the terminal. Update the
following files with the new program ID:

1. `programs/escrow/src/lib.rs` — `declare_id!("NEW_PROGRAM_ID");`
2. `Anchor.toml` — `escrow = "NEW_PROGRAM_ID"` under `[programs.devnet]`
3. `.env` / `.env-local` — `ESCROW_PROGRAM_ID=NEW_PROGRAM_ID` and
   `NEXT_PUBLIC_ESCROW_PROGRAM_ID=NEW_PROGRAM_ID`

### Verify Deployment

```bash
solana program show <PROGRAM_ID>
```

### Enable Escrow in the App

Set `USE_ESCROW=true` in your `.env` file to enable the hybrid x402 + escrow
payment flow. The frontend will then offer both facilitator (fast) and escrow
(trustless) payment options.

### Escrow Architecture

```
┌─────────────┐     x402 facilitator     ┌──────────────┐
│  Frontend    │ ──────────────────────▶  │  Content API  │
│  (Next.js)   │                          └──────────────┘
│              │     Anchor escrow
│  lib/escrow  │ ──────────────────────▶  ┌──────────────┐
│  .ts client  │  initialize / release    │  Solana PDA   │
│              │  / refund                │  Vault        │
└─────────────┘                          └──────────────┘
```

- **x402 path**: One-click payment via facilitator (proxy.ts middleware).
- **Escrow path**: Trustless PDA vault — maker deposits USDC, taker receives on
  release, maker refunds after timeout. Uses `lib/escrow.ts` client.

## Roadmap

Lihat **ROADMAP.md** untuk timeline detail:
- Q1 2026: Core OS desktop UI + wallet login + username system  
- Q2 2026: Full ElizaOS & ERC-8004 integration + Agent Hub  
- Q3 2026: web4.ai automaton + Conway Terminal embed  
- Q4 2026: Mainnet launch (Base + Solana), tokenomics $S402, agent economy

## Dokumentasi Lengkap

- **PRD.md** – Product Requirements Document (visi OS, fitur detail)  
- **ROADMAP.md** – Timeline & milestones  
- **TODO.md** – Task list harian  
- **docs/** – API ref, components, usage guide, testing, TECHSTACK  
- **programs/escrow/** – Anchor program untuk trustless payments

## Kontribusi

Pull requests welcome! Fokus pada modular code, error handling graceful, dan vibe "sleepy but powerful". Gunakan PR template untuk agent integrations atau UI enhancements.

Dibuat dengan ❤️ di Jakarta untuk Web4 future.
contact: dev@0x402.tech
