/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "correctrefund-backend.vercel.app",
        port: "",
      },
    ],
  },
};

export default nextConfig;
