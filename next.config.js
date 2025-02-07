const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.privacytools.io"],
  },
};

module.exports = withContentlayer(nextConfig);
