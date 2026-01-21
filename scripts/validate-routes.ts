/**
 * Route Configuration Validation Script
 *
 * This script validates that all protected routes have proper payment
 * configurations for both EVM (Base) and Solana networks.
 */

// Load environment variables FIRST before any imports
import { config as loadEnv } from "dotenv";
loadEnv();

// Now import from proxy
const { routeConfigurations, config } = await import("../proxy.js");

interface RouteConfig {
  path: string;
  hasEvm: boolean;
  hasSolana: boolean;
  description: string;
  price?: string;
}

/**
 * Analyzes proxy configuration to validate route setup
 */
function validateRouteConfiguration() {
  console.log("🔍 Validating Protected Route Configurations...\n");

  const routes: RouteConfig[] = [];

  let allValid = true;

  console.log("📋 Protected Routes Analysis:\n");

  // Analyze each route in the matcher
  config.matcher.forEach((pattern: string) => {
    const routePath = pattern.replace("/:path*", "");
    console.log(`🔐 Route: ${routePath}`);

    // Check if route has payment configuration
    const routeConfig = routeConfigurations[routePath];

    if (!routeConfig) {
      console.log(`   ❌ No payment configuration found for this route`);
      allValid = false;
      return;
    }

    const accepts = routeConfig.accepts || [];
    const hasEvm = accepts.some(
      (accept: { network?: string }) => accept.network && accept.network.startsWith("eip155:"),
    );
    const hasSolana = accepts.some(
      (accept: { network?: string }) => accept.network && accept.network.startsWith("solana:"),
    );

    console.log(`   Description: ${routeConfig.description || "N/A"}`);
    console.log(`   Networks:`);

    if (hasEvm) {
      const evmConfig = accepts.find((a: { network?: string }) => a.network?.startsWith("eip155:"));
      console.log(
        `      ✅ EVM/Base - Price: ${evmConfig?.price || "N/A"}, Network: ${evmConfig?.network || "N/A"}`,
      );
    } else {
      console.log(`      ❌ EVM/Base - Not configured`);
      allValid = false;
    }

    if (hasSolana) {
      const solanaConfig = accepts.find((a: { network?: string }) =>
        a.network?.startsWith("solana:"),
      );
      console.log(
        `      ✅ Solana - Price: ${solanaConfig?.price || "N/A"}, Network: ${solanaConfig?.network || "N/A"}`,
      );
    } else {
      console.log(`      ❌ Solana - Not configured`);
      allValid = false;
    }

    if (!hasEvm || !hasSolana) {
      console.log(`   ⚠️  Warning: Route does not support both payment networks`);
    }

    routes.push({
      path: routePath,
      hasEvm,
      hasSolana,
      description: routeConfig.description || "",
      price: accepts[0]?.price,
    });

    console.log();
  });

  // Summary
  const SEPARATOR_LENGTH = 60;
  console.log("=".repeat(SEPARATOR_LENGTH));
  console.log(`📊 Summary:`);
  console.log(`   Total protected routes: ${routes.length}`);
  console.log(`   Routes with EVM support: ${routes.filter(r => r.hasEvm).length}`);
  console.log(`   Routes with Solana support: ${routes.filter(r => r.hasSolana).length}`);
  console.log(
    `   Routes with both networks: ${routes.filter(r => r.hasEvm && r.hasSolana).length}`,
  );
  console.log();

  if (allValid) {
    console.log("✅ All routes are properly configured for both networks!");
  } else {
    console.log("❌ Some routes are missing payment network configurations.");
    console.log("\nRecommendation: Ensure all protected routes support both EVM and Solana");
    console.log("for maximum user accessibility and payment flexibility.");
    process.exit(1);
  }
}

// Run validation
try {
  validateRouteConfiguration();
} catch (error) {
  console.error("❌ Validation failed with error:", error);
  console.error("\nThis might indicate a problem with the proxy configuration.");
  process.exit(1);
}
