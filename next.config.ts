import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web.isaartstudio.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "wsrv.nl",
      },
    ],
  },
};

export default nextConfig;
