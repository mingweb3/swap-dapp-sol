import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/app/components"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/models": path.resolve(__dirname, "./src/models"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/state": path.resolve(__dirname, "./src/state"),
      "@/public/*": path.resolve(__dirname, "./public/*"),
    },
  },
});
