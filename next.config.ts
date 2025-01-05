import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.discordapp.com', 'tickets.minecrush.gg', `${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}`, `${process.env.NEXT_PUBLIC_LOVAC_FRONTEND_URL}`],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
