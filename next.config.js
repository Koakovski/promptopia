/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
};

module.exports = nextConfig;
