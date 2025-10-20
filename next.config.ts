import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    scrollRestoration: true, 
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'], // Ajustez selon votre domaine
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
       
      },
    ]
  },
  // Augmentez les timeouts si nécessaire
  serverRuntimeConfig: {
    timeout: 30000,
  }
};

export default nextConfig;
