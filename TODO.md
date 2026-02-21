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
- [ ] Implement mandatory wallet connect modal on first load (EVM + SVM support)
- [ ] Auto-generate username dari wallet address: `evm@0x...` atau `svm@...` (truncate + ellipsis)
- [ ] Simpan session state di localStorage (tied to wallet signature, no central auth)
- [ ] Add network switcher di taskbar (Devnet/Sepolia → Mainnet/Base/Solana)
- [ ] Handle disconnect/reconnect gracefully (reload desktop tanpa lost state)
- [ ] Tutorial onboarding: "Connect wallet to wake the gatekeeper" dengan animasi sleepy → awake

### Desktop UI Basics (High Priority)
- [ ] Create main layout: background (sleepy-themed gradient + subtle animation)
- [ ] Implement taskbar: username display, wallet balance (USDC/SOL/ETH), clock, quick agent spawn button
- [ ] Add desktop icons grid: Agents Hub, Marketplace, File Explorer, Terminal, Settings
- [ ] Drag-and-drop window manager sederhana (gunakan react-draggable atau react-rnd)
- [ ] Theme toggle: dark/light + "sleepy mode" (dimmed + slow animations)

### x402 + Escrow Integration (Medium-High)
- [ ] Extend existing x402 proxy untuk protect OS-level apps (bukan hanya content)
- [ ] Deploy/update Anchor escrow program ke Devnet (jika belum)
- [ ] Implement escrow flow di frontend: init → deposit → release/refund callbacks
- [ ] Machine-to-machine payment stub: agents bisa trigger payment via wallet prompt
- [ ] Test end-to-end: paywall → escrow → unlock protected app di desktop

### Storage & Data (Medium)
- [ ] Integrate IPFS untuk user files/apps (upload/download via wallet-linked CID)
- [ ] Arweave permanent storage option untuk critical assets (misalnya agent configs)
- [ ] File Explorer app: list on-chain/IPFS assets tied to username

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

## Phase 3: Full Agent Economy & Autonomy (Q3 2026)

### Marketplace & Economy
- [ ] Build Skills Marketplace UI: list AI skills, buy/sell via x402 escrow
- [ ] Agent auto-purchase logic (dengan approval threshold)
- [ ] Revenue dashboard untuk creators/agents

### web4.ai & Conway Integration
- [ ] Embed web4.ai automaton spawn button (self-replicating agents)
- [ ] Install Conway Terminal sebagai app di OS (JS worker atau iframe)
- [ ] Test real-world write: agent deploy simple VM via Conway

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
