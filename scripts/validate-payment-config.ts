/**
 * Payment Configuration Validation Script
 *
 * This script validates that the payment configuration is correctly set up
 * for both EVM (Base) and Solana networks.
 */

// Load environment variables from .env file
import { config } from "dotenv";
config();

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates EVM address format
 *
 * @param address - The EVM address to validate
 * @returns Validation result with errors and warnings
 */
function validateEvmAddress(address: string | undefined): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  if (!address) {
    result.valid = false;
    result.errors.push("EVM_ADDRESS is not set");
    return result;
  }

  // Check if it's a valid Ethereum address format
  if (!address.startsWith("0x")) {
    result.valid = false;
    result.errors.push("EVM address must start with '0x'");
  }

  if (address.length !== 42) {
    result.valid = false;
    result.errors.push(`EVM address must be 42 characters (including '0x'), got ${address.length}`);
  }

  // Check if it contains only hex characters
  const hexPattern = /^0x[0-9a-fA-F]{40}$/;
  if (!hexPattern.test(address)) {
    result.valid = false;
    result.errors.push("EVM address contains invalid characters");
  }

  return result;
}

/**
 * Validates Solana address format
 *
 * @param address - The Solana address to validate
 * @returns Validation result with errors and warnings
 */
function validateSvmAddress(address: string | undefined): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  if (!address) {
    result.valid = false;
    result.errors.push("SVM_ADDRESS is not set");
    return result;
  }

  // Solana addresses are base58 encoded and typically 32-44 characters
  if (address.length < 32 || address.length > 44) {
    result.warnings.push(`Solana address length is ${address.length}, expected 32-44 characters`);
  }

  // Check for valid base58 characters (no 0, O, I, l)
  const base58Pattern = /^[1-9A-HJ-NP-Za-km-z]+$/;
  if (!base58Pattern.test(address)) {
    result.valid = false;
    result.errors.push("Solana address contains invalid base58 characters");
  }

  return result;
}

/**
 * Validates facilitator URL
 *
 * @param url - The facilitator URL to validate
 * @returns Validation result with errors and warnings
 */
function validateFacilitatorUrl(url: string | undefined): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  if (!url) {
    result.valid = false;
    result.errors.push("FACILITATOR_URL is not set");
    return result;
  }

  try {
    const parsed = new URL(url);
    if (!parsed.protocol.startsWith("http")) {
      result.errors.push("Facilitator URL must use HTTP or HTTPS protocol");
      result.valid = false;
    }
  } catch (error) {
    result.valid = false;
    result.errors.push(
      `Invalid URL format: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  return result;
}

/**
 * Main validation function
 */
async function validatePaymentConfiguration() {
  console.log("🔍 Validating Payment Configuration...\n");

  let allValid = true;

  // Get addresses from environment
  const evmAddress = process.env.EVM_ADDRESS;
  const svmAddress = process.env.SVM_ADDRESS;
  const facilitatorUrl = process.env.FACILITATOR_URL;

  // Validate EVM Address
  console.log("1️⃣  Validating EVM (Base) Network Configuration");
  const evmResult = validateEvmAddress(evmAddress);
  if (evmResult.valid) {
    console.log("   ✅ EVM address is valid:", evmAddress);
  } else {
    allValid = false;
    console.log("   ❌ EVM address validation failed:");
    evmResult.errors.forEach(err => console.log(`      - ${err}`));
  }
  evmResult.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
  console.log();

  // Validate SVM Address
  console.log("2️⃣  Validating Solana (SVM) Network Configuration");
  const svmResult = validateSvmAddress(svmAddress);
  if (svmResult.valid) {
    console.log("   ✅ Solana address is valid:", svmAddress);
  } else {
    allValid = false;
    console.log("   ❌ Solana address validation failed:");
    svmResult.errors.forEach(err => console.log(`      - ${err}`));
  }
  svmResult.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
  console.log();

  // Validate Facilitator URL
  console.log("3️⃣  Validating Facilitator Configuration");
  const facilitatorResult = validateFacilitatorUrl(facilitatorUrl);
  if (facilitatorResult.valid) {
    console.log("   ✅ Facilitator URL is valid:", facilitatorUrl);
  } else {
    allValid = false;
    console.log("   ❌ Facilitator URL validation failed:");
    facilitatorResult.errors.forEach(err => console.log(`      - ${err}`));
  }
  facilitatorResult.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
  console.log();

  // Summary
  const SEPARATOR_LENGTH = 60;
  console.log("=".repeat(SEPARATOR_LENGTH));
  if (allValid) {
    console.log("✅ All payment configurations are valid!");
    console.log("\nNext steps:");
    console.log("1. Run 'npm run validate:routes' to check route configurations");
    console.log("2. Start the dev server with 'npm run dev'");
    console.log("3. Test payments on protected routes");
  } else {
    console.log("❌ Payment configuration has errors. Please fix them before proceeding.");
    console.log("\nTo fix:");
    console.log("1. Update your .env file with valid addresses");
    console.log("2. Run this script again to validate");
    process.exit(1);
  }
}

// Run validation
validatePaymentConfiguration().catch(error => {
  console.error("Validation failed with error:", error);
  process.exit(1);
});
