import { config } from 'dotenv'
config()

import webpack from 'webpack'

import nextPWA from 'next-pwa'

const withPWA = nextPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
})

/**@type {import('next').NextConfig} */
const nextConfig = ((_phase) => {
    // const isProduction = phase === 'production'

    return {
        publicRuntimeConfig: {
            publicRoutes: [
                'teams',
                '/v/confirm-account',
                '/t/confirm-account',
                '/t/sign-in',
                '/t/sign-up',
                '/t/forget-password',
                '/t/reset-password',
                '/',
                '/e/search',
                '/e/client/confirmation/[id]',
                '/e/pet-was-found/[id_pet]',
                '/e/pet-was-verify/[id_pet]',
                '/t/privacy-policy',
                '/t/service-terms',
                // '/t/cookie-policy',
                '/v/privacy-policy',
                '/service-terms',
                '/privacy-policy',
                '/v/service-terms',
                '/v/sign-in',
                '/v/sign-up',
                '/v/forget-password',
                '/v/reset-password',
                '/v/search',
                // '/v/cookie-policy',
            ],
        },
        compress: true,
        redirects: () => {
            // Redirect para dashboard de tutor e veterinário
            const typeProfile = process.env.MODE_PROFILE
            if (!typeProfile) return []

            const destination = typeProfile === 'tutor' ? '/t' : '/v'

            const redirectsDefault = [
                {
                    source: '/dashboard',
                    destination: `${destination}/dashboard`,
                    permanent: true,
                },
                {
                    source: '/logout',
                    destination: `${destination}/logout`,
                    permanent: true,
                },
                {
                    source: '/profile',
                    destination: `${destination}/profile`,
                    permanent: true,
                },
                {
                    source: '/forgot-password',
                    destination: `${destination}/forgot-password`,
                    permanent: true,
                },
                {
                    source: '/confirm-account',
                    destination: `${destination}/confirm-account`,
                    permanent: true,
                },
                {
                    source: '/feedback',
                    destination: `${destination}/feedback`,
                    permanent: true,
                },
                {
                    source: '/client',
                    destination: '/e/client',
                    permanent: true,
                },
                {
                    source: '/pet-was-found/:path*',
                    destination: '/e/pet-was-found/:path*',
                    permanent: true,
                },
                {
                    source: '/pet-was-verify/:path*',
                    destination: '/e/pet-was-verify/:path*',
                    permanent: true,
                },
                {
                    source: '/qrcode/:path*',
                    destination: '/e/qrcode/:path*',
                    permanent: true,
                },
                {
                    source: '/search',
                    destination: '/e/search',
                    permanent: true,
                },
                {
                    source: '/pet/medical-history/:path*',
                    destination: '/e/pet/medical-history/:path*',
                    permanent: true,
                },
                {
                    source: '/sign-in',
                    destination: `${destination}/sign-in`,
                    permanent: true,
                },
                {
                    source: '/profile',
                    destination: `${destination}/profile`,
                    permanent: true,
                },
                {
                    source: `${destination}/privacy-policy`,
                    destination: '/privacy-policy',
                    permanent: true,
                },
                {
                    source: `${destination}/service-terms`,
                    destination: '/service-terms',
                    permanent: true,
                },
            ]

            if (process.env.MODE_PROFILE === 'external') {
                redirectsDefault.push({
                    source: '/',
                    destination: 'https://www.pawkeepr.com/',
                    permanent: true,
                })
            } else {
                redirectsDefault.push({
                    source: '/',
                    destination: `${destination}/sign-in`,
                    permanent: true,
                })
            }

            if (typeProfile === 'tutor') {
                redirectsDefault.push(
                    ...[
                        {
                            source: '/tutor/:path*',
                            destination: '/t/:path*',
                            permanent: true,
                        },
                        {
                            source: '/veterinary/:path*',
                            destination: '/t/:path*',
                            permanent: true,
                        },
                        {
                            source: '/v/:path*',
                            destination: '/t/:path*',
                            permanent: true,
                        },
                    ],
                )
            }

            if (typeProfile === 'vet') {
                redirectsDefault.push(
                    ...[
                        {
                            source: '/tutor/:path*',
                            destination: '/v/:path*',
                            permanent: true,
                        },
                        {
                            source: '/veterinary/:path*',
                            destination: '/v/:path*',
                            permanent: true,
                        },
                        {
                            source: '/t/:path*',
                            destination: '/v/:path*',
                            permanent: true,
                        },
                    ],
                )
            }

            return redirectsDefault
        },
        images: {
            remotePatterns: [
                { hostname: 'loremflickr.com' },
                { hostname: 'avatars.githubusercontent.com' },
                { hostname: 'cloudflare-ipfs.com' },
                { hostname: 'z4etzps20a.execute-api.us-east-1.amazonaws.com' },
                { hostname: 'localhost' },
            ],
        },
        reactStrictMode: true,
        eslint: {
            ignoreDuringBuilds: true,
        },
        typescript: {
            ignoreBuildErrors: true,
        },
        webpack: (config) => {
            switch (process.env.MODE_PROFILE) {
                case 'tutor':
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp: /^private-next-pages\/v(\/.*)?$/,
                        }),
                    )
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp: /^private-next-pages\/e(\/.*)?$/,
                        }),
                    )
                    break
                case 'vet':
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp: /^private-next-pages\/t(\/.*)?$/,
                        }),
                    )
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp: /^private-next-pages\/e(\/.*)?$/,
                        }),
                    )
                    break
                case 'external':
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp: /^private-next-pages\/t(\/.*)?$/,
                        }),
                    )
                    config.plugins.push(
                        new webpack.IgnorePlugin({
                            resourceRegExp: /^private-next-pages\/v(\/.*)?$/,
                        }),
                    )
                    break
                default:
                    break
            }

            return config
        },
        env: {
            API_URL: process.env.REACT_APP_API_URL,
            API_FILE_URL: process.env.REACT_APP_API_FILE_URL,
            EXTERNAL_URL: process.env.REACT_APP_EXTERNAL_URL,
            SECRET_KEY: process.env.SECRET_KEY,
            MODE_PROFILE: process.env.MODE_PROFILE,
            REGION: process.env.REGION,
            USER_POOL_ID: process.env.USER_POOL_ID,
            USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID,
            FLAG_DEV: process.env.FLAG_DEV,
        },
        i18n: {
            defaultLocale: 'pt-br',
            locales: ['en', 'pt-br'],
        },
        rewrites: async () => {
            const defaultRewrites = [
                {
                    source: '/api/proxy/:path*',
                    destination: `${process.env.REACT_APP_API_URL}/:path*`,
                },
                {
                    source: '/api-file/proxy/:path*',
                    destination: `${process.env.REACT_APP_API_FILE_URL}/:path*`,
                },
            ]

            if (process.env.MODE_PROFILE === 'external') {
                defaultRewrites.push({
                    source: '/',
                    destination: 'https://www.pawkeepr.com/',
                })
            }

            return defaultRewrites
        },
        swcMinify: true,
        optimizeFonts: true,
    }
})(process.env.NODE_ENV)

export default withPWA(nextConfig)
