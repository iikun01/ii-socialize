/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    // ppr: 'incremental' -- disabled for Production in Vercel
  },
};

export default nextConfig;
