/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  env:{
    API: 'http://localhost:5000',
  },
  reactStrictMode: true,
};

export default nextConfig;
