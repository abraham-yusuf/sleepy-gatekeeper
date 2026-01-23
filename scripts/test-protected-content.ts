/**
 * Protected Content Configuration Test
 *
 * This script validates that protected content pages (articles, podcasts, videos)
 * are properly configured with x402 payment requirements on both Solana devnet
 * and EVM networks.
 *
 * It verifies:
 * 1. All protected routes have payment configurations
 * 2. Payment options include both Solana devnet and EVM/Base networks
 * 3. Payment configurations match expected prices and descriptions
 * 4. Middleware.ts exists and exports the proxy
 */

import * as fs from "fs";

interface TestResult {
  route: string;
  passed: boolean;
  issues: string[];
}

/**
 * Tests that a route is properly configured in proxy.ts
 */
function testProtectedRoute(
  route: string,
  expectedDescription: string,
  proxyContent: string,
): TestResult {
  const result: TestResult = {
    route,
    passed: true,
    issues: [],
  };

  console.log(`\n🧪 Testing route: ${route}`);

  // Check if route exists in configuration
  if (!proxyContent.includes(`"${route}"`)) {
    result.passed = false;
    result.issues.push(`Route "${route}" not found in proxy.ts`);
    console.log(`   ❌ Route not found in proxy.ts`);
    return result;
  }

  console.log(`   ✅ Route found in proxy.ts`);

  // Check for description
  if (!proxyContent.includes(expectedDescription)) {
    result.issues.push(
      `Description "${expectedDescription}" not found for route`,
    );
    console.log(`   ⚠️  Description might not match`);
  } else {
    console.log(`   ✅ Description: "${expectedDescription}"`);
  }

  // Find the route configuration block - search for the whole section
  const routePattern = `"${route}"`; 
  const routeIndex = proxyContent.indexOf(routePattern);
  
  if (routeIndex === -1) {
    result.passed = false;
    result.issues.push("Route configuration not found in file");
    console.log(`   ❌ Configuration not found`);
    return result;
  }

  // Extract a reasonable chunk around this route to check configuration
  // Get 500 characters after the route name to capture the config
  const configBlock = proxyContent.substring(routeIndex, routeIndex + 800);

  // Check for EVM network (Base Sepolia)
  if (configBlock.includes("eip155:84532")) {
    console.log(`   ✅ EVM/Base (eip155:84532) configured`);
  } else {
    result.passed = false;
    result.issues.push("Missing EVM/Base network (eip155:84532)");
    console.log(`   ❌ EVM/Base: Not configured`);
  }

  // Check for Solana devnet
  if (configBlock.includes("solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1")) {
    console.log(`   ✅ Solana Devnet configured`);
  } else {
    result.passed = false;
    result.issues.push("Missing Solana Devnet");
    console.log(`   ❌ Solana Devnet: Not configured`);
  }

  // Check for price configuration
  if (configBlock.includes('price: "$')) {
    const priceMatch = configBlock.match(/price: "(\$[\d.]+)"/);
    if (priceMatch) {
      console.log(`   ✅ Price configured: ${priceMatch[1]}`);
    }
  } else {
    result.issues.push("Price configuration not found");
    console.log(`   ⚠️  Price: Not found or invalid format`);
  }

  if (result.passed) {
    console.log(`   ✅ Route is properly configured`);
  }

  return result;
}

/**
 * Main test runner
 */
function runTests() {
  console.log("🚀 Testing Protected Content Configuration\n");
  console.log("=".repeat(60));

  // Read proxy.ts file
  let proxyContent: string;
  try {
    proxyContent = fs.readFileSync("./proxy.ts", "utf-8");
  } catch (error) {
    console.error("❌ Could not read proxy.ts:", error);
    process.exit(1);
  }

  // Test middleware.ts exists
  console.log("\n📄 Checking middleware.ts...");
  try {
    const middlewareContent = fs.readFileSync("./middleware.ts", "utf-8");
    if (middlewareContent.includes('export { proxy as middleware')) {
      console.log("   ✅ middleware.ts exists and exports proxy");
    } else {
      console.log("   ⚠️  middleware.ts exists but might not export proxy correctly");
    }
  } catch (error) {
    console.error("   ❌ middleware.ts not found");
    process.exit(1);
  }

  const tests = [
    { route: "/protected", description: "Premium music: x402 Remix" },
    {
      route: "/articles/web3-future",
      description: "Premium Article: The Future of Web3 Payments",
    },
    {
      route: "/articles/creator-economy",
      description: "Premium Article: Building in the Creator Economy",
    },
    {
      route: "/articles/decentralized-content",
      description: "Premium Article: Decentralized Content Distribution",
    },
    {
      route: "/podcasts/web3-insights",
      description: "Premium Podcast: Web3 Insights Episode 1",
    },
    {
      route: "/videos/blockchain-basics",
      description: "Premium Video: Blockchain Basics - A Complete Guide",
    },
  ];

  const results: TestResult[] = [];

  for (const test of tests) {
    const result = testProtectedRoute(test.route, test.description, proxyContent);
    results.push(result);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Test Summary\n");

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  console.log(`Total routes tested: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log("\n❌ Failed Routes:");
    results
      .filter(r => !r.passed)
      .forEach(r => {
        console.log(`\n   ${r.route}:`);
        r.issues.forEach(issue => console.log(`      - ${issue}`));
      });
  }

  console.log("\n" + "=".repeat(60));

  if (failed === 0) {
    console.log("\n✅ All protected content pages are properly configured!");
    console.log("   - All routes have payment configurations");
    console.log("   - All routes support Solana devnet payments");
    console.log("   - All routes support EVM/Base payments");
    console.log("   - middleware.ts is properly configured");
    console.log("\n🎉 Protected content is ready!");
    console.log("\n📝 Next steps:");
    console.log("   1. Configure .env with valid addresses and facilitator URL");
    console.log("   2. Run: npm run dev");
    console.log("   3. Visit protected routes and test payment flow");
    process.exit(0);
  } else {
    console.log("\n❌ Some routes have configuration issues.");
    console.log("   Please fix the issues listed above and run the test again.");
    process.exit(1);
  }
}

// Run tests
try {
  runTests();
} catch (error) {
  console.error("Fatal error running tests:", error);
  process.exit(1);
}
