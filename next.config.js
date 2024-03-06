/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "localhost" }, { hostname: "89.116.134.135" }],
  },
  reactStrictMode: false,
  env: {
    jwt_secret_key: `-7_z~&|ne<fw&3I3'7IsCb^#7}2hjo2{+^Zl3(Rv{9}[T:&5LJ`,
    protocol: process.env.NODE_ENV === "production" ? "https" : "http",
    rest_hostname: process.env.NODE_ENV === "production" ? "89.116.134.135:5000/api/" : "localhost:5000/api/",
    ws_hostname: process.env.NODE_ENV === "production" ? "89.116.134.135:5001/ws" : "localhost:5001/ws",
  },
};

module.exports = nextConfig;
