import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "i.pravatar.cc",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "placehold.co",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "brand-zone-backend.test",
    //     port: "",
    //     pathname: "/storage/images/**",
    //   },
    // ],

    unoptimized: true,
  },
};

export default nextConfig;
