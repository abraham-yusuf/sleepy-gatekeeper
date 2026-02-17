# Todo List
Kamu adalah senior Solana developer + Next.js expert yang paham vibe proyek Sleepy Gatekeeper: revival "dormant since '97" HTTP 402 protocol untuk micro-payments di creator economy, AI agents, dan onchain social. Proyek ini hybrid: pakai x402 facilitator untuk UX cepat (HTTP 402 responses), tapi sekarang ingin tambah trustless on-chain escrow via Anchor di Solana untuk settlement lebih decentralized (reduce reliance ke facilitator, align dengan ethos Solana & Graveyard Hackathon "resurrect dead categories" seperti trustless payments/escrow).

Repo saat ini: https://github.com/abraham-yusuf/sleepy-gatekeeper
- Core payment logic di proxy.ts (menggunakan @x402/next, @x402/core, @x402/svm untuk Solana Devnet).
- Sudah support SVM (Solana) via registerExactSvmScheme, exact-amount USDC payments.
- Tidak ada Anchor program atau on-chain code Solana native selain @x402/svm SDK.
- Docs di /docs/ (techstack.md, USAGE_GUIDE.md, API_REFERENCE.md, dll.).
- Ada ROADMAP.md dengan milestone Solana mainnet, Bot AI agent, skills marketplace.
- .env punya SVM_ADDRESS, FACILITATOR_URL.
- Dependencies: @x402/* packages, Next.js, pnpm, Turbo.

Tugas: Tambahkan fitur **Anchor-based escrow** untuk Solana payments (USDC SPL Token). Escrow ini hold funds di PDA vault selama payment process, release setelah confirm (via facilitator callback atau manual/AI trigger), refund jika timeout.

**Prioritas urutan kerja yang harus kamu kerjakan SATU PER SATU (jangan skip, output code + instruksi per step):**

1. **Setup Anchor project structure & dependencies (paling dulu!)**  
   - Tambah directory baru: /programs/escrow (atau /anchor/escrow jika lebih cocok).  
   - Init Anchor project di dalamnya: anchor init escrow --no-git (atau manual).  
   - Tambah dependencies ke root package.json: "@coral-xyz/anchor": "^0.30.1", "@solana/spl-token": "^0.4.8", "@solana/web3.js": "^1.95.3" (atau versi terbaru compatible).  
   - Tambah scripts di package.json: "anchor:build": "anchor build -- --program-name escrow", "anchor:deploy:devnet": "anchor deploy --provider.cluster devnet", "anchor:test": "anchor test".  
   - Buat .anchor/Anchor.toml jika perlu, set cluster = "devnet", wallet path.  
   - Output: Diff atau code untuk package.json, new files struktur, dan instruksi install Anchor CLI jika belum (cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked).

2. **Buat Anchor program sederhana untuk non-custodial escrow (USDC)**  
   - Di programs/escrow/src/lib.rs: Definisikan program dengan 3 instructions utama:  
     - initialize_escrow: Maker deposit USDC ke vault PDA, set maker, taker (payee), amount (u64), timeout (unix timestamp).  
     - release: Taker (atau authority) release funds ke payee setelah confirm (check signature atau simple bump).  
     - refund: Jika timeout lewat, maker refund.  
   - Gunakan SPL Token interface (Token-2022 jika possible, tapi minimal Token).  
   - PDA seeds: ["escrow", payer_pubkey.as_ref(), payee_pubkey.as_ref()] atau similar.  
   - Tambah error handling custom.  
   - Generate IDL dengan anchor build.  
   - Output: Full lib.rs code + Cargo.toml update + tests/escrow.ts basic test.

3. **Buat client-side utils untuk interact dengan escrow program (/lib/escrow.ts atau /utils/anchor-escrow.ts)**  
   - Export functions: initEscrow, releaseEscrow, refundEscrow, getEscrowState (fetch PDA data).  
   - Gunakan AnchorProvider, Program.fromIDL, wallet adapter compatible (atau Keypair untuk testing).  
   - Contoh: async function initEscrow(connection, wallet, amount, payer, payee) { ... program.methods.initializeEscrow(new BN(amount)).accounts({...}).rpc() }  
   - Handle USDC mint (hardcode devnet USDC: Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGnKJr atau fetch dynamic).  
   - Output: Full escrow.ts file.

4. **Integrasi hybrid ke existing payment flow (proxy.ts & withX402)**  
   - Di proxy.ts: Setelah x402 payment success (facilitator confirm), call initEscrow jika belum, lalu releaseEscrow.  
   - Buat hybrid logic: Jika env.USE_ESCROW === "true", gunakan escrow untuk hold/release; fallback ke pure facilitator jika false.  
   - Tambah env var: ESCROW_PROGRAM_ID, USE_ESCROW.  
   - Update payment response header untuk include escrow tx signature jika relevant.  
   - Untuk AI agents: Tambah skill di .agents/skills atau .claude/skills untuk query escrow state via RPC.  
   - Output: Diff atau updated proxy.ts sections.

5. **Update docs & README untuk fitur baru**  
   - Tambah section di README.md: "Anchor Escrow Integration" dengan why, how, coding vibe.  
   - Buat /docs/ANCHOR_ESCROW.md atau update USAGE_GUIDE.md dengan flow diagram (text-based), env vars baru, testing commands.  
   - Tambah ke ROADMAP.md: Milestone "Anchor Escrow for trustless Solana settlements".  
   - Output: Suggested markdown additions.

6. **Testing & validation**  
   - Extend npm run validate:all dengan validate:escrow (deploy test program, simulate init/release).  
   - Tambah manual test di TESTING.md: Langkah deploy devnet, test payment → escrow hold → release.  
   - Output: Updated scripts & docs.

Kerjakan step by step: Output hanya step 1 dulu, lalu tunggu konfirmasi user "lanjut step 2", dst. Gunakan TypeScript strict, clean code, comments jelas. Align vibe: modular, hybrid (facilitator UX + escrow trustless), low-fee Solana optimized. Target Graveyard Hackathon: buat proyek ini lebih native Solana untuk bounty Onchain Social / Creator Economy.

Mulai dari Step 1 sekarang. Berikan code lengkap + instruksi terminal.
