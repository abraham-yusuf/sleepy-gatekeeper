# Core Functions and Utilities

This document provides comprehensive documentation for all core functions, utilities, and configuration modules in the xCreator402 application.

## Table of Contents

1. [Payment Configuration (proxy.ts)](#payment-configuration-proxyts)
2. [Validation Scripts](#validation-scripts)
   - [Payment Configuration Validator](#payment-configuration-validator)
   - [Route Configuration Validator](#route-configuration-validator)
   - [Facilitator Connectivity Tester](#facilitator-connectivity-tester)
3. [Environment Variables](#environment-variables)

---

## Payment Configuration (proxy.ts)

The `proxy.ts` file is the central configuration module for payment processing in the application. It sets up the x402 payment infrastructure and defines payment requirements for protected routes.

### Exports

#### `evmAddress`
```typescript
export const evmAddress: `0x${string}`;
```
The Ethereum/Base wallet address configured to receive EVM network payments.

**Source:** `process.env.EVM_ADDRESS`

**Format:** Hexadecimal string starting with `0x` (42 characters total)

**Example:**
```typescript
// Access the configured EVM address
import { evmAddress } from './proxy';
console.log(evmAddress); // "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
```

---

#### `svmAddress`
```typescript
export const svmAddress: string;
```
The Solana wallet address configured to receive Solana network payments.

**Source:** `process.env.SVM_ADDRESS`

**Format:** Base58-encoded string (32-44 characters)

**Example:**
```typescript
// Access the configured Solana address
import { svmAddress } from './proxy';
console.log(svmAddress); // "7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK"
```

---

#### `server`
```typescript
export const server: x402ResourceServer;
```
The x402 resource server instance configured with the facilitator client and payment schemes.

**Configuration:**
- Uses `HTTPFacilitatorClient` for blockchain payment verification
- Registers `ExactEvmScheme` for EVM/Base network payments
- Registers `ExactSvmScheme` for Solana network payments

**Example:**
```typescript
import { server } from './proxy';

// Use in API route protection
export const GET = withX402(handler, config, server, undefined, paywall);
```

---

#### `paywall`
```typescript
export const paywall: PaywallProvider;
```
The configured paywall UI provider that handles payment interfaces.

**Configuration:**
```typescript
const paywall = createPaywall()
  .withNetwork(evmPaywall)      // EVM/Base network support
  .withNetwork(svmPaywall)       // Solana network support
  .withConfig({
    appName: "Next x402 Demo",
    appLogo: "/x402-icon-blue.png",
    testnet: true,
  })
  .build();
```

**Properties:**
- `appName`: Application name displayed in paywall UI
- `appLogo`: Path to logo image displayed in paywall
- `testnet`: Boolean indicating if using testnet (true) or mainnet (false)

**Example:**
```typescript
import { paywall } from './proxy';

// Use in route protection
export const proxy = paymentProxy(routeConfigurations, server, undefined, paywall);
```

---

#### `routeConfigurations`
```typescript
export const routeConfigurations: {
  [path: string]: RouteConfiguration;
};
```
An object containing payment configurations for all protected routes in the application.

**Type Definition:**
```typescript
interface RouteConfiguration {
  accepts: PaymentRequirement[];
  description: string;
  mimeType: string;
  extensions?: object;
}

interface PaymentRequirement {
  scheme: "exact";
  price: string;           // Format: "$0.001"
  network: string;         // CAIP-2 format: "eip155:84532" or "solana:..."
  payTo: string;
}
```

**Available Routes:**
- `/articles/web3-future` - Web3 payments article ($0.01)
- `/articles/creator-economy` - Creator economy article ($0.02)
- `/articles/decentralized-content` - Content distribution article ($0.015)
- `/podcasts/web3-insights` - Web3 insights podcast ($0.02)
- `/videos/blockchain-basics` - Blockchain basics video ($0.05)

**Example:**
```typescript
import { routeConfigurations } from './proxy';

// Access configuration for a specific route
const articleConfig = routeConfigurations['/articles/web3-future'];
console.log(articleConfig.description); // "Premium Article: The Future of Web3 Payments"
console.log(articleConfig.accepts[0].price); // "$0.01"
```

**Usage in Validation:**
```typescript
// Iterate over all configured routes
Object.keys(routeConfigurations).forEach(path => {
  const config = routeConfigurations[path];
  console.log(`Route: ${path}`);
  console.log(`Description: ${config.description}`);
  console.log(`Price: ${config.accepts[0].price}`);
});
```

---

#### `proxy`
```typescript
export const proxy: NextMiddleware;
```
The Next.js middleware function that handles payment verification for protected routes.

**Created with:**
```typescript
export const proxy = paymentProxy(
  routeConfigurations,
  server,
  undefined,
  paywall
);
```

**Parameters:**
1. `routeConfigurations` - Route-specific payment configurations
2. `server` - x402 resource server instance
3. `paywallConfig` - (undefined, using custom paywall instead)
4. `paywall` - Custom paywall provider

**Example (middleware.ts):**
```typescript
import { proxy, config } from './proxy';

export { config };
export default proxy;
```

---

#### `config`
```typescript
export const config: {
  matcher: string[];
};
```
Next.js middleware configuration specifying which routes the payment proxy should intercept.

**Matcher Patterns:**
```typescript
{
  matcher: [
    "/articles/web3-future/:path*",
    "/articles/creator-economy/:path*",
    "/articles/decentralized-content/:path*",
    "/podcasts/web3-insights/:path*",
    "/videos/blockchain-basics/:path*",
  ]
}
```

**Pattern Format:**
- `:path*` - Matches any subpath (including no subpath)
- Example: `/articles/web3-future/:path*` matches `/articles/web3-future`, `/articles/web3-future/section1`, etc.

---

### Complete proxy.ts Example

```typescript
import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { registerExactSvmScheme } from "@x402/svm/exact/server";
import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";
import { svmPaywall } from "@x402/paywall/svm";

// Environment validation
const facilitatorUrl = process.env.FACILITATOR_URL;
export const evmAddress = process.env.EVM_ADDRESS as `0x${string}`;
export const svmAddress = process.env.SVM_ADDRESS;

if (!facilitatorUrl || !evmAddress || !svmAddress) {
  console.error("❌ Required environment variables are missing");
  process.exit(1);
}

// Create and configure server
const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });
export const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);
registerExactSvmScheme(server);

// Build paywall
export const paywall = createPaywall()
  .withNetwork(evmPaywall)
  .withNetwork(svmPaywall)
  .withConfig({
    appName: process.env.APP_NAME || "Next x402 Demo",
    appLogo: process.env.APP_LOGO || "/x402-icon-blue.png",
    testnet: true,
  })
  .build();

// Define route configurations
export const routeConfigurations = {
  "/articles/web3-future": {
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
    description: "Premium Article: The Future of Web3 Payments",
    mimeType: "text/html",
  },
  // ... more routes
};

// Create proxy middleware
export const proxy = paymentProxy(
  routeConfigurations,
  server,
  undefined,
  paywall
);

// Export middleware configuration
export const config = {
  matcher: ["/articles/web3-future/:path*", /* ... */]
};
```

---

## Validation Scripts

The `scripts/` directory contains validation utilities to ensure proper configuration of the payment system.

### Payment Configuration Validator

**File:** `scripts/validate-payment-config.ts`

**Purpose:** Validates that payment addresses and facilitator URL are correctly formatted.

**Usage:**
```bash
npm run validate:config
```

#### Functions

##### `validateEvmAddress(address: string | undefined): ValidationResult`

Validates Ethereum/Base wallet address format.

**Checks:**
- Address is provided (not undefined/empty)
- Starts with `0x`
- Is exactly 42 characters long
- Contains only hexadecimal characters (0-9, a-f, A-F)

**Parameters:**
- `address` - The EVM address to validate

**Returns:**
```typescript
interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
```

**Example:**
```typescript
const result = validateEvmAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
if (result.valid) {
  console.log("✅ Valid EVM address");
} else {
  result.errors.forEach(err => console.log(`❌ ${err}`));
}
```

**Common Errors:**
- "EVM_ADDRESS is not set"
- "EVM address must start with '0x'"
- "EVM address must be 42 characters (including '0x'), got X"
- "EVM address contains invalid characters"

---

##### `validateSvmAddress(address: string | undefined): ValidationResult`

Validates Solana wallet address format.

**Checks:**
- Address is provided (not undefined/empty)
- Length is between 32-44 characters
- Contains only valid Base58 characters (excludes 0, O, I, l)

**Parameters:**
- `address` - The Solana address to validate

**Returns:** `ValidationResult`

**Example:**
```typescript
const result = validateSvmAddress("7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK");
if (result.valid) {
  console.log("✅ Valid Solana address");
} else {
  result.errors.forEach(err => console.log(`❌ ${err}`));
}
```

**Common Errors:**
- "SVM_ADDRESS is not set"
- "Solana address contains invalid base58 characters"

**Common Warnings:**
- "Solana address length is X, expected 32-44 characters"

---

##### `validateFacilitatorUrl(url: string | undefined): ValidationResult`

Validates facilitator service URL.

**Checks:**
- URL is provided (not undefined/empty)
- URL is in valid format
- Protocol is HTTP or HTTPS

**Parameters:**
- `url` - The facilitator URL to validate

**Returns:** `ValidationResult`

**Example:**
```typescript
const result = validateFacilitatorUrl("https://facilitator.example.com");
if (result.valid) {
  console.log("✅ Valid facilitator URL");
} else {
  result.errors.forEach(err => console.log(`❌ ${err}`));
}
```

**Common Errors:**
- "FACILITATOR_URL is not set"
- "Facilitator URL must use HTTP or HTTPS protocol"
- "Invalid URL format: [error message]"

---

### Route Configuration Validator

**File:** `scripts/validate-routes.ts`

**Purpose:** Validates that all protected routes have proper payment configurations for both networks.

**Usage:**
```bash
npm run validate:routes
```

#### Functions

##### `validateRouteConfiguration(): void`

Validates all route configurations defined in proxy.ts.

**Checks:**
- All routes in matcher have corresponding payment configurations
- Each route supports EVM/Base network (`eip155:*`)
- Each route supports Solana network (`solana:*`)
- Price configurations are present

**Output:**
```
🔍 Validating Protected Route Configurations...

📋 Protected Routes Analysis:

🔐 Route: /articles/web3-future
   Description: Premium Article: The Future of Web3 Payments
   Networks:
      ✅ EVM/Base - Price: $0.01, Network: eip155:84532
      ✅ Solana - Price: $0.01, Network: solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1

============================================================
📊 Summary:
   Total protected routes: 9
   Routes with EVM support: 9
   Routes with Solana support: 9
   Routes with both networks: 9

✅ All routes are properly configured for both networks!
```

**Example:**
```typescript
// Run validation programmatically
try {
  validateRouteConfiguration();
  console.log("All routes validated successfully");
} catch (error) {
  console.error("Route validation failed:", error);
}
```

---

### Facilitator Connectivity Tester

**File:** `scripts/test-facilitator.ts`

**Purpose:** Tests connectivity to the configured facilitator service and validates x402 server setup.

**Usage:**
```bash
npm run validate:facilitator
```

#### Functions

##### `testFacilitatorConnectivity(): Promise<FacilitatorStatus>`

Tests HTTP connectivity to the facilitator service.

**Returns:**
```typescript
interface FacilitatorStatus {
  reachable: boolean;
  responseTime?: number;
  error?: string;
}
```

**Checks:**
- Facilitator URL is configured
- HTTP request succeeds (status 200 or 404)
- Measures response time

**Example:**
```typescript
const status = await testFacilitatorConnectivity();
if (status.reachable) {
  console.log(`✅ Facilitator reachable (${status.responseTime}ms)`);
} else {
  console.log(`❌ Facilitator unreachable: ${status.error}`);
}
```

---

##### `validateServerConfiguration(): boolean`

Validates that the x402 server is properly initialized.

**Returns:** `true` if server is configured, `false` otherwise

**Checks:**
- Server instance exists
- Server was properly initialized

**Example:**
```typescript
if (validateServerConfiguration()) {
  console.log("✅ x402 server is ready");
} else {
  console.log("❌ x402 server initialization failed");
}
```

---

##### `testPaymentInfrastructure(): Promise<void>`

Runs comprehensive tests of the payment infrastructure.

**Tests:**
1. x402 server configuration
2. Facilitator connectivity
3. Environment variable presence

**Output:**
```
🧪 Testing Payment Infrastructure...

Test 1: x402 Server Configuration
   ✅ x402 server is initialized

Test 2: Facilitator Connectivity
   ✅ Facilitator is reachable
   ⏱️  Response time: 123ms

Test 3: Environment Variables
   ✅ FACILITATOR_URL is set
   ✅ EVM_ADDRESS is set
   ✅ SVM_ADDRESS is set

============================================================
✅ Payment infrastructure is ready!
```

**Example:**
```typescript
// Run all infrastructure tests
try {
  await testPaymentInfrastructure();
} catch (error) {
  console.error("Infrastructure test failed:", error);
  process.exit(1);
}
```

---

## Environment Variables

### Required Variables

| Variable | Description | Format | Example |
|----------|-------------|--------|---------|
| `FACILITATOR_URL` | Facilitator service endpoint | HTTP/HTTPS URL | `https://facilitator.x402.org` |
| `EVM_ADDRESS` | Ethereum/Base payment address | `0x` + 40 hex chars | `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb` |
| `SVM_ADDRESS` | Solana payment address | Base58 string | `7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK` |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `APP_NAME` | Application name for paywall UI | `"Next x402 Demo"` | `"My Creator Platform"` |
| `APP_LOGO` | Logo path for paywall UI | `"/x402-icon-blue.png"` | `"/logo.png"` |
| `CDP_CLIENT_KEY` | Coinbase Developer Platform key | - | `organizations/...` |

### Loading Environment Variables

**In Application Code:**
```typescript
// Variables are automatically loaded by Next.js from .env file
const facilitatorUrl = process.env.FACILITATOR_URL;
```

**In Scripts:**
```typescript
import { config } from "dotenv";
config(); // Load .env file

const facilitatorUrl = process.env.FACILITATOR_URL;
```

### Environment File Structure

**.env Example:**
```bash
# Required
FACILITATOR_URL=https://facilitator.x402.org
EVM_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
SVM_ADDRESS=7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK

# Optional
APP_NAME=Next x402 Demo
APP_LOGO=/x402-icon-blue.png
CDP_CLIENT_KEY=organizations/...
```

---

## Support

For additional help:
- Review [API_REFERENCE.md](./API_REFERENCE.md) for API documentation
- Check [TESTING.md](../TESTING.md) for testing procedures
- Visit [X402 Protocol Documentation](https://www.x402.org)
