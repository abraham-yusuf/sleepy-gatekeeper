# Build Fix: Vercel Deployment Errors — 2026-03-29

## Errors Fixed

Three `Module not found` errors that caused Vercel build to fail:

```
Module not found: Can't resolve '@solana/wallet-adapter-react'
  - app/components/EscrowPayButton.tsx
  - lib/hooks/useEscrowPayment.ts

Module not found: Can't resolve 'bn.js'
  - lib/hooks/useEscrowPayment.ts
```

## Root Cause

`EscrowPayButton.tsx` and `useEscrowPayment.ts` were importing two libraries
not present in `package.json`:

- `@solana/wallet-adapter-react` — not installed in this project
- `bn.js` — not installed as a standalone dependency

## Fix

| Before | After |
|--------|-------|
| `import { useWallet } from "@solana/wallet-adapter-react"` | `import { useWalletSession, useWalletActions } from "@solana/react-hooks"` |
| `import BN from "bn.js"` | `import { BN } from "@coral-xyz/anchor"` |

Both `@solana/react-hooks` and `@coral-xyz/anchor` are already in `package.json`.
No new dependencies were added.

## Verification

- `tsc --noEmit` → 0 errors
- Vercel build: ✅ passes
