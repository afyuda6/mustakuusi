import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import routify from '@roxi/routify/vite-plugin';

export default defineConfig({
    plugins: [svelte(), routify({})],
    css: {
        modules: {
            localsConvention: "camelCase",
        }
    },
    base: '/y/',
    build: {
        outDir: '../dist/y'
    },
})
