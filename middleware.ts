/**
 * Next.js Middleware
 *
 * This middleware integrates the x402 payment proxy to protect routes
 * requiring payment before access. It intercepts requests to protected
 * routes and enforces payment requirements using the configured proxy.
 *
 * Protected routes include:
 * - /protected - Example protected music content
 * - /articles/* - Premium articles requiring payment
 * - /podcasts/* - Premium podcast episodes
 * - /videos/* - Premium video content
 *
 * The proxy handles:
 * - Payment verification via x402 protocol
 * - Support for multiple payment networks (EVM/Base and Solana)
 * - Automatic payment settlement
 * - Content delivery after successful payment
 */

export { proxy as middleware, config } from "./proxy";
