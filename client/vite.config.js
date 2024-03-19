import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  port: 3000,
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
