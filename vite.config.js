import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
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
        emptyOutDir: true,
        sourcemap: false,
        cssCodeSplit: false, // Disable CSS splitting to save memory
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
});
