/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    jwt_secret_key: `-7_z~&|ne<fw&3I3'7IsCb^#7}2hjo2{+^Zl3(Rv{9}[T:&5LJ`,
    protocol: process.env.NODE_ENV === "production" ? "https" : "http",
    rest_hostname: process.env.NODE_ENV === "production" ? "" : "localhost:5000/api/",
    ws_hostname: process.env.NODE_ENV === "production" ? "" : "localhost:5001/ws",
  },
};

module.exports = nextConfig;
