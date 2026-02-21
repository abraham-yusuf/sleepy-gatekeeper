# Comprehensive Tech Stack Documentation for Sleepy Gatekeeper OS

## Overview

Sleepy Gatekeeper OS adalah decentralized web-based operating system yang dibangun dengan full-stack TypeScript ecosystem modern. Ini memanfaatkan Solana dan EVM (seperti Base) untuk on-chain payments via x402 protocol, dengan frontend Next.js yang modular dan component-based. Sekarang diekspansi menjadi OS browser dengan desktop interface, autonomous AI agents via ElizaOS dan ERC-8004, kompatibilitas web4.ai/Conway Terminal, serta decentralized storage via IPFS/Arweave. Semua interaksi tied ke wallet login (EVM/SVM) dengan username otomatis.

## Core Technologies

### Frontend
- **Next.js** - React framework dengan App Router, Server Components, dan built-in optimizations. [Dokumentasi Resmi](https://nextjs.org/docs)
- **TypeScript** - Type safety across the entire stack. [Dokumentasi Resmi](https://www.typescriptlang.org/docs/)
- **Tailwind CSS** - Utility-first styling untuk rapid UI development. [Dokumentasi Resmi](https://tailwindcss.com/docs)
- **React Hook Form** - Form management and validation. [Dokumentasi Resmi](https://react-hook-form.com/docs)
- **Zod** - Schema validation untuk forms dan API payloads. [Dokumentasi Resmi](https://zod.dev/)
- **Framer Motion** - Animations dan micro-interactions. [Dokumentasi Resmi](https://www.framer.com/motion/)
- **Lucide React** - Icon library. [Dokumentasi Resmi](https://lucide.dev/docs)
- **React Desktop** - Components untuk browser-based desktop UI (taskbar, windows, icons). [Dokumentasi Resmi](https://reactdesktop.js.org/docs/) (atau alternatif seperti react-window-manager jika diadopsi)

### Blockchain & Payments
- **Solana (Devnet/Mainnet)** - Primary blockchain untuk SVM payments dan escrow. [Dokumentasi Resmi](https://docs.solana.com/)
- **Base Network (EVM)** - Untuk EVM compatibility dan hybrid operations. [Dokumentasi Resmi](https://docs.base.org/)
- **x402 Protocol** - Decentralized payment facilitation layer untuk micropayments. [Dokumentasi Resmi](https://www.x402.org/docs)
- **Anchor (Rust)** - Solana program development framework untuk trustless escrow. [Dokumentasi Resmi](https://www.anchor-lang.com/docs/)
- **@solana/web3.js** - Solana blockchain interactions. [Dokumentasi Resmi](https://docs.solana.com/developing/clients/javascript-api)
- **ethers.js** - EVM blockchain interactions (untuk Base/Mainnet). [Dokumentasi Resmi](https://docs.ethers.org/v6/)
- **Wagmi** - Wallet connector untuk EVM. [Dokumentasi Resmi](https://wagmi.sh/docs)
- **@solana/wallet-adapter** - Wallet connector untuk SVM (Phantom, dll.). [Dokumentasi Resmi](https://github.com/anza-xyz/wallet-adapter)
- **@x402/paywall** - Payment integration library. [Dokumentasi Resmi](https://www.x402.org/docs/paywall)
- **Wormhole** - Cross-chain bridge untuk EVM-SVM interoperability (jika diperlukan untuk agents). [Dokumentasi Resmi](https://docs.wormhole.com/)

### Agents & AI Integrations
- **ElizaOS SDK** - Framework untuk autonomous AI agents orchestration. [Dokumentasi Resmi](https://github.com/elizaOS/eliza/docs) (atau situs resmi jika ada: https://elizaos.com/docs)
- **ERC-8004** - Standar Ethereum untuk trustless agent registries (Identity, Reputation, Validation). [Dokumentasi Resmi](https://eips.ethereum.org/EIPS/eip-8004) (EIP proposal; implementasi via ethers.js contracts)
- **web4.ai SDK** - Untuk automaton agents yang self-replicating dan earn revenue. [Dokumentasi Resmi](https://web4.ai/docs)
- **Conway Terminal** - Terminal untuk real-world write access dan self-replicating AI. [Dokumentasi Resmi](https://conway.tech/docs)

### Storage & Decentralized Data
- **IPFS (via ipfs-http-client)** - Decentralized file storage untuk user data dan apps. [Dokumentasi Resmi](https://docs.ipfs.tech/)
- **Arweave (via @bundlr-network/client)** - Permanent storage untuk on-chain assets. [Dokumentasi Resmi](https://arweave.org/docs)

### Backend & API
- **Next.js API Routes** - Serverless functions untuk payment validation dan agent interactions. [Dokumentasi Resmi](https://nextjs.org/docs/api-routes/introduction)
- **Proxy Pattern** - Central payment routing dan validation (diperluas untuk OS apps). 
- **Environment-based Configuration** - Network switching (devnet/mainnet, EVM/SVM).

### Build & DevOps
- **pnpm** - Package manager dengan workspace support. [Dokumentasi Resmi](https://pnpm.io/)
- **TurboRepo** - Monorepo management dan task orchestration. [Dokumentasi Resmi](https://turbo.build/repo/docs)
- **ESLint + Prettier** - Code formatting and quality. [ESLint Docs](https://eslint.org/docs), [Prettier Docs](https://prettier.io/docs)
- **GitHub Actions** - CI/CD pipelines. [Dokumentasi Resmi](https://docs.github.com/en/actions)

## Architecture

### OS & Login Flow
1. User buka browser → Prompt wallet connect (EVM/SVM).
2. Generate username otomatis → Load desktop UI.
3. Interaksi dengan apps/agents via on-chain calls.

### Payment Flow (Enhanced)
1. User requests protected app/content/agent.
2. Frontend checks payment status via x402.
3. Jika unpaid, initiates payment melalui facilitator atau escrow.
4. On confirmation, unlocks via wallet signature.
5. Agents bisa auto-pay machine-to-machine.
6. Semua transactions recorded on Solana/Base.

### Agent Flow
1. Spawn agent via ElizaOS di Agents Hub.
2. Register ke ERC-8004 registries.
3. Execute tasks dengan validation proofs.
4. Integrasi Conway Terminal untuk write access.

### Component Structure
```
/components
  /layout      // Taskbar, desktop background
  /ui          // Buttons, modals
  /os          // OS-specific: AgentsHub.tsx, AgentExplorer.tsx
  /pages       // HomeOS.tsx, ProtectedApp.tsx, CreatorDashboard.tsx
```

### API Design
- RESTful endpoints dengan x402 authentication dan wallet signatures.
- Rate limiting dan validation middleware.
- Error handling dengan standardized responses.
- Tambahan endpoints untuk agent registries query.

## Development Setup

### Prerequisites
- Node.js 20+
- pnpm 10+
- Rust and Cargo (untuk Anchor programs)
- Solana CLI
- EVM tools (Hardhat atau Foundry jika deploy ERC-8004)
- IPFS node atau Arweave wallet (opsional untuk testing)

### Installation
```bash
pnpm install
pnpm dev
```

## Network Configuration
- **Development**: Solana Devnet + Base Sepolia
- **Production**: Solana Mainnet + Base Mainnet
- Environment variables control network switching dan wallet providers.

## Security Considerations
- Input validation at API boundaries
- Rate limiting on payment endpoints
- Secure storage of facilitator keys
- Content protection through server-side checks
- Wallet signatures untuk semua OS sessions
- Agent validation via ERC-8004 proofs

## Testing
- Unit tests untuk payment validation dan agent spawns
- Integration tests untuk API routes dan cross-chain bridges
- End-to-end tests untuk OS flow (wallet connect → agent execution)
- Automated validation scripts untuk escrow dan registries

## Performance Optimizations
- Server-Side Rendering untuk initial OS load
- Image optimization with Next.js
- Code splitting dan lazy loading untuk apps
- Caching strategies untuk payment status dan agent queries

## Future Enhancements
- Full multi-chain support (tambah SVM bridges)
- Creator royalty distribution via agents
- Analytics dashboard untuk OS usage
- Mobile-responsive OS (PWA support)

## 🎨 UI/UX Design System

### Design Philosophy

The platform features a unique hybrid aesthetic combining:
- **Windows 95 Retro UI:** Classic window frames, beveled buttons, taskbar
- **Glassmorphism:** Modern frosted glass effects with backdrop blur
- **Cyberpunk Elements:** Neon accents, grid backgrounds, terminal aesthetics
- **CRT Screen Effects:** Scanlines and vintage monitor simulation

### Color Palette

```css
/* Primary Brand Colors */
--color-primary: #9d47ff           /* Purple accent */
--color-base-blue: #0052FF         /* Base network blue */
--color-solana-purple: #9945FF     /* Solana brand purple */
--color-neon-green: #14F195        /* Cyberpunk accent */

/* Background Colors */
--color-background: #0a0a0f        /* Dark background */
--color-background-light: #f6f6f8  /* Light mode background */
--color-background-dark: #0a0a0c   /* Extra dark */
--color-card-dark: #1e1933         /* Dark card surface */

/* Retro Windows 95 Colors */
--color-retro-gray: #c0c0c0        /* Classic Windows gray */

/* Text Colors */
--color-foreground: #ffffff        /* Primary text */
--color-text-muted: #9b92c9        /* Muted text */
```

### Typography

```css
/* Primary Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', 
             Arial, sans-serif;

/* Retro/Pixel Font */
.font-pixel {
  font-family: 'Press Start 2P', 'Courier New', monospace;
}

/* Monospace (Terminal, Code) */
font-family: 'Courier New', Courier, monospace;

/* Windows 95 System Font */
font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif;
```

### CSS Effects & Utilities

#### 1. Windows 95 Effects

```css
/* 3D Beveled Border (Raised) */
.win95-shadow {
  box-shadow: inset 1px 1px #fff, 
              inset -1px -1px #808080, 
              2px 2px 0px 0px #000;
}

/* Pressed Button Effect */
.win95-button-active {
  box-shadow: inset 1px 1px #808080, 
              inset -1px -1px #fff, 
              1px 1px 0px 0px #000;
  transform: translate(1px, 1px);
}

/* Recessed/Inset Effect */
.win95-recessed {
  box-shadow: inset -1px -1px #ffffff, 
              inset 1px 1px #0a0a0a, 
              inset -2px -2px #dfdfdf, 
              inset 2px 2px #808080;
}

/* Standard Bevel */
.win95-bevel {
  box-shadow: inset 1px 1px #fff, 
              inset -1px -1px #808080, 
              1px 1px 0px 0px #000;
}
```

#### 2. Glassmorphism Effects

```css
/* Glass Panel */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glass Panel (Dark) */
.glass-panel {
  background: rgba(25, 15, 36, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(157, 71, 255, 0.2);
}

/* Glass Modal */
.glass-modal {
  backdrop-filter: blur(8px);
  background-color: rgba(192, 192, 192, 0.85);
}
```

#### 3. Grid & Background Patterns

```css
/* Grid Background */
.grid-background {
  background-color: #0a0a0f;
  background-image: 
    linear-gradient(rgba(0, 82, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(153, 69, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: -1px -1px;
}

/* Radial Grid */
.grid-bg {
  background-image: radial-gradient(#34204b 1px, transparent 1px);
  background-size: 30px 30px;
}
```

#### 4. CRT & Retro Effects

```css
/* CRT Scanline Overlay */
.crt-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: 
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%),
    linear-gradient(90deg, rgba(255, 0, 0, 0.03), 
                    rgba(0, 255, 0, 0.01), 
                    rgba(0, 255, 0, 0.03));
  background-size: 100% 3px, 3px 100%;
  pointer-events: none;
  z-index: 999;
}

/* Glitch Text Effect */
.glitch-text {
  text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
}
```

#### 5. Shadow & Glow Effects

```css
/* Hard Retro Shadow */
.retro-shadow {
  box-shadow: 4px 4px 0px 0px rgba(255, 255, 255, 0.2);
}

/* Hard Drop Shadow */
.hard-shadow {
  box-shadow: 12px 12px 0px rgba(0, 0, 0, 0.4);
}

/* Terminal Glow */
.terminal-glow {
  text-shadow: 0 0 10px rgba(20, 241, 149, 0.5);
}

/* Neon Green Glow */
.neon-glow-green {
  box-shadow: 0 0 15px rgba(57, 255, 20, 0.4);
}
```

#### 6. Animations

```css
/* Glitch Animation */
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.glitch-button:hover {
  animation: glitch 0.3s infinite;
}
```

#### 7. Taskbar & Start Menu

```css
/* Taskbar 3D Border */
.taskbar-3d-border {
  border-top: 2px solid #ffffff;
}

/* Start Menu Sidebar Gradient */
.start-menu-sidebar {
  background: linear-gradient(to bottom, #000080, #1084d0);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* Menu Item Hover */
.menu-item-hover:hover {
  background: linear-gradient(90deg, #2563eb, #9d47ff);
  color: white;
}
```

#### 8. Desktop Icons

```css
/* Desktop Icon Label */
.desktop-icon-label {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Selected Desktop Icon */
.desktop-icon-selected {
  background-color: rgba(0, 0, 128, 0.6);
  outline: 1px dotted #ffffff;
}
```

#### 9. Title Bar Gradients

```css
/* Retro Windows Title Bar */
.retro-title-gradient {
  background: linear-gradient(90deg, #135bec 0%, #a855f7 100%);
}
```

### Material Symbols Configuration

```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.material-symbols-outlined.filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

---

## 🧩 Component Architecture

### Core UI Components

| Component | Path | Purpose |
|-----------|------|---------|
| **Win95Window** | `app/components/Win95Window.tsx` | Retro window frame with title bar |
| **Taskbar** | `app/components/Taskbar.tsx` | Bottom taskbar with start button |
| **StartMenu** | `app/components/StartMenu.tsx` | Windows 95-style start menu |
| **PopupDialog** | `app/components/PopupDialog.tsx` | Modal dialog boxes (error/info) |
| **DesktopIcon** | `app/components/DesktopIcon.tsx` | Desktop shortcut icons |
| **Terminal** | `app/components/Terminal.tsx` | Command-line terminal interface |
| **TerminalScreen** | `app/components/TerminalScreen.tsx` | Terminal display screen |
| **GlassPanel** | `app/components/GlassPanel.tsx` | Glassmorphism container |
| **Screensaver** | `app/components/Screensaver.tsx` | Retro screensaver effects |
| **MediaPlayer** | `app/components/MediaPlayer.tsx` | Audio/video player |
| **ConnectWallet** | `app/components/ConnectWallet.tsx` | Wallet connection UI |
| **SwapAsset** | `app/components/SwapAsset.tsx` | Asset swap interface |
| **Settings** | `app/components/Settings.tsx` | Settings dialog |
| **HelpDocs** | `app/components/HelpDocs.tsx` | Help documentation viewer |

### Component Export Pattern

All components are exported from a central index file:

```typescript
// app/components/index.ts
export { Win95Window } from "./Win95Window";
export { Terminal } from "./Terminal";
export { DesktopIcon } from "./DesktopIcon";
export { Taskbar } from "./Taskbar";
export { StartMenu } from "./StartMenu";
export { GlassPanel } from "./GlassPanel";
export { PopupDialog } from "./PopupDialog";
export { Screensaver } from "./Screensaver";
export { MediaPlayer } from "./MediaPlayer";
export { SwapAsset } from "./SwapAsset";
export { TerminalScreen } from "./TerminalScreen";
export { HelpDocs } from "./HelpDocs";
export { Settings } from "./Settings";
export { ConnectWallet } from "./ConnectWallet";
```

### Page Components

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with hero, lore, demo |
| **Articles Index** | `/articles` | Browse articles |
| **Article Detail** | `/articles/[slug]` | Individual article (protected) |
| **Podcasts Index** | `/podcasts` | Browse podcasts |
| **Podcast Detail** | `/podcasts/[slug]` | Individual podcast (protected) |
| **Videos Index** | `/videos` | Browse videos |
| **Video Detail** | `/videos/[slug]` | Individual video (protected) |
| **Skills Index** | `/skills` | Browse AI skills |
| **Skill Detail** | `/skills/[slug]` | Individual skill (protected) |
| **Creator Dashboard** | `/creator` | Creator control panel |
| **Create Article** | `/creator/articles/new` | Article creation form |
| **Create Podcast** | `/creator/podcasts/new` | Podcast upload form |
| **Create Video** | `/creator/videos/new` | Video upload form |
| **Create Skill** | `/creator/skills/new` | Skill package form |
| **Showcase** | `/showcase` | Feature showcase page |

---

## ✨ Features & Functionality

### 1. Multi-Chain Payment System

**Core Feature:** Dual network payment support (Base + Solana)

**Implementation:**
- x402 protocol integration via `paymentProxy` and `withX402`
- Facilitator-based settlement verification
- Support for exact payment scheme
- USDC payments on both networks

**Payment Flow:**
1. User requests protected resource
2. Server responds with `402 Payment Required` + payment options
3. User selects network and pays via wallet
4. Facilitator verifies on-chain transaction
5. Server grants access with `200 OK` + payment receipt

**Configuration Example:**
```typescript
// proxy.ts
{
  "/articles/web3-future": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:84532",    // Base Sepolia
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",  // Solana Devnet
        payTo: svmAddress,
      },
    ],
    description: "Premium Article: The Future of Web3 Payments",
    mimeType: "text/html",
  }
}
```

### 2. Content Monetization

**Supported Content Types:**
- **Articles:** Markdown-based premium articles
- **Podcasts:** Audio streaming with player UI
- **Videos:** Video playback with controls
- **AI Skills:** Downloadable skill packages

**Features:**
- Per-resource pricing ($0.001 - $0.10+)
- Instant creator payouts
- Zero platform fees
- Content discovery system
- Protected route middleware

### 3. Creator Dashboard

**Features:**
- Multi-content type publishing (articles, podcasts, videos, skills)
- Content management interface
- Analytics (coming soon)
- Direct wallet integration
- Revenue tracking (planned)

**Routes:**
- `/creator` - Dashboard home
- `/creator/articles/new` - Create article
- `/creator/podcasts/new` - Upload podcast
- `/creator/videos/new` - Upload video
- `/creator/skills/new` - Create AI skill

### 4. Protected Routes System

**Two Approaches:**

#### A. paymentProxy (Page Routes)
```typescript
// middleware.ts
export const proxy = paymentProxy(
  routeConfigurations,
  server,
  undefined,
  paywall
);

export const config = {
  matcher: [
    "/articles/web3-future/:path*",
    "/podcasts/web3-insights/:path*",
  ],
};
```

#### B. withX402 (API Routes)
```typescript
// app/api/weather/route.ts
export const GET = withX402(
  handler,
  {
    accepts: [{
      scheme: "exact",
      price: "$0.001",
      network: "eip155:84532",
      payTo: evmAddress,
    }],
    description: "Access to weather API",
    mimeType: "application/json",
  },
  server,
  undefined,
  paywall
);
```

### 5. Wallet Integration

**Supported Wallets:**
- Coinbase Wallet (EVM)
- MetaMask (EVM)
- Phantom (Solana)
- Backpack (Solana)
- Other WalletConnect-compatible wallets

**Integration Libraries:**
- `wagmi` for EVM wallets
- `@solana/react-hooks` for Solana wallets

### 6. UI/UX Features

**Windows 95 Retro Theme:**
- Window frames with title bars
- Start menu navigation
- Taskbar with app icons
- Desktop icon layout
- Modal dialogs (402 error popup)

**Modern Enhancements:**
- Glassmorphism overlays
- Smooth animations
- Responsive design
- CRT screen effects
- Grid backgrounds

**Interactive Elements:**
- Locked/unlocked content demo
- Payment simulation
- Wallet connect button
- Media players
- Terminal interface

### 7. Discovery & Extensions

**Bazaar Discovery Extension:**
```typescript
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";

extensions: {
  ...declareDiscoveryExtension({}),
}
```

Enables content discoverability in the x402 ecosystem.

### 8. Validation Tools

**Scripts:**
- `validate:config` - Check addresses and facilitator URL
- `validate:routes` - Verify route configurations
- `validate:facilitator` - Test facilitator connectivity
- `validate:all` - Run all validations

**Implementation:**
```bash
npm run validate:all
```

---

## 🛠️ Development Tools

### Code Quality

| Tool | Configuration | Purpose |
|------|---------------|---------|
| **ESLint** | `eslint.config.js` | Linting TypeScript/JavaScript |
| **Prettier** | `.prettierrc` | Code formatting |
| **TypeScript** | `tsconfig.json` | Type checking |

### Scripts

```json
{
  "dev": "next dev",                    // Development server
  "build": "next build",                // Production build
  "start": "next start",                // Production server
  "format": "prettier --write ...",     // Format code
  "format:check": "prettier --check ...", // Check formatting
  "lint": "eslint . --ext .ts --fix",   // Lint and fix
  "lint:check": "eslint . --ext .ts",   // Check linting
  "validate:config": "tsx scripts/validate-payment-config.ts",
  "validate:routes": "tsx scripts/validate-routes.ts",
  "validate:facilitator": "tsx scripts/test-facilitator.ts",
  "validate:all": "npm run validate:config && npm run validate:routes && npm run validate:facilitator"
}
```


## 🏗️ Project Structure

```
sleepy-gatekeeper/
├── .agents/                    # AI agent skills
│   └── skills/
│       ├── solana-dev/         # Solana development skills
│       ├── next-best-practices/
│       ├── vercel-react-best-practices/
│       ├── vercel-react-native-skills/
│       └── web-design-guidelines/
│
├── app/                        # Next.js App Router
│   ├── api/                    # API routes
│   │   ├── articles/
│   │   ├── podcasts/
│   │   ├── videos/
│   │   └── weather/
│   │
│   ├── articles/               # Article pages
│   │   ├── page.tsx
│   │   ├── web3-future/
│   │   ├── creator-economy/
│   │   └── decentralized-content/
│   │
│   ├── podcasts/               # Podcast pages
│   │   ├── page.tsx
│   │   └── web3-insights/
│   │
│   ├── videos/                 # Video pages
│   │   ├── page.tsx
│   │   └── blockchain-basics/
│   │
│   ├── skills/                 # Skills marketplace (planned)
│   │
│   ├── creator/                # Creator dashboard
│   │   ├── page.tsx
│   │   ├── articles/
│   │   ├── podcasts/
│   │   ├── videos/
│   │   └── skills/
│   │
│   ├── components/             # Reusable UI components
│   │   ├── index.ts
│   │   ├── Win95Window.tsx
│   │   ├── Taskbar.tsx
│   │   ├── StartMenu.tsx
│   │   ├── Terminal.tsx
│   │   ├── ConnectWallet.tsx
│   │   └── ... (14 components total)
│   │
│   ├── globals.css             # Global styles + utilities
│   ├── fonts.css               # Font definitions
│   ├── page.tsx                # Home page
│   ├── providers.tsx           # React context providers
│   └── showcase/               # Feature showcase
│
├── docs/                       # Documentation
│   ├── README.md               # Documentation index
│   ├── API_REFERENCE.md        # API documentation
│   ├── COMPONENTS.md           # Component reference
│   ├── CORE_FUNCTIONS.md       # Core functions guide
│   ├── USAGE_GUIDE.md          # Integration guide
│   ├── QUICK_REFERENCE.md      # Quick reference
│   ├── techstack.md            # This file
│   └── ui-ux/                  # UI/UX documentation
│
├── scripts/                    # Validation scripts
│   ├── validate-payment-config.ts
│   ├── validate-routes.ts
│   └── test-facilitator.ts
│
├── skills/                     # Symlinked skills (local dev)
│   ├── next-best-practices
│   ├── solana-dev
│   ├── vercel-react-best-practices
│   ├── vercel-react-native-skills
│   └── web-design-guidelines
│
├── public/                     # Static assets
│
├── proxy.ts                    # x402 payment configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
├── pnpm-lock.yaml              # Lock file
├── postcss.config.mjs          # PostCSS configuration
├── eslint.config.js            # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Project README
├── ROADMAP.md                  # Product roadmap
├── TESTING.md                  # Testing guide
└── IMPLEMENTATION_SUMMARY.md   # Implementation summary
```

---

## 🤖 Skills & AI Agents

### Available Skills

The platform includes several AI agent skills located in `.agents/skills/`:

#### 1. Solana Development (`solana-dev`)

**Files:**
- `SKILL.md` - Skill overview
- `frontend-framework-kit.md` - Solana Foundation framework-kit usage
- `programs-anchor.md` - Anchor framework programs
- `programs-pinocchio.md` - Pinocchio framework programs
- `kit-web3-interop.md` - Web3.js interoperability
- `idl-codegen.md` - IDL and Codama code generation
- `payments.md` - Payment integration patterns
- `testing.md` - LiteSVM/Mollusk/Surfpool testing
- `security.md` - Security best practices
- `resources.md` - Additional resources

**Coverage:**
- End-to-end Solana development playbook (Jan 2026)
- Framework-kit (@solana/client + @solana/react-hooks) for React/Next.js
- Anchor & Pinocchio program development
- Codama-based client generation
- Testing with LiteSVM/Mollusk/Surfpool
- Security checklists

#### 2. Next.js Best Practices (`next-best-practices`)

**Coverage:**
- File conventions
- React Server Components boundaries
- Data fetching patterns
- Async APIs
- Metadata optimization
- Error handling
- Route handlers
- Image/font optimization
- Bundle optimization

#### 3. Vercel React Best Practices (`vercel-react-best-practices`)

**Coverage:**
- React and Next.js performance optimization
- Component best practices
- Data fetching strategies
- Bundle optimization
- Performance patterns

#### 4. Vercel React Native Skills (`vercel-react-native-skills`)

**Coverage:**
- React Native and Expo best practices
- Mobile performance optimization
- List performance
- Animations
- Native modules

#### 5. Web Design Guidelines (`web-design-guidelines`)

**Coverage:**
- UI code review guidelines
- Accessibility compliance
- UX best practices
- Design audit checklists

### Skills Marketplace (Roadmap)

**Planned Features (Q3 2026):**
- Skill package system with standard format
- Marketplace for Claude prompts, Cursor extensions, OpenClaw agents
- Pay-per-use via x402 protocol
- Skill discovery and rating system
- One-click installation
- Revenue sharing for creators

---

## 🌐 API Architecture

### Public API Endpoints

| Endpoint | Method | Price | Description |
|----------|--------|-------|-------------|
| `/api/weather` | GET | $0.001 | Weather data API |
| `/api/articles` | GET | Free | Articles list |
| `/api/podcasts` | GET | Free | Podcasts list |
| `/api/videos` | GET | Free | Videos list |

### Protected Routes (via paymentProxy)

| Route | Price (Base) | Price (Solana) | Type |
|-------|--------------|----------------|------|
| `/articles/web3-future` | $0.01 | $0.01 | Article |
| `/articles/creator-economy` | $0.02 | $0.02 | Article |
| `/articles/decentralized-content` | $0.015 | $0.015 | Article |
| `/podcasts/web3-insights` | $0.02 | $0.02 | Podcast |
| `/videos/blockchain-basics` | $0.05 | $0.05 | Video |
| `/skills/ai-prompt-mastery` | $0.05 | $0.05 | Skill |
| `/skills/web3-development` | $0.10 | $0.10 | Skill |
| `/skills/blockchain-security` | $0.08 | $0.08 | Skill |

### Response Formats

#### 402 Payment Required

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json
PAYMENT-REQUIRED: <base64-encoded-json>

{}
```

Header payload (decoded):
```json
{
  "x402Version": 2,
  "error": "Payment required",
  "resource": {
    "url": "http://localhost:3000/api/weather",
    "description": "Access to weather API",
    "mimeType": "application/json"
  },
  "accepts": [
    {
      "scheme": "exact",
      "network": "eip155:84532",
      "amount": "1000",
      "asset": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      "payTo": "0x...",
      "maxTimeoutSeconds": 300,
      "extra": {
        "name": "USDC",
        "version": "2",
        "resourceUrl": "http://localhost:4021/weather"
      }
    }
  ]
}
```

#### 200 Success (After Payment)

```http
HTTP/1.1 200 OK
Content-Type: application/json
PAYMENT-RESPONSE: <base64-encoded-json>

{"report":{"weather":"sunny","temperature":72}}
```

Header payload (decoded):
```json
{
  "success": true,
  "transaction": "0x...",
  "network": "eip155:84532",
  "payer": "0x...",
  "requirements": {
    "scheme": "exact",
    "network": "eip155:84532",
    "amount": "1000",
    "asset": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    "payTo": "0x...",
    "maxTimeoutSeconds": 300
  }
}
```

---

## 🚀 Deployment & Infrastructure

### Recommended Platform

**Vercel** (optimized for Next.js)

### Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

### Environment Requirements

**Node.js:** v20 or higher  
**pnpm:** v10 or higher  
**Networks:** Access to Base and Solana RPC endpoints  
**Facilitator:** x402 facilitator service URL

### Production Checklist

- [ ] Set `testnet: false` in paywall configuration
- [ ] Use mainnet network identifiers
  - Base: `eip155:8453`
  - Solana: `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`
- [ ] Configure production wallet addresses
- [ ] Update facilitator URL to production endpoint
- [ ] Run validation scripts
- [ ] Test payment flows on testnet first
- [ ] Enable analytics and monitoring
- [ ] Set up error tracking (Sentry, etc.)

### Performance Optimization

**Current Optimizations:**
- Next.js 16 App Router with React Server Components
- TailwindCSS 4 with optimized CSS output
- Asset optimization via Next.js Image component
- Static generation where possible

**Future Optimizations:**
- CDN integration for content delivery
- Edge caching for static content
- Payment verification optimization
- Response time <100ms for 402 responses

---

## 📚 Documentation Resources

### Internal Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Quick start and setup |
| `docs/README.md` | Documentation index |
| `docs/API_REFERENCE.md` | API endpoints reference |
| `docs/COMPONENTS.md` | Component documentation |
| `docs/CORE_FUNCTIONS.md` | Core functions guide |
| `docs/USAGE_GUIDE.md` | Integration tutorial |
| `docs/QUICK_REFERENCE.md` | Quick reference guide |
| `docs/techstack.md` | This document |
| `ROADMAP.md` | Product roadmap |
| `TESTING.md` | Testing procedures |
| `IMPLEMENTATION_SUMMARY.md` | Implementation summary |

## References
- [x402 Protocol Documentation](https://www.x402.org/docs)
- [Solana Documentation](https://docs.solana.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [ElizaOS GitHub](https://github.com/elizaOS/eliza)
- [ERC-8004 EIP](https://eips.ethereum.org/EIPS/eip-8004)
- [web4.ai](https://web4.ai/)
- [Conway Tech](https://conway.tech/)
- [IPFS Docs](https://docs.ipfs.tech/)
- [Arweave Docs](https://arweave.org/docs)

---
