import type { NextConfig } from "next";
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'api.myarmy.kz',
                pathname: '/media/**',
            },
        ],
    },
}
const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['89.46.33.188']
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://89.46.33.188/api/:path*",
            },
        ];

    },
};

export default nextConfig;
