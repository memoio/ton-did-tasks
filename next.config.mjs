/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AIRDROP_BACKEND_URL: (() => {
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8080';
      } else {
        return 'https://data-be.metamemo.one';
      }
    })()
  }
};

export default nextConfig;
