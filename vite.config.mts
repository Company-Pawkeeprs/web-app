/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react-swc'
import check from 'vite-plugin-checker'

import { config } from 'dotenv'
import { URL, fileURLToPath } from 'node:url'

config()

export default defineConfig({
    root: __dirname,
    plugins: [
        react(),
        check({
            typescript: false,
        }),
    ],
    test: {
        setupFiles: ['./setupTests.ts', './setupMocks.ts'],
        globals: true,
        environment: 'jsdom', // <==
        coverage: {
            provider: 'istanbul', // or 'c8'
            include: ['source/**/*.{ts,tsx}'],
            all: true,
        },
        reporters: ['html', 'default'],
        testTimeout: 5000000,
        exclude: ['**/node_modules/**', '**/.next/**', '**/.docker/**'],
    },
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./source', import.meta.url)),
        },
    },
})
