/**
 * Facilitator Connectivity Test
 *
 * This script tests connectivity to the configured facilitator
 * and validates that it can handle payment requests.
 */

// Load environment variables FIRST before any imports
import { config as loadEnv } from "dotenv";
loadEnv();

// Now import from proxy
const { server } = await import("../proxy.js");

interface FacilitatorStatus {
  reachable: boolean;
  responseTime?: number;
  error?: string;
}

/**
 * Tests connectivity to the facilitator
 *
 * @returns Promise resolving to facilitator status information
 */
async function testFacilitatorConnectivity(): Promise<FacilitatorStatus> {
  const facilitatorUrl = process.env.FACILITATOR_URL;

  if (!facilitatorUrl) {
    return {
      reachable: false,
      error: "FACILITATOR_URL not configured",
    };
  }

  console.log(`📡 Testing connectivity to facilitator: ${facilitatorUrl}`);

  try {
    const startTime = Date.now();

    // Test basic HTTP connectivity
    const response = await fetch(facilitatorUrl, {
      method: "GET",
      headers: {
        "User-Agent": "xCreator402-Payment-Validator/1.0",
      },
    });

    const responseTime = Date.now() - startTime;

    if (response.ok || response.status === 404) {
      // 404 is acceptable as the facilitator might not have a root endpoint
      return {
        reachable: true,
        responseTime,
      };
    } else {
      return {
        reachable: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      reachable: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Validates that the x402 server is properly configured
 *
 * @returns True if server is properly configured, false otherwise
 */
function validateServerConfiguration(): boolean {
  console.log("🔧 Validating x402 server configuration...");

  try {
    // Check if server is instantiated
    if (!server) {
      console.log("   ❌ x402 server is not initialized");
      return false;
    }

    console.log("   ✅ x402 server is initialized");
    return true;
  } catch (error) {
    console.log(
      `   ❌ Server validation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
    return false;
  }
}

/**
 * Main test function
 */
async function testPaymentInfrastructure() {
  console.log("🧪 Testing Payment Infrastructure...\n");

  let allPassed = true;

  // Test 1: Server Configuration
  console.log("Test 1: x402 Server Configuration");
  const serverValid = validateServerConfiguration();
  if (!serverValid) {
    allPassed = false;
  }
  console.log();

  // Test 2: Facilitator Connectivity
  console.log("Test 2: Facilitator Connectivity");
  const facilitatorStatus = await testFacilitatorConnectivity();

  if (facilitatorStatus.reachable) {
    console.log(`   ✅ Facilitator is reachable`);
    console.log(`   ⏱️  Response time: ${facilitatorStatus.responseTime}ms`);
  } else {
    console.log(`   ❌ Facilitator is not reachable`);
    console.log(`   Error: ${facilitatorStatus.error}`);
    allPassed = false;
  }
  console.log();

  // Test 3: Environment Configuration
  console.log("Test 3: Environment Variables");
  const requiredVars = ["FACILITATOR_URL", "EVM_ADDRESS", "SVM_ADDRESS"];
  const missingVars: string[] = [];

  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      console.log(`   ❌ ${varName} is not set`);
      missingVars.push(varName);
      allPassed = false;
    } else {
      console.log(`   ✅ ${varName} is set`);
    }
  });
  console.log();

  // Summary
  const SEPARATOR_LENGTH = 60;
  console.log("=".repeat(SEPARATOR_LENGTH));
  if (allPassed) {
    console.log("✅ Payment infrastructure is ready!");
    console.log("\nYou can now:");
    console.log("1. Start the development server with 'npm run dev'");
    console.log("2. Navigate to protected routes to test payments");
    console.log("3. Use both EVM (Base) and Solana networks for testing");
  } else {
    console.log("❌ Payment infrastructure has issues that need to be resolved.");

    if (missingVars.length > 0) {
      console.log("\nMissing environment variables:");
      missingVars.forEach(v => console.log(`   - ${v}`));
      console.log("\nPlease update your .env file with the required values.");
    }

    if (!facilitatorStatus.reachable) {
      console.log("\nFacilitator connectivity issues:");
      console.log(`   - ${facilitatorStatus.error}`);
      console.log("\nPlease verify:");
      console.log("   1. FACILITATOR_URL is correct");
      console.log("   2. The facilitator service is running");
      console.log("   3. Network connectivity is available");
    }

    process.exit(1);
  }
}

// Run tests
testPaymentInfrastructure().catch(error => {
  console.error("❌ Test failed with error:", error);
  process.exit(1);
});
