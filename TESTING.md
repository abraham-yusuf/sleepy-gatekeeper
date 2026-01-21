# Payment Process Testing & Validation Guide

This guide provides comprehensive instructions for testing and validating the payment process with both EVM/Base network and Solana in the xCreator402 application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Automated Validation](#automated-validation)
3. [Manual Testing](#manual-testing)
4. [Network-Specific Testing](#network-specific-testing)
5. [Troubleshooting](#troubleshooting)
6. [Test Checklist](#test-checklist)

## Prerequisites

Before testing the payment process, ensure you have:

### Required Environment Variables

Create a `.env` file from `.env-local` and configure:

```bash
# Facilitator configuration
FACILITATOR_URL=https://your-facilitator-url.com

# Payment addresses
EVM_ADDRESS=0x... # Your Ethereum/Base wallet address (42 characters)
SVM_ADDRESS=...    # Your Solana wallet address (32-44 characters)

# Optional
CDP_CLIENT_KEY=... # Coinbase Developer Platform key
APP_NAME=Next x402 Demo
APP_LOGO=/x402-icon-blue.png
```

### Wallet Setup

#### For EVM/Base Testing:
- Install a Web3 wallet (e.g., MetaMask, Coinbase Wallet)
- Connect to Base Sepolia testnet
- Get testnet USDC from a faucet
- Network details:
  - Network: `eip155:84532` (Base Sepolia)
  - USDC Contract: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

#### For Solana Testing:
- Install a Solana wallet (e.g., Phantom, Solflare)
- Connect to Solana Devnet
- Get testnet SOL from a faucet
- Network details:
  - Network: `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` (Devnet)

## Automated Validation

The project includes several validation scripts to ensure proper configuration:

### 1. Validate Payment Configuration

Tests that all addresses and facilitator URLs are correctly formatted:

```bash
npm run validate:config
```

This script checks:
- ✅ EVM address format (0x... with 42 characters)
- ✅ Solana address format (Base58 encoding)
- ✅ Facilitator URL format and protocol

### 2. Validate Route Configuration

Ensures all protected routes support both payment networks:

```bash
npm run validate:routes
```

This script verifies:
- ✅ All routes have payment configurations
- ✅ Each route supports both EVM and Solana
- ✅ Price configurations are consistent
- ✅ Route matchers are properly configured

### 3. Test Facilitator Connectivity

Tests connectivity to the configured facilitator:

```bash
npm run validate:facilitator
```

This script confirms:
- ✅ Facilitator is reachable
- ✅ Network connectivity is working
- ✅ Response times are acceptable
- ✅ x402 server is properly initialized

### 4. Run All Validations

Execute all validation scripts at once:

```bash
npm run validate:all
```

## Manual Testing

### Protected Routes Testing

The application has multiple protected routes that can be used to test payments:

#### 1. Protected Page (`/protected`)
- **Price:** $0.001
- **Content:** Premium music track
- **Networks:** Base Sepolia + Solana Devnet

**Test Steps:**
1. Navigate to `http://localhost:3000/protected`
2. You should see a paywall modal
3. Select either EVM (Base) or Solana network
4. Complete the payment
5. Verify you can access the SoundCloud player

#### 2. Premium Articles

**Web3 Future Article** (`/articles/web3-future`)
- **Price:** $0.01
- **Content:** Article about Web3 payments

**Creator Economy Article** (`/articles/creator-economy`)
- **Price:** $0.02
- **Content:** Building in the creator economy

**Decentralized Content Article** (`/articles/decentralized-content`)
- **Price:** $0.015
- **Content:** Decentralized content distribution

**Test Steps:**
1. Navigate to any article URL
2. Verify paywall appears
3. Test payment with both networks
4. Confirm article content is displayed after payment

#### 3. Premium Podcast (`/podcasts/web3-insights`)
- **Price:** $0.02
- **Content:** Web3 Insights Episode 1

#### 4. Premium Video (`/videos/blockchain-basics`)
- **Price:** $0.05
- **Content:** Blockchain Basics tutorial

### API Route Testing

Test the protected Weather API endpoint:

```bash
# Without payment (should return 402)
curl -v http://localhost:3000/api/weather

# Check for PAYMENT-REQUIRED header
curl -I http://localhost:3000/api/weather
```

**Expected Response:**
- Status: `402 Payment Required`
- Header: `PAYMENT-REQUIRED` with base64-encoded payment details

## Network-Specific Testing

### Testing EVM/Base Network Payments

1. **Setup:**
   - Connect MetaMask/Coinbase Wallet to Base Sepolia
   - Ensure you have testnet USDC

2. **Payment Flow Test:**
   ```
   Navigate to protected route
   → Paywall appears
   → Select "Base Sepolia" network
   → Approve USDC spending (if first time)
   → Confirm payment transaction
   → Wait for transaction confirmation
   → Access granted to content
   ```

3. **Verification:**
   - Check transaction on Base Sepolia explorer
   - Verify USDC transferred to `EVM_ADDRESS`
   - Confirm content is accessible
   - Check for `PAYMENT-RESPONSE` header in browser DevTools

### Testing Solana Network Payments

1. **Setup:**
   - Connect Phantom/Solflare wallet to Solana Devnet
   - Ensure you have testnet SOL and USDC

2. **Payment Flow Test:**
   ```
   Navigate to protected route
   → Paywall appears
   → Select "Solana Devnet" network
   → Approve transaction in wallet
   → Wait for transaction confirmation
   → Access granted to content
   ```

3. **Verification:**
   - Check transaction on Solana Devnet explorer
   - Verify USDC transferred to `SVM_ADDRESS`
   - Confirm content is accessible
   - Check browser console for payment confirmation

### Cross-Network Testing

Test that users can choose either network for the same content:

1. Clear browser cache/cookies
2. Navigate to `/protected`
3. Pay with Base Sepolia
4. Verify access granted
5. Open in incognito/private window
6. Navigate to `/protected` again
7. Pay with Solana Devnet
8. Verify access granted

**Both networks should work independently for the same content.**

## Troubleshooting

### Common Issues

#### 1. "Payment Required" Error Persists After Payment

**Possible Causes:**
- Transaction not confirmed yet
- Facilitator not recognizing payment
- Browser cache issue

**Solutions:**
- Wait for transaction confirmation (check explorer)
- Clear browser cache and cookies
- Verify facilitator is running and accessible
- Check `PAYMENT-RESPONSE` header in DevTools

#### 2. Paywall Not Appearing

**Possible Causes:**
- Middleware not configured correctly
- Route not in matcher list
- Build cache issue

**Solutions:**
- Verify route is in `proxy.ts` config
- Check `config.matcher` includes the route pattern
- Restart dev server: `npm run dev`
- Clear `.next` directory: `rm -rf .next`

#### 3. Network Connection Failed

**Possible Causes:**
- Wrong network selected in wallet
- Insufficient funds
- Network congestion

**Solutions:**
- Verify wallet is on correct testnet
- Check balance (need USDC + gas token)
- Try again after a few minutes
- Check facilitator logs

#### 4. Invalid Address Format

**Error:** "EVM_ADDRESS must be 42 characters"

**Solution:**
- Ensure EVM address starts with `0x`
- Format: `0x` + 40 hexadecimal characters
- Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

**Error:** "Solana address contains invalid characters"

**Solution:**
- Solana addresses use Base58 encoding (no 0, O, I, l)
- Typically 32-44 characters
- Example: `7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK`

#### 5. Facilitator Unreachable

**Solutions:**
1. Verify `FACILITATOR_URL` is correct
2. Check facilitator service is running
3. Test connectivity: `npm run validate:facilitator`
4. Check network/firewall settings
5. Verify facilitator supports both networks

### Debug Mode

Enable verbose logging by setting environment variable:

```bash
DEBUG=x402:* npm run dev
```

This will show detailed logs for:
- Payment request processing
- Network scheme registration
- Facilitator communication
- Transaction validation

## Test Checklist

Use this checklist to ensure comprehensive testing:

### Configuration Validation
- [ ] All environment variables are set
- [ ] EVM address format is valid
- [ ] Solana address format is valid
- [ ] Facilitator URL is accessible
- [ ] All routes support both networks

### EVM/Base Network Testing
- [ ] Wallet connects to Base Sepolia
- [ ] Paywall displays Base network option
- [ ] USDC approval transaction succeeds
- [ ] Payment transaction completes
- [ ] Transaction visible on Base explorer
- [ ] Content becomes accessible
- [ ] Payment header is present in response

### Solana Network Testing
- [ ] Wallet connects to Solana Devnet
- [ ] Paywall displays Solana network option
- [ ] Payment transaction completes
- [ ] Transaction visible on Solana explorer
- [ ] Content becomes accessible
- [ ] Payment header is present in response

### Multi-Route Testing
- [ ] `/protected` works with both networks
- [ ] `/articles/web3-future` works with both networks
- [ ] `/articles/creator-economy` works with both networks
- [ ] `/articles/decentralized-content` works with both networks
- [ ] `/podcasts/web3-insights` works with both networks
- [ ] `/videos/blockchain-basics` works with both networks
- [ ] `/api/weather` returns 402 without payment

### Edge Cases
- [ ] Insufficient balance handling
- [ ] Transaction rejection handling
- [ ] Network switch mid-payment
- [ ] Multiple concurrent payments
- [ ] Browser back button after payment
- [ ] Page refresh during payment

### Performance
- [ ] Page loads within 2 seconds
- [ ] Payment confirmation within 30 seconds
- [ ] No console errors
- [ ] Responsive on mobile devices

## Success Criteria

Payment process is considered validated when:

1. ✅ All validation scripts pass
2. ✅ Payments succeed on Base Sepolia testnet
3. ✅ Payments succeed on Solana Devnet
4. ✅ Content is accessible after payment
5. ✅ Transactions are visible on explorers
6. ✅ Both networks work for all protected routes
7. ✅ No critical errors in console
8. ✅ Payment headers are present in responses

## Additional Resources

- [X402 Protocol Documentation](https://www.x402.org)
- [Base Sepolia Explorer](https://sepolia.basescan.org)
- [Solana Devnet Explorer](https://explorer.solana.com/?cluster=devnet)
- [CAIP-2 Network Identifiers](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)

## Support

If you encounter issues not covered in this guide:

1. Check the project README.md
2. Review the proxy.ts configuration
3. Verify environment variables
4. Check facilitator documentation
5. Review X402 protocol documentation
