/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "localhost" }, { hostname: "cliemb.online" }],
  },
  reactStrictMode: false,
  env: {
    jwt_secret_key: `-7_z~&|ne<fw&3I3'7IsCb^#7}2hjo2{+^Zl3(Rv{9}[T:&5LJ`,
    protocol: process.env.NODE_ENV === "production" ? "https" : "http",
    hostname: process.env.NODE_ENV === "production" ? "cliemb.online" : "localhost:5000",
    rest_hostname: process.env.NODE_ENV === "production" ? "cliemb.online/api/" : "localhost:5000/api/",
    ws_hostname: process.env.NODE_ENV === "production" ? "cliemb.online/ws" : "http://localhost:5001",
  },
};

module.exports = nextConfig;
