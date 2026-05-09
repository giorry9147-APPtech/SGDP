import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Voorkom workspace-detectie warning door root expliciet te zetten.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
