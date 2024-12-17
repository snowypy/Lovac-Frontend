import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.discordapp.com', 'tickets.minecrush.gg'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
