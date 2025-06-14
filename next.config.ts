/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config: { resolve: { fallback: { fs: boolean; net: boolean; tls: boolean; }; }; externals: string[]; }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'encoding', 'lokijs', '@types/lokijs');
    return config;
  },
  env: {
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Allow any path on Unsplash
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;