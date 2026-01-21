# Usage Guide: Payment Integration

This guide provides step-by-step instructions for integrating x402 payment protection into your Next.js application.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Protecting Routes](#protecting-routes)
4. [Protecting API Endpoints](#protecting-api-endpoints)
5. [Configuration Options](#configuration-options)
6. [Network Setup](#network-setup)
7. [Advanced Usage](#advanced-usage)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The x402 payment protocol enables you to protect routes and API endpoints with blockchain-based micropayments. Users pay small amounts in cryptocurrency (USDC) to access premium content.

### Key Benefits

- **No Traditional Authentication:** No API keys, passwords, or user accounts needed
- **Multi-Chain Support:** Accept payments on both EVM (Base) and Solana networks
- **Instant Payouts:** Payments go directly to your wallet
- **Zero Platform Fees:** Keep 100% of your earnings (minus blockchain gas fees)
- **Flexible Pricing:** Set any price per resource

### How It Works

1. User attempts to access protected content
2. Server responds with `402 Payment Required` status
3. User's wallet is prompted to make payment
4. Payment is verified on-chain via facilitator
5. User gains access to content

---

## Quick Start

### 1. Install Dependencies

```bash
npm install @x402/next @x402/core @x402/paywall
npm install @x402/evm @x402/svm @x402/extensions
```

### 2. Set Up Environment Variables

Create a `.env` file:

```bash
# Required
FACILITATOR_URL=https://facilitator.x402.org
EVM_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
SVM_ADDRESS=7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK

# Optional
APP_NAME=My Creator Platform
APP_LOGO=/logo.png
```

### 3. Create Payment Proxy

Create `proxy.ts` in your project root:

```typescript
import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { registerExactSvmScheme } from "@x402/svm/exact/server";
import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";
import { svmPaywall } from "@x402/paywall/svm";

// Load environment variables
const facilitatorUrl = process.env.FACILITATOR_URL!;
export const evmAddress = process.env.EVM_ADDRESS as `0x${string}`;
export const svmAddress = process.env.SVM_ADDRESS!;

// Create facilitator client
const facilitatorClient = new HTTPFacilitatorClient({ 
  url: facilitatorUrl 
});

// Create x402 server
export const server = new x402ResourceServer(facilitatorClient);

// Register payment schemes
registerExactEvmScheme(server);
registerExactSvmScheme(server);

// Create paywall UI
export const paywall = createPaywall()
  .withNetwork(evmPaywall)
  .withNetwork(svmPaywall)
  .withConfig({
    appName: process.env.APP_NAME || "My App",
    appLogo: process.env.APP_LOGO || "/logo.png",
    testnet: true, // Set to false for production
  })
  .build();

// Export for use in routes
export { facilitatorUrl };
```

### 4. Validate Configuration

```bash
npm run validate:config
```

---

## Protecting Routes

### Method 1: Using paymentProxy Middleware

Best for protecting multiple page routes at once.

**Step 1:** Define route configurations in `proxy.ts`:

```typescript
// proxy.ts
export const routeConfigurations = {
  "/premium": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:84532", // Base Sepolia
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", // Solana Devnet
        payTo: svmAddress,
      }
    ],
    description: "Premium content access",
    mimeType: "text/html",
  },
  "/courses": {
    accepts: [
      {
        scheme: "exact",
        price: "$5.00",
        network: "eip155:84532",
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$5.00",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: svmAddress,
      }
    ],
    description: "Full course access",
    mimeType: "text/html",
  },
};

// Create the proxy
export const proxy = paymentProxy(
  routeConfigurations,
  server,
  undefined,
  paywall
);

// Configure which routes to protect
export const config = {
  matcher: [
    "/premium/:path*",
    "/courses/:path*",
  ]
};
```

**Step 2:** Create `middleware.ts` in your project root:

```typescript
// middleware.ts
import { proxy, config } from './proxy';

export { config };
export default proxy;
```

**Step 3:** Create your page:

```typescript
// app/premium/page.tsx
export default function PremiumPage() {
  return (
    <div>
      <h1>Premium Content</h1>
      <p>This content is protected by x402 payment protocol.</p>
    </div>
  );
}
```

That's it! Your route is now protected.

---

### Method 2: Protecting Individual Routes

For more granular control, you can configure routes individually:

```typescript
// proxy.ts
export const routeConfigurations = {
  "/article-1": {
    accepts: [{
      scheme: "exact",
      price: "$0.01",
      network: "eip155:84532",
      payTo: evmAddress,
    }],
    description: "Article 1: Introduction to Web3",
    mimeType: "text/html",
  },
  "/article-2": {
    accepts: [{
      scheme: "exact",
      price: "$0.02",
      network: "eip155:84532",
      payTo: evmAddress,
    }],
    description: "Article 2: Advanced Smart Contracts",
    mimeType: "text/html",
  },
};

export const config = {
  matcher: [
    "/article-1/:path*",
    "/article-2/:path*",
  ]
};
```

---

## Protecting API Endpoints

### Using withX402 Wrapper

The `withX402` wrapper is the recommended approach for API routes because it ensures payment settlement only occurs AFTER successful responses.

**Step 1:** Create your API route:

```typescript
// app/api/data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { server, paywall, evmAddress, svmAddress } from "../../../proxy";

// Your API handler
const handler = async (req: NextRequest) => {
  // Your business logic here
  const data = {
    message: "Premium API data",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data, { status: 200 });
};

// Wrap with x402 protection
export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.001",
        network: "eip155:84532",
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.001",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: svmAddress,
      }
    ],
    description: "Access to premium API data",
    mimeType: "application/json",
  },
  server,
  undefined,
  paywall
);
```

**Step 2:** Test your API:

```bash
# Without payment (returns 402)
curl -I http://localhost:3000/api/data

# Response:
# HTTP/1.1 402 Payment Required
# PAYMENT-REQUIRED: <base64-encoded payment details>
```

---

### Key Difference: paymentProxy vs withX402

| Feature | `paymentProxy` | `withX402` |
|---------|----------------|------------|
| Use Case | Page routes | API routes |
| Payment Timing | Before handler execution | After successful response |
| Error Handling | Charges for all requests | Only charges for status < 400 |
| Configuration | Centralized in proxy.ts | Per-route inline |
| Best For | Static content | Dynamic APIs |

**Example Scenario:**

```typescript
// BAD: Using paymentProxy for API
// User pays even if API returns 500 error

// GOOD: Using withX402 for API
const handler = async (req: NextRequest) => {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    // User is NOT charged because status >= 400
    return NextResponse.json(
      { error: "Server error" }, 
      { status: 500 }
    );
  }
};

export const GET = withX402(handler, config, server, undefined, paywall);
```

---

## Configuration Options

### Payment Configuration

```typescript
interface PaymentRequirement {
  scheme: "exact";           // Payment scheme (only "exact" supported)
  price: string;             // Price in USD format: "$0.001", "$1.50"
  network: string;           // CAIP-2 network identifier
  payTo: string;             // Recipient wallet address
}
```

### Network Identifiers (CAIP-2 Format)

**EVM Networks:**
```typescript
"eip155:84532"  // Base Sepolia (testnet)
"eip155:8453"   // Base Mainnet
"eip155:1"      // Ethereum Mainnet
"eip155:137"    // Polygon Mainnet
```

**Solana Networks:**
```typescript
"solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"  // Solana Devnet
"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"  // Solana Mainnet
```

### Paywall Configuration

```typescript
const paywall = createPaywall()
  .withNetwork(evmPaywall)
  .withNetwork(svmPaywall)
  .withConfig({
    appName: "My App",              // App name in paywall UI
    appLogo: "/logo.png",           // Logo URL
    testnet: true,                  // Use testnet (true) or mainnet (false)
  })
  .build();
```

### Route Configuration

```typescript
{
  accepts: PaymentRequirement[];    // Array of accepted payment options
  description: string;               // Human-readable resource description
  mimeType: string;                  // MIME type: "text/html", "application/json"
  extensions?: {                     // Optional extensions
    ...declareDiscoveryExtension({
      output: {
        example: { /* example data */ }
      }
    })
  };
}
```

---

## Network Setup

### Testnet Setup (Development)

#### Base Sepolia (EVM)

1. **Get Testnet ETH:**
   - Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
   - Connect wallet and request testnet ETH

2. **Get Testnet USDC:**
   - Use testnet USDC contract: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
   - Visit [Circle Faucet](https://faucet.circle.com/) or swap testnet ETH

3. **Network Configuration:**
   ```typescript
   network: "eip155:84532"
   ```

#### Solana Devnet

1. **Get Testnet SOL:**
   ```bash
   solana airdrop 2
   ```
   Or visit [Solana Faucet](https://faucet.solana.com/)

2. **Get Testnet USDC:**
   - Use Solana CLI to create token account
   - Or use a testnet faucet

3. **Network Configuration:**
   ```typescript
   network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
   ```

---

### Mainnet Setup (Production)

#### Base Mainnet (EVM)

1. **Update Environment:**
   ```bash
   EVM_ADDRESS=0xYourMainnetAddress
   ```

2. **Update Configuration:**
   ```typescript
   network: "eip155:8453"  // Base Mainnet
   testnet: false
   ```

3. **USDC Contract:**
   - Base Mainnet USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

#### Solana Mainnet

1. **Update Environment:**
   ```bash
   SVM_ADDRESS=YourMainnetSolanaAddress
   ```

2. **Update Configuration:**
   ```typescript
   network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"  // Mainnet
   testnet: false
   ```

---

## Advanced Usage

### Custom Price Per Route

Different prices for different content:

```typescript
export const routeConfigurations = {
  "/articles": {
    accepts: [{
      scheme: "exact",
      price: "$0.01",  // 1 cent
      network: "eip155:84532",
      payTo: evmAddress,
    }],
    description: "Article access",
    mimeType: "text/html",
  },
  "/courses": {
    accepts: [{
      scheme: "exact",
      price: "$10.00",  // $10
      network: "eip155:84532",
      payTo: evmAddress,
    }],
    description: "Course access",
    mimeType: "text/html",
  },
};
```

### Multi-Network Support

Offer payment on multiple networks for the same content:

```typescript
{
  accepts: [
    {
      scheme: "exact",
      price: "$0.01",
      network: "eip155:84532",     // Base Sepolia
      payTo: evmAddress,
    },
    {
      scheme: "exact",
      price: "$0.01",
      network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",  // Solana Devnet
      payTo: svmAddress,
    },
    {
      scheme: "exact",
      price: "$0.01",
      network: "eip155:137",       // Polygon
      payTo: polygonAddress,
    }
  ],
  // ...
}
```

### Dynamic Pricing

Implement dynamic pricing in API routes:

```typescript
const handler = async (req: NextRequest) => {
  const tier = req.nextUrl.searchParams.get('tier');
  
  // Different data based on payment tier
  if (tier === 'premium') {
    return NextResponse.json({ /* premium data */ });
  } else {
    return NextResponse.json({ /* standard data */ });
  }
};

// Standard tier
export const GET = withX402(handler, {
  accepts: [{
    scheme: "exact",
    price: "$0.01",
    network: "eip155:84532",
    payTo: evmAddress,
  }],
  description: "Standard API access",
  mimeType: "application/json",
}, server, undefined, paywall);

// Create separate route for premium
```

### Adding Discovery Extensions

Enable content discovery:

```typescript
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";

{
  accepts: [/* ... */],
  description: "Premium API",
  mimeType: "application/json",
  extensions: {
    ...declareDiscoveryExtension({
      output: {
        example: {
          data: "Sample response",
          timestamp: "2024-01-01T00:00:00Z"
        }
      }
    })
  }
}
```

---

## Troubleshooting

### Common Issues

#### 1. Payment Required Error Persists

**Problem:** User sees paywall even after paying.

**Solutions:**
```bash
# 1. Clear browser cache
# 2. Verify transaction on blockchain explorer
# 3. Check facilitator connectivity
npm run validate:facilitator

# 4. Verify environment variables
npm run validate:config
```

#### 2. Middleware Not Running

**Problem:** Routes aren't protected.

**Solutions:**
```typescript
// 1. Check middleware.ts exists in project root
// middleware.ts
export { config } from './proxy';
export default proxy;

// 2. Verify matcher patterns include your route
export const config = {
  matcher: ["/your-route/:path*"]
};

// 3. Restart dev server
npm run dev
```

#### 3. Wrong Network Selected

**Problem:** User's wallet is on wrong network.

**Solutions:**
- Add clear network instructions in UI
- Use network-specific language in paywall
- Implement network detection and prompts

```typescript
// Example: Check user's network
if (userNetwork !== "eip155:84532") {
  alert("Please switch to Base Sepolia network");
}
```

#### 4. Payment Settlement Fails

**Problem:** Payment made but not verified.

**Solutions:**
```bash
# 1. Check facilitator logs
# 2. Verify transaction on explorer
# 3. Check maxTimeoutSeconds setting (default: 300s)
# 4. Ensure sufficient gas for transaction
```

### Debug Mode

Enable detailed logging:

```bash
DEBUG=x402:* npm run dev
```

### Validation Checklist

Before deploying:

```bash
# Run all validations
npm run validate:all

# ✅ Addresses are valid
# ✅ Routes configured for both networks
# ✅ Facilitator is reachable
# ✅ Paywall UI configured
# ✅ Environment variables set
```

---

## Next Steps

1. **Test on Testnet:** Use Base Sepolia and Solana Devnet
2. **Validate Configuration:** Run `npm run validate:all`
3. **Test Payment Flow:** Try making payments
4. **Review Analytics:** Monitor transaction success rates
5. **Deploy to Mainnet:** Switch to production networks

---

## Support

- [API Reference](./API_REFERENCE.md)
- [Core Functions](./CORE_FUNCTIONS.md)
- [Component Documentation](./COMPONENTS.md)
- [X402 Protocol Docs](https://www.x402.org)
- [GitHub Issues](https://github.com/abraham-yusuf/xCreator402/issues)
