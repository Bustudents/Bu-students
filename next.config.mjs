/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/api/:path*', // Match all API routes
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' }, // Replace '*' with your specific origin in production
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' }, // Allow necessary HTTP methods
            { key: 'Access-Control-Allow-Headers', value: 'Authorization' },
            { key: 'Access-Control-Allow-Credentials', value: 'true' }, // Set to 'true' if your API requires credentials
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  