import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  // ✅ Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@tanstack/react-query",
      "axios",
      "recharts",
    ],
  },
  rollupOptions: {
    output: {
      manualChunks: {
        // ✅ Split vendor chunks for better caching
        "react-vendor": ["react", "react-dom"],
        "query-vendor": ["@tanstack/react-query"],
        "chart-vendor": ["recharts"],
        "axios-vendor": ["axios"],
      },
    },
  },
  // ✅ Optimize chunk size
  chunkSizeWarningLimit: 1000,
});
