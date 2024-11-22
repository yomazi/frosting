import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  server: {
    https: {
      key: "../https/server.key",
      cert: "../https/server.cert",
    },

    proxy: {
      "/api": {
        target: "https://localhost:443", // Your Express server
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000,
  },
});
