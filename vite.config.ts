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
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/state": path.resolve(__dirname, "./src/state"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/public/*": path.resolve(__dirname, "./public/*"),
    },
  },
});
