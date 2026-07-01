import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // 增加API路由请求体大小限制
  bodyParser: {
    sizeLimit: '10mb',
  },
};

export default nextConfig;
