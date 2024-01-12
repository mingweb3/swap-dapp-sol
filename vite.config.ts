import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default defineConfig(({ command  }) => {

  // When developing on Local
  if (command === 'serve') {
    return {
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
          "@/models": path.resolve(__dirname, "./src/models"),
          "@/public/*": path.resolve(__dirname, "./public/*"),
        },
      }
    }
  } else {
  // When Build and deploy
    return {
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
          "@/models": path.resolve(__dirname, "./src/models"),
          "@/public/*": path.resolve(__dirname, "./public/*"),
          crypto: 'crypto-browserify',
        },
      },
      optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
              NodeGlobalsPolyfillPlugin({
                buffer: true, 
                process: true,
              }), 
              NodeModulesPolyfillPlugin() 
            ]
        }
      },
      build: {
        rollupOptions: {
          plugins: [
            rollupNodePolyFill()
          ]
        }
      }
    }
  }
})
