/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/me/login',
                destination: '/auth/login',
                permanent: true,
            },
            {
                source: '/me/singup',
                destination: '/auth/singup',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
