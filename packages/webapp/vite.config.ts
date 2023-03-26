import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "app.thermonitor.local",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://api.thermonitor.local",
        changeOrigin: true,
      },
    },
  },
});
