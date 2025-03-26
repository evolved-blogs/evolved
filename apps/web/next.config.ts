/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["miro.medium.com", "evolved-media.s3.ap-south-1.amazonaws.com"], // Add Medium's image CDN domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
