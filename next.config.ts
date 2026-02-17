import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default withSentryConfig(
  nextConfig,
  {
    org: "aritra-ps",
    project: "javascript-nextjs",

    // Only print logs in CI
    silent: !process.env.CI,

    // Upload more source maps for better stack traces
    widenClientFileUpload: true,

    // Tunnel Sentry requests (helps bypass ad blockers)
    tunnelRoute: "/monitoring",
  }
);
