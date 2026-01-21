# API Reference

This document provides comprehensive documentation for all public APIs in the xCreator402 application.

## Table of Contents

1. [Public API Endpoints](#public-api-endpoints)
   - [Weather API](#weather-api)
   - [Articles API](#articles-api)
   - [Podcasts API](#podcasts-api)
   - [Videos API](#videos-api)
2. [Payment Configuration](#payment-configuration)
3. [Response Formats](#response-formats)
4. [Authentication](#authentication)

---

## Public API Endpoints

All API endpoints are protected by the x402 payment protocol and require payment before access. Each endpoint supports both EVM (Base Sepolia) and Solana (Devnet) payment networks.

### Weather API

**Endpoint:** `GET /api/weather`

**Description:** Returns current weather data for demonstration purposes.

**Payment Required:**
- **EVM/Base Network:** $0.001 USDC on Base Sepolia (`eip155:84532`)
- **Solana Network:** $0.001 USDC on Solana Devnet (`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`)

**Request:**
```bash
curl http://localhost:3000/api/weather
```

**Response (Success - 200 OK):**
```json
{
  "report": {
    "weather": "sunny",
    "temperature": 72
  }
}
```

**Response Headers:**
- `Content-Type`: `application/json; charset=utf-8`
- `PAYMENT-RESPONSE`: Base64-encoded JSON containing payment confirmation details

**Response (Payment Required - 402):**
```json
{}
```

**Response Headers:**
- `Content-Type`: `application/json; charset=utf-8`
- `PAYMENT-REQUIRED`: Base64-encoded JSON containing payment requirements

**Payment Required Header Example (decoded):**
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
        "version": "2"
      }
    }
  ]
}
```

**Example Usage:**
```typescript
// Make a request to the weather API
const response = await fetch('http://localhost:3000/api/weather', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

if (response.status === 402) {
  // Payment required - handle paywall
  const paymentHeader = response.headers.get('PAYMENT-REQUIRED');
  const paymentRequirements = JSON.parse(atob(paymentHeader));
  // Process payment...
} else if (response.ok) {
  const data = await response.json();
  console.log('Weather:', data.report);
}
```

---

### Articles API

**Endpoint:** `GET /api/articles`

**Description:** Returns a list of available premium articles.

**Payment Required:**
- **EVM/Base Network:** $0.01 USDC on Base Sepolia (`eip155:84532`)
- **Solana Network:** $0.01 USDC on Solana Devnet (`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`)

**Request:**
```bash
curl http://localhost:3000/api/articles
```

**Response (Success - 200 OK):**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "The Future of Web3 Payments",
      "excerpt": "Exploring the next generation of payment systems in Web3...",
      "url": "/articles/web3-future",
      "author": "Tech Writer"
    },
    {
      "id": 2,
      "title": "Building in the Creator Economy",
      "excerpt": "How creators are leveraging blockchain technology...",
      "url": "/articles/creator-economy",
      "author": "Industry Expert"
    },
    {
      "id": 3,
      "title": "Decentralized Content Distribution",
      "excerpt": "The impact of decentralization on content platforms...",
      "url": "/articles/decentralized-content",
      "author": "Content Analyst"
    }
  ]
}
```

**Response Headers:**
- `Content-Type`: `application/json; charset=utf-8`
- `PAYMENT-RESPONSE`: Base64-encoded JSON containing payment confirmation details

**Data Model:**
```typescript
interface Article {
  id: number;
  title: string;
  excerpt: string;
  url: string;
  author: string;
}

interface ArticlesResponse {
  articles: Article[];
}
```

**Example Usage:**
```typescript
const response = await fetch('http://localhost:3000/api/articles');

if (response.ok) {
  const data = await response.json();
  data.articles.forEach(article => {
    console.log(`${article.title} by ${article.author}`);
  });
}
```

---

### Podcasts API

**Endpoint:** `GET /api/podcasts`

**Description:** Returns a list of available premium podcast episodes.

**Payment Required:**
- **EVM/Base Network:** $0.01 USDC on Base Sepolia (`eip155:84532`)
- **Solana Network:** $0.01 USDC on Solana Devnet (`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`)

**Request:**
```bash
curl http://localhost:3000/api/podcasts
```

**Response (Success - 200 OK):**
```json
{
  "podcasts": [
    {
      "id": 1,
      "title": "Web3 Insights Episode 1",
      "duration": "45:00",
      "url": "/podcasts/web3-insights",
      "description": "Deep dive into Web3 technologies"
    },
    {
      "id": 2,
      "title": "Creator Economy Trends",
      "duration": "38:20",
      "url": "/podcasts/creator-trends",
      "description": "Exploring the modern creator economy"
    }
  ]
}
```

**Response Headers:**
- `Content-Type`: `application/json; charset=utf-8`
- `PAYMENT-RESPONSE`: Base64-encoded JSON containing payment confirmation details

**Data Model:**
```typescript
interface Podcast {
  id: number;
  title: string;
  duration: string;
  url: string;
  description: string;
}

interface PodcastsResponse {
  podcasts: Podcast[];
}
```

**Example Usage:**
```typescript
const response = await fetch('http://localhost:3000/api/podcasts');

if (response.ok) {
  const data = await response.json();
  data.podcasts.forEach(podcast => {
    console.log(`${podcast.title} - ${podcast.duration}`);
  });
}
```

---

### Videos API

**Endpoint:** `GET /api/videos`

**Description:** Returns a list of available premium video content.

**Payment Required:**
- **EVM/Base Network:** $0.01 USDC on Base Sepolia (`eip155:84532`)
- **Solana Network:** $0.01 USDC on Solana Devnet (`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`)

**Request:**
```bash
curl http://localhost:3000/api/videos
```

**Response (Success - 200 OK):**
```json
{
  "videos": [
    {
      "id": 1,
      "title": "Blockchain Basics - A Complete Guide",
      "duration": "15:30",
      "url": "/videos/blockchain-basics",
      "thumbnail": "/thumbnails/blockchain.jpg"
    },
    {
      "id": 2,
      "title": "Introduction to Web3",
      "duration": "12:45",
      "url": "/videos/web3-intro",
      "thumbnail": "/thumbnails/web3.jpg"
    }
  ]
}
```

**Response Headers:**
- `Content-Type`: `application/json; charset=utf-8`
- `PAYMENT-RESPONSE`: Base64-encoded JSON containing payment confirmation details

**Data Model:**
```typescript
interface Video {
  id: number;
  title: string;
  duration: string;
  url: string;
  thumbnail: string;
}

interface VideosResponse {
  videos: Video[];
}
```

**Example Usage:**
```typescript
const response = await fetch('http://localhost:3000/api/videos');

if (response.ok) {
  const data = await response.json();
  data.videos.forEach(video => {
    console.log(`${video.title} - ${video.duration}`);
  });
}
```

---

## Payment Configuration

### Supported Networks

The application supports two blockchain networks for payments:

1. **EVM/Base Network**
   - Network ID: `eip155:84532` (Base Sepolia testnet)
   - Mainnet ID: `eip155:8453` (Base Mainnet)
   - Token: USDC
   - Contract Address (Sepolia): `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

2. **Solana Network**
   - Network ID: `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` (Devnet)
   - Mainnet ID: `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (Mainnet)
   - Token: USDC

### Payment Schemes

All endpoints use the `exact` payment scheme, which requires:
- Exact payment amount specified in the payment requirements
- Payment to the specified recipient address
- Settlement within the timeout period (default: 300 seconds)

### Amount Format

Payment amounts in the `PAYMENT-REQUIRED` header are specified in atomic units:
- USDC has 6 decimal places
- Amount `1000` = 0.001 USDC
- Amount `10000` = 0.01 USDC

---

## Response Formats

### Success Response

When a payment has been successfully verified, the API returns the requested data along with a `PAYMENT-RESPONSE` header.

**Headers:**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
PAYMENT-RESPONSE: <base64-encoded JSON>
```

**PAYMENT-RESPONSE Header (decoded):**
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
    "maxTimeoutSeconds": 300,
    "extra": {
      "name": "USDC",
      "version": "2"
    }
  }
}
```

### Payment Required Response

When payment is required, the API returns a 402 status code with payment requirements in the header.

**Headers:**
```
HTTP/1.1 402 Payment Required
Content-Type: application/json; charset=utf-8
PAYMENT-REQUIRED: <base64-encoded JSON>
```

**Body:**
```json
{}
```

---

## Authentication

All API endpoints use the x402 payment protocol for authentication:

1. **No Traditional Authentication Required:** No API keys, tokens, or credentials needed
2. **Payment as Authentication:** A successful payment serves as authentication
3. **Blockchain Verification:** Payment verification is performed on-chain
4. **Facilitator Role:** A facilitator service coordinates payment verification
5. **Multi-Network Support:** Payments can be made on either supported blockchain network

### Payment Flow

1. Client requests protected resource
2. Server responds with `402 Payment Required` and payment details
3. Client processes payment on chosen blockchain network
4. Facilitator verifies payment on-chain
5. Server grants access to resource with `200 OK`

### Using withX402 Wrapper

The `withX402` wrapper ensures payment settlement only occurs after successful API responses (status < 400):

```typescript
import { withX402 } from "@x402/next";
import { server, paywall, evmAddress, svmAddress } from "../../../proxy";

const handler = async (req: NextRequest) => {
  // Your API logic here
  return NextResponse.json({ data: "..." });
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
      },
      {
        scheme: "exact",
        price: "$0.001",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: svmAddress,
      }
    ],
    description: "API description",
    mimeType: "application/json"
  },
  server,
  undefined,
  paywall
);
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success - Payment verified and resource delivered |
| 402 | Payment Required - Must pay to access resource |
| 400 | Bad Request - Invalid request format |
| 500 | Internal Server Error - Server-side issue |

---

## Rate Limiting

Currently, there is no rate limiting implemented. Each request requires a separate payment, which serves as a natural rate limiting mechanism.

---

## Support

For issues or questions:
- Review the [TESTING.md](../TESTING.md) guide
- Check [README.md](../README.md) for setup instructions
- Visit [X402 Protocol Documentation](https://www.x402.org)
