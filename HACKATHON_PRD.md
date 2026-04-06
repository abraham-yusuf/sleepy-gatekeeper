# Gatekeeper OS — Hackathon PRD (Solana x402)

## Implementation Reality (April 2026)

| Hackathon claim | Status | Notes |
|---|---|---|
| Web OS UI | **implemented** | Desktop shell, windows, dan navigation berjalan di Next.js app. |
| Payment-aware proxy x402 | **implemented** | x402 route protection berjalan untuk content + OS API routes tertentu. |
| Agent runtime simple execution | **stub** | Endpoint terminal/agent-task masih mock-safe execution, belum runtime agent production. |
| Autonomous paid API by real agent wallet | **partial** | Payment flow ada, dan sekarang sudah ada MPP challenge-response path + x402 fallback eksplisit. |

## 🚀 Vision
Build the **Operating System for Agent Economy** where AI agents can run, interact, and pay each other using **Solana + x402**.

---

## 🎯 Problem
AI agents today cannot:
- autonomously pay for APIs/tools
- monetize their capabilities
- interact economically with other agents

---

## 💡 Solution
Gatekeeper OS provides:
- Agent runtime (simple execution)
- Payment-aware proxy (MPP primary + x402 fallback)
- Web OS UI

---

## 🧪 MVP (Hackathon Scope)
1. Agent requests payment challenge (`/api/mpp/challenge`)
2. Agent signs/submits settlement (`/api/mpp/settle`)
3. Agent calls paid OS endpoint with receipt headers
4. For `agent-task`, route accepts MPP first and falls back to x402 explicitly

> Catatan transparansi: flow di atas executable untuk demo, tetapi komponen “agent runtime real + autonomous wallet signing penuh” masih tahap lanjutan.

---

## 🏗 Architecture
- Frontend: Next.js
- Proxy: Node (proxy.ts)
- Payment primary: MPP challenge-response
- Fallback payment: x402
- Chain: Solana

---

## 🔥 Demo Flow (Executable)

> Prasyarat: server jalan di `http://localhost:3000`.

### Step 1 — Request challenge

```bash
curl -sS -X POST http://localhost:3000/api/mpp/challenge \
  -H 'content-type: application/json' \
  -d '{
    "app":"agent-task",
    "payer":"agent-wallet-001",
    "payee":"gatekeeper-treasury",
    "mint":"USDC",
    "amount":"0.05"
  }'
```

Simpan nilai `challenge.id` dari respons JSON.

### Step 2 — Settle challenge (submit tx signature)

```bash
curl -sS -X POST http://localhost:3000/api/mpp/settle \
  -H 'content-type: application/json' \
  -d '{
    "challengeId":"<challenge_id>",
    "txSignature":"5nN3yDemoTxSigForHackathon123",
    "payer":"agent-wallet-001"
  }'
```

Simpan `receiptId` dan `receipt.txSignature`.

### Step 3 — Execute paid agent task with MPP receipt

```bash
curl -sS -X POST http://localhost:3000/api/os/agent-task \
  -H 'content-type: application/json' \
  -H 'x-mpp-receipt-id: <receipt_id>' \
  -H 'x-mpp-tx-signature: <tx_signature>' \
  -d '{
    "agentId":"agent-wallet-001",
    "task":"analyze market spread"
  }'
```

Expected: task accepted (`status: queued`) tanpa perlu x402 header.

### Step 4 — Explicit x402 fallback

Panggil endpoint yang sama tanpa header MPP. Route akan masuk ke jalur fallback x402 verification.

```bash
curl -i -X POST http://localhost:3000/api/os/agent-task \
  -H 'content-type: application/json' \
  -d '{"agentId":"agent-wallet-001","task":"fallback-path-test"}'
```

Expected: respons payment challenge/x402 gating (mis. HTTP 402) jika belum attach payment x402.

---

## 🏆 Why it wins
- AI + Payments
- Real working demo
- Platform potential


### Step 5 — Multi-agent local paid call demo (Agent A → /api/os/agent-task)

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000 npx tsx -e "import { runMultiAgent } from './agents/multiAgent.ts'; runMultiAgent().then((out) => console.log(JSON.stringify(out, null, 2)));"
```

Expected output shape:

```json
{
  "step": "Agent A → paid local protected endpoint",
  "paymentProof": {
    "x-payment-mode": "x402",
    "x-payment-signature": "<solana_tx_signature>",
    "x-payment-amount": "1000",
    "x-payment-recipient": "<agent_b_public_key>"
  },
  "taskResult": {
    "app": "agent-task",
    "status": "queued",
    "taskId": "...",
    "paymentReceipt": {
      "mode": "x402",
      "proof": {
        "signature": "<same_as_payment_signature>"
      }
    }
  },
  "verification": {
    "endpoint": "http://localhost:3000/api/os/agent-task",
    "httpStatus": 200,
    "paymentReceiptId": "x402:agent-task:<signature>",
    "paymentReceiptMode": "x402",
    "verified": true
  }
}
```

Poin presentasi utama:
- **Payment proof** ada di `paymentProof` (signature, amount, recipient).
- **Task result** berasal dari endpoint lokal terproteksi (`/api/os/agent-task`).
- **Verification step** memastikan receipt header + status berhasil tervalidasi.
