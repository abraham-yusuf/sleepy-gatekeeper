# Gatekeeper OS — Hackathon PRD (Solana x402)

## Implementation Reality (April 2026)

| Hackathon claim | Status | Notes |
|---|---|---|
| Web OS UI | **implemented** | Desktop shell, windows, dan navigation berjalan di Next.js app. |
| Payment-aware proxy x402 | **implemented** | x402 route protection berjalan untuk content + OS API routes tertentu. |
| Agent runtime simple execution | **stub** | Endpoint terminal/agent-task masih mock-safe execution, belum runtime agent production. |
| Autonomous paid API by real agent wallet | **partial** | Payment flow ada, namun M2M client masih stub simulation untuk header/receipt. |

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
- Payment-aware proxy (x402 middleware)
- Web OS UI

---

## 🧪 MVP (Hackathon Scope)
1. User runs an agent
2. Agent calls paid API
3. Proxy injects x402 payment
4. Response returned

> Catatan transparansi: flow di atas sudah dapat didemokan pada level prototype, tetapi komponen “agent runtime real + autonomous wallet signing penuh” masih tahap lanjutan.

---

## 🏗 Architecture
- Frontend: Next.js
- Proxy: Node (proxy.ts)
- Payment: x402
- Chain: Solana

---

## 🔥 Demo Flow
User → Run Agent → Agent calls API → x402 payment → Response

---

## 🏆 Why it wins
- AI + Payments
- Real working demo
- Platform potential
