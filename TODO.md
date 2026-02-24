# Sleepy Gatekeeper OS – TODO List

Dormant since '97, woke up just to tax your robot... now building your decentralized desktop OS.

Ini adalah task list harian/weekly untuk evolusi ke Decentralized Web OS: wallet login → desktop UI → autonomous agents → full Web4 economy.

Gunakan format:
- [ ] = Pending
- [x] = Done
- [>] = In progress
Prioritas: High → Medium → Low

Update tanggal terakhir: February 21, 2026

## Phase 1: Core OS Foundation (Q1 2026 – Target selesai Maret 2026)

### Wallet & Identity (High Priority)
- [x] Implement mandatory wallet connect modal on first load (EVM + SVM support)
- [x] Auto-generate username dari wallet address: `evm@0x...` atau `svm@...` (truncate + ellipsis)
- [x] Simpan session state di localStorage (tied to wallet signature, no central auth)
- [x] Add network switcher di taskbar (Devnet/Sepolia → Mainnet/Base/Solana)
- [x] Handle disconnect/reconnect gracefully (reload desktop tanpa lost state)
- [x] Tutorial onboarding: "Connect wallet to wake the gatekeeper" dengan animasi sleepy → awake

### Desktop UI Basics (High Priority)
- [x] Create main layout: background (sleepy-themed gradient + subtle animation)
- [x] Implement taskbar: username display, wallet balance (USDC/SOL/ETH), clock, quick agent spawn button
- [x] Add desktop icons grid: Agents Hub, Marketplace, File Explorer, Terminal, Settings
- [x] Drag-and-drop window manager sederhana (gunakan react-draggable atau react-rnd)
- [x] Theme toggle: dark/light + "sleepy mode" (dimmed + slow animations)

### x402 + Escrow Integration (Critical – Escrow Program Masih Placeholder)
- [ ] x402 paywall UI di Skills / Articles / Podcasts / Videos (BUY button + payment prompt)  
- [ ] **Perbaiki escrow program di programs/escrow/src/lib.rs** (prioritas tertinggi sekarang)  
  - Tambah EscrowState struct (maker, taker, amount, timeout, is_released, bump)  
  - Implement PDA vault dengan seeds aman (["escrow", maker, taker, amount] atau simpler)  
  - Full logic initialize_escrow: transfer CPI ke vault, simpan state, emit event  
  - Full release: transfer vault → taker (with signer seeds), set is_released = true  
  - Full refund: check timeout via Clock, transfer kembali ke maker  
  - Tambah custom errors (ZeroAmount, AlreadyReleased, TimeoutNotReached)  
  - Tambah Anchor events (EscrowInitialized, EscrowReleased, EscrowRefunded)  
  - Constraints lengkap: #[account(seeds=..., bump), mut token accounts, has_one]  
  - Tambah checks-effects-interactions pattern (prevent reentrancy)  
- [ ] Deploy escrow ke devnet (anchor deploy --provider.cluster devnet)  
- [ ] Test end-to-end escrow dari frontend: BUY skill → call initialize_escrow → release/refund
- [ ] Integrasi escrow callback di OS: success → unlock content / agent task  
- [ ] Stub machine-to-machine payment (agent release via program-owned signer)
- [ ] Extend existing x402 proxy untuk protect OS-level apps (bukan hanya content)
- [ ] Deploy/update Anchor escrow program ke Devnet (jika belum, jika tidak bisa biar saya kerjakan manual / deploy manual)
- [ ] Implement escrow flow di frontend: init → deposit → release/refund callbacks
- [ ] Machine-to-machine payment stub: agents bisa trigger payment via wallet prompt
- [ ] Test end-to-end: paywall → escrow → unlock protected app di desktop

### Storage & Data (Medium)
- [ ] Integrate IPFS via Pinata atau web3.storage untuk user files/apps (upload/download via wallet-linked CID)  
  - Prioritas: web3.storage (gratis unlimited dev tier, Filecoin-backed) atau Pinata free tier (1GB)
- [ ] File Explorer app: list real IPFS assets tied to username (bukan placeholder folders)  
  - Upload button → pin ke IPFS → simpan CID di localStorage atau on-chain metadata  
- [ ] Optional: Encrypt files client-side sebelum pin (untuk privacy)


### Testing & Validation
- [ ] E2E test suite: wallet connect → desktop load → payment → logout
- [ ] Run `npm run validate:all` dan fix semua errors/warnings

## Phase 2: Agentic & Trustless Enhancements (Q2 2026 – Target April–Juni)

### ElizaOS Integration
- [ ] Install & configure ElizaOS SDK di frontend
- [ ] Build Agents Hub app: list existing agents, create new agent form
- [ ] Spawn agent via wallet tx (tie identity ke OS username)
- [ ] Basic agent dashboard: status, logs, tasks executed

### ERC-8004 Agent Registry
- [ ] Deploy atau connect ke ERC-8004 contracts di Base (Identity, Reputation, Validation)
- [ ] Agent Explorer app: search/discover agents by reputation/skills
- [ ] Register agent flow: wallet tx → mint Identity NFT → set initial reputation
- [ ] Validation proof check sebelum agent execute task

### Cross-Chain & Autonomy
- [ ] Implement Wormhole bridge stub untuk agent portability EVM ↔ SVM
- [ ] Heartbeat mechanism: agents check balance periodically (auto-shutdown jika nol)

### OpenClaw ACP Integration (High Priority – New)
- [ ] Clone & install openclaw-acp repo sebagai submodule atau dependency
- [ ] Build proxy API di /pages/api/acp/[command].ts: exec ACP CLI commands securely (e.g., acp browse, acp job create)
- [ ] Tambah ACP config wizard di OS Settings: input LITE_AGENT_API_KEY / SESSION_TOKEN via wallet-signed form
- [ ] Create ACP Marketplace component: UI untuk browse agents, display results dari acp browse
- [ ] Implement job creation flow: form di OS → proxy ke acp job create → sign via wallet
- [ ] Test buyer mode: ElizaOS agent trigger ACP job → pay via x402 proxy
- [ ] Handle JSON output (--json flag) untuk parse di frontend

## Phase 3: Full Agent Economy & Autonomy (Q3 2026)

### Marketplace & Economy
- [ ] Build Skills Marketplace UI: list AI skills, buy/sell via x402 escrow
- [ ] Agent auto-purchase logic (dengan approval threshold)
- [ ] Revenue dashboard untuk creators/agents

### web4.ai & Conway Integration
- [ ] Embed web4.ai automaton spawn button (self-replicating agents)
- [ ] Install Conway Terminal sebagai app di OS (JS worker atau iframe)
- [ ] Test real-world write: agent deploy simple VM via Conway

### OpenClaw ACP Advanced
- [ ] Setup seller runtime proxy: run acp serve start di background (via PM2 atau serverless cron jika possible)
- [ ] Scaffold offering template: acp sell init → customize handlers.ts untuk OS agents (e.g., "execute ElizaOS task")
- [ ] Register offering via proxy: acp sell create
- [ ] Integrate token launch: button di Agents Hub → acp token launch → display token address di dashboard
- [ ] Add revenue tracking: poll acp wallet balance → tampil di taskbar untuk agent wallets
- [ ] Security: implement rate limiting & signature checks untuk proxy API
- [ ] E2E test: agent A hire agent B via ACP → execute → settle micropayment

### Mobile & Polish
- [ ] Make OS responsive / PWA installable
- [ ] Add notifications center (agent events, payments, reputation changes)

## Backlog / Nice-to-Have (Low-Medium Priority)
- [ ] On-chain social feed (gated by x402)
- [ ] Agent leaderboard & reputation badges
- [ ] DAO voting untuk OS features
- [ ] Tokenomics $S402 integration (reward pool untuk agents/creators)
- [ ] Security audit untuk escrow + agent autonomy
- [ ] Internationalization (minimal: EN + ID)

## Catatan Harian / Quick Wins (Update setiap hari)
- [ ] Review PRD.md & README.md consistency
- [ ] Commit daily progress ke branch `dev-os`
- [ ] Test wallet connect di mobile browser
- [ ] Dokumentasikan flow baru di docs/ folder
- [ ] Tweet progress @bram0511: "Day X: Gatekeeper mulai bangun desktop decentralizednya..."

Mari kerjakan satu per satu — mulai dari wallet login & desktop UI dulu supaya bisa demo cepat.

Sleepy mode: off. Let's build.
