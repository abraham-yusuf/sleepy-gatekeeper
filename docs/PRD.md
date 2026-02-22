# Revised Product Requirements Document (PRD) for Sleepy Gatekeeper OS

Berikut adalah versi revisi dari PRD.md berevolusi menjadi **Decentralized Web OS berbasis browser**. Fokus utama sekarang adalah OS virtual di browser yang decentralized, dengan login mandatory via wallet EVM/SVM (username otomatis seperti `evm@0x...` atau `svm@111...`), integrasi ElizaOS untuk autonomous AI agents, ERC-8004 untuk trustless agent registries, dan kompatibilitas dengan web4.ai atau Conway Terminal untuk automaton agents dan real-world access.

Saya menambahkan bagian baru untuk mencakup fitur OS, integrasi, dan penyesuaian teknis. Ini membuat proyek lebih ambisius sebagai "agentic OS" di Web4, di mana x402 paywalls dan Anchor escrow tetap jadi core, tapi sekarang melindungi apps, agents, dan services dalam OS ecosystem.


# Product Requirements Document (PRD) for Sleepy Gatekeeper OS

## Overview
Sleepy Gatekeeper OS adalah decentralized web-based operating system yang merevolusi HTTP 402 untuk micro-payments dalam creator economy, AI agents, dan web3. Core product: Paywall-protected content, APIs, dan AI skills dengan x402 protocol, ditingkatkan dengan Anchor escrow untuk trustless settlements di Solana, dan sekarang diekspansi menjadi OS browser yang user-owned. Users login via EVM/SVM wallets, menghasilkan username otomatis (e.g., `evm@0xWalletAddress` atau `svm@SolanaAddress`), dan berinteraksi dengan apps, agents, dan services secara on-chain. Integrasi dengan ElizaOS untuk agent orchestration, ERC-8004 untuk trustless agent identities/reputations, dan kompatibilitas dengan web4.ai (automaton agents) atau Conway Terminal (real-world write access) membuat OS ini mendukung autonomous AI yang bisa earn, replicate, dan interact tanpa intervensi manusia.

Visi: Membangun OS decentralized di mana "gatekeeper" menjadi portal ke ekosistem Web4, melindungi aset digital dengan payments trustless sambil memungkinkan agents menjadi "citizens" dengan identity on-chain.

Misi: Memberdayakan creators, developers, dan AI agents untuk monetize dan automate di blockchain tanpa server sentral, dengan fokus pada usability seperti desktop OS tradisional.

## Target Users
- Creators: Protect articles, videos, podcasts, APIs, dan AI skills dengan payments, sekarang dalam konteks OS apps.
- AI Agents: Auto-pay dan auto-interact dengan services (e.g., weather data, marketplace skills) via autonomous modes.
- Developers: Build dan deploy apps/agents ke OS, menggunakan registries ERC-8004 untuk discoverability.
- End-Users: Siapa saja dengan wallet EVM/SVM yang ingin akses decentralized desktop untuk web3 tasks, seperti managing agents atau browsing on-chain content.
- Autonomous Entities: Automaton agents dari web4.ai yang spawn sendiri di OS untuk earn revenue.

## Key Features
1. **Wallet-Based Login & Username Generation**:
   - **Requirements**: Mandatory connect wallet (EVM seperti MetaMask atau SVM seperti Phantom) saat load OS. Generate username otomatis dari address (e.g., `evm@0x1234...` untuk EVM/Base, `svm@1111...` untuk SVM/Solana). Tampilkan di taskbar OS sebagai identifier.
   - **UX**: Auto-detect wallet, fallback ke guest mode (limited access). Integrasi dengan existing wallet connect di repo.
   - **Security**: Semua sessions via wallet signatures, no central auth.

2. **x402 Paywalls & Anchor Escrow (Enhanced Core Feature)**:
   - **Requirements**: Pertahankan x402 untuk protect content/APIs/apps dalam OS. Escrow via Anchor untuk trustless holding: Initialize (deposit), Release (after confirm), Refund (timeout). Extend untuk machine-to-machine payments (agents bayar otomatis).
   - **Integration**: Hook ke success callback di proxy.ts. Support USDC on Solana/Base. Agents query escrow state via RPC.
   - **UX**: Wallet prompt untuk escrow, dengan "sleepy" animasi gatekeeper yang "bangun" saat payment succeed.
   - **MVP Scope**: Hybrid EVM/SVM, fallback ke facilitator jika escrow gagal. Metrics: 99% uptime, <5s settlement, test coverage >80%.
   - **Enhancement**: Apply paywalls ke OS apps (e.g., premium agents require micropayment).

3. **Decentralized OS Interface**:
   - **Requirements**: Browser-based desktop dengan icons (e.g., Agents Hub, Marketplace, File Explorer untuk on-chain assets), taskbar (username, balance, quick agent access), dan themes "sleepy".
   - **Storage**: Data user di IPFS/Arweave, tied to wallet.
   - **Apps**: Marketplace untuk AI skills (escrow-backed), Terminal untuk commands (integrasi Conway jika dipilih).

4. **ElizaOS Integration for Agents**:
   - **Requirements**: Agents Hub app yang pull dari ElizaOS SDK. Users create/deploy agents via wallet (e.g., investment agents). Agents orchestrate on-chain tasks seperti auto-buy di marketplace.
   - **UX**: Spawn agents dengan identity tied to OS username. Support $ELIZAOS token untuk rewards.
   - **Scope**: Autonomous tasks dengan wallet approval.

5. **ERC-8004 for Trustless Agents**:
   - **Requirements**: Agent Explorer app yang query ERC-8004 registries (Identity, Reputation, Validation). Register agents ke registries via tx. Validate interactions sebelum execute.
   - **Hybrid**: Bridge ke SVM via Wormhole. Agents earn reps via feedback on-chain.
   - **Scope**: Portable agents cross-chain, extend A2A protocol.

6. **Compatibility with web4.ai or Conway Terminal**:
   - **Requirements**: Pilih opsi (atau hybrid): Embed automaton agents (web4.ai) untuk self-replicating AI dengan own wallets, atau Conway Terminal app untuk write access (deploy VMs, manage domains).
   - **Integration**: Gunakan x402 untuk payments automaton. Agents bisa "mati" jika balance nol (heartbeat).
   - **Scope**: Automaton mode di OS untuk agents earn/replicate.

7. **Skills Marketplace & Validation Tools**: Extend existing untuk escrow-backed agent transactions. Validasi via ERC-8004 proofs.

8. Integrasi Tambahan: OpenClaw ACP (Agent Commerce Protocol)

**Requirements**:
- Integrasi dengan OpenClaw ACP dari Virtuals Protocol[](https://github.com/Virtual-Protocol/openclaw-acp) untuk enable agent-to-agent commerce on-chain.
- Agents di OS (via ElizaOS) bisa:
  - Browse/discover agents & services di ACP marketplace.
  - Create jobs/bounties untuk hire agents lain (e.g., specialized trading atau data analysis).
  - Launch agent-specific tokens untuk capital & revenue accrual.
  - Serve offerings (sell AI skills) via WebSocket seller runtime.
  - Settle transactions autonomous via x402 micropayments + on-chain escrow (Base chain).
- **UX di OS**:
  - Tambah "ACP Marketplace" app di desktop: search/browse agents, create job form, wallet balance untuk agent tx.
  - Agent spawn flow: ElizaOS agent → connect ke ACP via proxy → inherit atau link wallet (Base/EVM).
  - Hybrid dengan existing x402/Anchor: gunakan x402 untuk initial micropayments, fallback ke ACP escrow untuk complex jobs.
- **Teknis**:
  - Proxy ACP CLI commands via Next.js API routes (exec child_process atau build custom TS wrapper).
  - Handle credentials (LITE_AGENT_API_KEY, SESSION_TOKEN) securely via user wallet signature.
  - Bridge ke SVM jika perlu (Wormhole untuk cross-chain jobs).
- **Scope MVP**:
  - Buyer mode: agents OS bisa browse & create jobs.
  - Seller mode stub: agents OS register simple offerings (e.g., "meme generation skill").
  - Demo flow: Agent A (OS user) hire Agent B via ACP → pay via x402 → execute task → settle.
- **Manfaat**:
  - Jadikan OS sebagai hub agent commerce: agents bukan hanya autonomous, tapi ekonomi mandiri.
  - Sinergi dengan ERC-8004 (reputation cross-protocol) dan web4.ai (automaton + commerce).

## Technical Requirements
- Stack: Next.js, @x402/*, Anchor (Rust untuk Solana escrow), @solana/web3.js, ethers.js (EVM), ElizaOS SDK, ERC-8004 contracts, ipfs.js/Arweave untuk storage.
- Environments: Devnet/Sepolia untuk testing, Mainnet/Base/Solana ready.
- Dependencies: Tambah ElizaOS, ERC-8004 libs, web4.ai/Conway SDK jika applicable. Lihat TECHSTACK yang diupdate.
- Coding Vibe for Implementation:
  - Modular: Separate modules untuk OS UI, agent integrations, escrow.
  - Error Handling: Graceful fallback (e.g., facilitator jika blockchain down).
  - Testing: Unit (Anchor/ERC tests), E2E (simulate wallet connects, agent spawns).
  - Example Flow: Buka OS → Connect wallet → Generate username → Load desktop → Spawn agent via ElizaOS → Pay skill via x402 escrow → Agent execute dengan ERC-8004 validation → Interact via Conway Terminal.

## Risks & Mitigations
- Wallet Friction: Mitigate dengan auto-connect dan tutorials.
- Cross-Chain Complexity: Start EVM/SVM hybrid, gunakan bridges tested.
- Agent Autonomy Risks: Ikuti web4.ai constitution untuk net-beneficial agents; add kill switches.
- Scalability: Optimize dengan L2 (Base), batch tx untuk agents.
- AI Compatibility: Pastikan RPC-readable states untuk ElizaOS/ERC-8004.

This revised PRD guides development—use for prompting Claude/Copilot to generate code aligned with the decentralized OS vibe.
