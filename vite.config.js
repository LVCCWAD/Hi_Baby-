import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
            manifest: "manifest.json", // ✅ Fix path for Laravel
        }),
        react(),
        // mode !== 'production' && visualizer({ open: true }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
            "@tabler/icons-react":
                "@tabler/icons-react/dist/esm/icons/index.mjs",
        },
    },
    build: {
        manifest: "manifest.json",
        outDir: "public/build",
        emptyOutDir: true,
        sourcemap: false,
        cssCodeSplit: false,
        chunkSizeWarningLimit: 2000,
        assetsDir: ".",
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
