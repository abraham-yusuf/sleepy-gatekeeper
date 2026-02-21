# Contributing to Sleepy Gatekeeper OS

Dormant since '97, woke up just to tax your robot... now building a decentralized desktop OS together.

Terima kasih sudah tertarik berkontribusi ke Sleepy Gatekeeper OS! Proyek ini sedang berevolusi dari payment gateway x402 menjadi **Decentralized Web OS** di browser: wallet login, autonomous agents, trustless paywalls, dan Web4 economy.

Kami sangat welcome kontribusi dari siapa saja — developer, designer, tester, dokumentator, atau bahkan AI agent enthusiasts. Mari bangun masa depan di mana gatekeeper menjaga seluruh desktop decentralized.

## Code of Conduct

Kami punya [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## Cara Berkontribusi

### 1. Mulai dari sini (New to open source? Mulai dari sini aja!)

- Baca [README.md](./README.md) dan [PRD.md](./PRD.md) untuk paham visi OS.
- Cek [ROADMAP.md](./ROADMAP.md) dan [TODO.md](./TODO.md) untuk lihat apa yang lagi prioritas.
- Cari issue dengan label:
  - `good first issue` → Cocok buat pemula
  - `help wanted` → Butuh kontribusi
  - `bug` / `enhancement` / `agent-integration` / `ui` / `docs`
- Jika tidak ada issue yang cocok → buka issue baru dulu!

### 2. Development Setup

Ikuti langkah di README.md:

```bash
git clone https://github.com/abraham-yusuf/sleepy-gatekeeper.git
cd sleepy-gatekeeper
pnpm install
cp .env-local .env  # isi FACILITATOR_URL, dll.
pnpm dev
```

Pastikan:
- Node.js 20+
- pnpm 10+
- Solana CLI + Anchor (untuk escrow)
- Wallet test (Devnet/Sepolia)

Jalankan tests:
```bash
pnpm test
npm run validate:all
```

### 3. Workflow Kontribusi (Standard GitHub Flow)

1. **Fork** repo ini.
2. Buat branch baru dari `main`:
   ```bash
   git checkout -b feat/wallet-login-ui    # atau fix/bug-123, docs/readme-update, dll.
   ```
   Nama branch: `type/description` (feat/, fix/, chore/, docs/, test/, refactor/)
3. Commit dengan konvensi Conventional Commits:
   - `feat: add auto username generation from wallet`
   - `fix: escrow release callback timeout`
   - `docs: update agent spawn guide`
   - `chore: update pnpm lockfile`
   Gunakan emoji opsional: 🚀 feat, 🐛 fix, 📝 docs, 🔧 chore
4. Push branch ke fork Anda.
5. Buka **Pull Request** ke `main` repo asli.
   - Gunakan template PR (akan dibuat di `.github/PULL_REQUEST_TEMPLATE.md` nanti).
   - Jelaskan apa yang diubah, kenapa, dan link ke issue jika ada.
   - Tambah screenshot/demo jika UI/agents.

### 4. Apa yang Kami Cari Kontribusi

- **High Priority Sekarang**:
  - Wallet login + auto username system
  - Desktop UI (taskbar, icons, windows)
  - OS-level x402 paywall integration
  - ElizaOS agent spawning & dashboard
  - ERC-8004 registry queries
  - Documentation & tutorials (cara spawn first agent)

- **Area Lain**:
  - Bug fixes & security patches (escrow, wallet signatures)
  - UI/UX improvements (Framer Motion animations, themes)
  - Tests (unit, integration, E2E)
  - Docs (new guides di /docs/)
  - Agent integrations (web4.ai, Conway Terminal)
  - Localization (EN → ID, atau lainnya)

### 5. Code Style & Best Practices

- Ikuti existing config: ESLint + Prettier (run `pnpm lint` & `pnpm format`)
- TypeScript strict mode
- Modular components: `/components/os`, `/components/ui`, dll.
- Error handling graceful (fallback, user-friendly messages)
- Security first:
  - Jangan hardcode private keys
  - Validasi semua input (Zod schema)
  - Wallet signatures untuk semua sensitive actions
  - Audit escrow & agent autonomy logic
- Commit kecil, atomic, mudah review

### 6. Review Process

- PR akan direview dalam 1–3 hari (tergantung complexity).
- Kami pakai label: `needs-review`, `changes-requested`, `approved`
- Jika approved → merge ke `main` (auto-deploy ke Vercel jika setup)
- Jika ada konflik → rebase atau merge `main` ke branch Anda.

### 7. Kontak & Diskusi

- Buka issue untuk diskusi fitur besar
- DM @bram0511 di X (Twitter) jika mau kolab cepat
- Join komunitas Jakarta Web3 jika mau meetup offline

Terima kasih atas kontribusinya! Setiap PR — sekecil apa pun — bikin gatekeeper semakin bangun dari tidurnya.

Sleepy mode: off. Let's build the decentralized desktop future together. 🚀

Made with ❤️ in Jakarta.
