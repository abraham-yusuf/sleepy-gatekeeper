# Quick Reference Guide

A quick reference for common tasks and frequently used code patterns in xCreator402.

## 🚀 Common Commands

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
```

### Validation
```bash
npm run validate:all         # Run all validations
npm run validate:config      # Validate addresses & URLs
npm run validate:routes      # Validate route configs
npm run validate:facilitator # Test facilitator connectivity
```

### Code Quality
```bash
npm run lint             # Lint TypeScript files
npm run format           # Format code
npm run format:check     # Check code formatting
```

---

## 🔐 Payment Protection Patterns

### Protect a Page Route

```typescript
// 1. Add to proxy.ts
export const routeConfigurations = {
  "/premium-page": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:84532",
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: svmAddress,
      }
    ],
    description: "Premium page content",
    mimeType: "text/html",
  },
};

// 2. Add to matcher
export const config = {
  matcher: ["/premium-page/:path*"]
};

// 3. Create app/premium-page/page.tsx
export default function PremiumPage() {
  return <div>Protected Content</div>;
}
```

### Protect an API Route

```typescript
// app/api/data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { server, paywall, evmAddress, svmAddress } from "../../../proxy";

const handler = async (req: NextRequest) => {
  return NextResponse.json({ data: "premium" });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.001",
        network: "eip155:84532",
        payTo: evmAddress,
      }
    ],
    description: "Premium API data",
    mimeType: "application/json",
  },
  server,
  undefined,
  paywall
);
```

---

## 🌐 Network Identifiers

### Testnet (Development)
```typescript
"eip155:84532"                                      // Base Sepolia
"solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"          // Solana Devnet
```

### Mainnet (Production)
```typescript
"eip155:8453"                                       // Base Mainnet
"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"          // Solana Mainnet
```

---

## 💰 Price Formats

```typescript
"$0.001"    // 0.1 cent (1000 atomic units for USDC)
"$0.01"     // 1 cent
"$0.10"     // 10 cents
"$1.00"     // 1 dollar
"$10.00"    // 10 dollars
```

**Note:** USDC has 6 decimals, so:
- $0.001 = 1000 atomic units
- $0.01 = 10000 atomic units
- $1.00 = 1000000 atomic units

---

## 🔧 Environment Variables

### Required
```bash
FACILITATOR_URL=https://facilitator.x402.org
EVM_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
SVM_ADDRESS=7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK
```

### Optional
```bash
APP_NAME=My Creator Platform
APP_LOGO=/logo.png
CDP_CLIENT_KEY=organizations/...
```

---

## 📝 Component Patterns

### Page Component (Client-Side)
```typescript
"use client";

import { useState } from "react";

export default function MyPage() {
  const [state, setState] = useState(initialValue);
  
  return (
    <div className="min-h-screen bg-[#131022]">
      {/* Content */}
    </div>
  );
}
```

### API Route Handler
```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = { message: "Hello" };
  return NextResponse.json(data);
}
```

---

## 🎨 Common CSS Classes

### Layout
```typescript
className="min-h-screen bg-[#131022] text-white"        // Full page
className="container mx-auto px-4 py-8"                 // Container
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"   // Grid layout
```

### Cards
```typescript
className="rounded-xl bg-[#1e1933] border border-white/5 p-5"
```

### Buttons
```typescript
className="bg-[#3713ec] hover:bg-[#3713ec]/90 text-white rounded-lg px-4 py-2"
```

### Typography
```typescript
className="text-4xl font-bold text-white"              // Heading
className="text-lg text-gray-300"                      // Body text
className="text-sm text-[#9b92c9]"                     // Muted text
```

---

## 🧪 Testing Patterns

### Test Payment Configuration
```bash
npm run validate:config
```

Expected output:
```
✅ EVM address is valid: 0x...
✅ Solana address is valid: ...
✅ Facilitator URL is valid: https://...
```

### Test Route Configuration
```bash
npm run validate:routes
```

Expected output:
```
✅ EVM/Base - Price: $0.001, Network: eip155:84532
✅ Solana - Price: $0.001, Network: solana:...
```

### Test API Endpoint
```bash
curl -I http://localhost:3000/api/weather
```

Expected: `402 Payment Required` with `PAYMENT-REQUIRED` header

---

## 🐛 Debugging

### Enable Debug Logs
```bash
DEBUG=x402:* npm run dev
```

### Check Payment Headers
```typescript
// In browser DevTools Network tab
const headers = response.headers;
const paymentRequired = headers.get('PAYMENT-REQUIRED');
const paymentResponse = headers.get('PAYMENT-RESPONSE');

console.log(JSON.parse(atob(paymentRequired)));
```

### Verify Transaction
- **Base Sepolia:** https://sepolia.basescan.org/tx/[tx-hash]
- **Solana Devnet:** https://explorer.solana.com/tx/[tx-hash]?cluster=devnet

---

## 🔍 Quick Troubleshooting

### Payment Not Working
1. Check wallet network matches configured network
2. Verify sufficient balance (USDC + gas)
3. Check transaction on block explorer
4. Run `npm run validate:all`

### Route Not Protected
1. Verify route in `routeConfigurations`
2. Check `config.matcher` includes route pattern
3. Restart dev server
4. Clear `.next` cache: `rm -rf .next`

### API Returns 500
1. Check handler logic for errors
2. Review server logs
3. Verify environment variables
4. Test facilitator: `npm run validate:facilitator`

---

## 📦 Proxy.ts Exports

```typescript
import { 
  evmAddress,           // EVM wallet address
  svmAddress,           // Solana wallet address
  server,               // x402 resource server
  paywall,              // Paywall UI provider
  routeConfigurations,  // Route payment configs
  proxy,                // Payment proxy middleware
  config                // Middleware matcher config
} from './proxy';
```

---

## 🔗 Quick Links

- **Docs Index:** [/docs/README.md](./README.md)
- **API Reference:** [/docs/API_REFERENCE.md](./API_REFERENCE.md)
- **Usage Guide:** [/docs/USAGE_GUIDE.md](./USAGE_GUIDE.md)
- **Testing Guide:** [/TESTING.md](../TESTING.md)
- **X402 Protocol:** https://www.x402.org

---

## 💡 Pro Tips

1. **Always validate configuration** before deploying:
   ```bash
   npm run validate:all
   ```

2. **Test on testnet first** before switching to mainnet

3. **Use withX402 for APIs** to ensure payment only on success

4. **Support both networks** for maximum user accessibility

5. **Clear browser cache** when testing payment changes

6. **Monitor transactions** on block explorers during testing

7. **Keep prices reasonable** - start low and adjust based on demand

8. **Document your routes** in `routeConfigurations` descriptions

---

## 📞 Getting Help

1. Check this quick reference
2. Review [full documentation](./README.md)
3. Run validation scripts
4. Enable debug mode
5. Check GitHub issues
6. Review X402 protocol docs

---

**Last Updated:** 2024-01-15  
**Version:** 1.0.0
