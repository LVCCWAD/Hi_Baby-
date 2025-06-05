import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
// Disable visualizer in production to save memory
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
        // mode !== 'production' && visualizer({ open: true }), // optional, uncomment for local
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
            "@tabler/icons-react":
                "@tabler/icons-react/dist/esm/icons/index.mjs",
        },
    },
    build: {
        manifest: true,
        outDir: "public/build",
        emptyOutDir: true, // must be true to avoid stale manifest issues
        sourcemap: false,
        cssCodeSplit: false,
        chunkSizeWarningLimit: 2000,
        assetsDir: ".", // optional: avoids nesting too deep
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (/\.(ttf|woff2?|eot|otf)$/.test(assetInfo.name)) {
                        return "fonts/[name][extname]";
                    }
                    return "assets/[name]-[hash][extname]";
                },
            },
        },
    },
}));
