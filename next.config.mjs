import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite el acceso desde tu IP local en modo desarrollo (HMR)
  allowedDevOrigins: ["192.168.1.221", "localhost:3000"],

  // Silencia el aviso de Turbopack al convivir con plugins de Webpack como next-pwa
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default withPWA(nextConfig);