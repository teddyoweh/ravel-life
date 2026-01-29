import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ravel.style",
      },
      {
        protocol: "https",
        hostname: "ravel-images.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "ravel-images.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "**.acbuy.com",
      },
      {
        protocol: "https",
        hostname: "**.t3.storage.dev",
      },
    ],
  },
};

export default nextConfig;
