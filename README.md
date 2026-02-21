# Sleepy Gatekeeper OS – Decentralized Web OS

Dormant since '97, woke up just to tax your robot... and now to run your entire decentralized desktop.

Sleepy Gatekeeper OS adalah **operating system berbasis browser yang sepenuhnya decentralized**, di mana users login via EVM/SVM wallet untuk mendapatkan username otomatis (misalnya `evm@0x1234...` atau `svm@1111...`). Ini bukan lagi sekadar payment gateway — ini adalah portal Web4: desktop virtual di browser dengan apps, autonomous AI agents, trustless paywalls (x402 + Anchor escrow), dan real-world write access.

Core tetap HTTP 402 revival: lindungi konten, APIs, AI skills, dan sekarang **seluruh OS apps** dengan micropayments on-chain. Agents menjadi "citizens" dengan identity via ERC-8004, orchestration via ElizaOS, dan autonomy via web4.ai / Conway Terminal.

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
  Mandatory connect EVM (MetaMask/Coinbase) atau SVM (Phantom). Username auto-generated: `evm@0x...` atau `svm@...`. Semua sessions via wallet signatures — no central auth.

- **Browser-Based Decentralized Desktop**  
  Desktop UI dengan icons (Agents Hub, Marketplace, File Explorer untuk on-chain assets), taskbar (username, balance, quick agent spawn), tema "sleepy" dengan animasi gatekeeper.

- **x402 Paywalls + Trustless Anchor Escrow**  
  Protect apps, content, APIs, dan agent skills. Escrow on Solana via Anchor PDA vault (init/release/refund). Hybrid: facilitator untuk UX cepat, escrow untuk security maksimal. Agents bisa auto-pay via machine-to-machine.

- **ElizaOS Integration**  
  Agents Hub app: create/deploy autonomous agents (investment, monitoring, automation) tied to OS username. Orchestrate on-chain tasks dengan ElizaOS SDK.

- **ERC-8004 Trustless Agent Registry**  
  Agent Explorer: discover agents via on-chain registries (Identity ERC-721, Reputation, Validation). Register agents Anda, earn reps via feedback, validate interactions sebelum execute. Bridgeable ke SVM.

- **web4.ai / Conway Terminal Compatibility**  
  Automaton mode: spawn self-replicating agents dengan own wallets (web4.ai). Conway Terminal app untuk real-world write access (deploy VMs, manage domains, external APIs). Agents earn revenue, heartbeat untuk survival.

- **Skills Marketplace**  
  Jual/beli AI skills & tools dengan escrow-backed payments. Agents bisa auto-beli skills untuk self-improve.

- **Decentralized Storage**  
  User data & apps disimpan di IPFS/Arweave, tied ke wallet address.

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

