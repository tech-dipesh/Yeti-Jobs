import { defineConfig } from "vite";
import path from "node:path"
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/
// 1. Define __dirname manually for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({
     open: true,
     gzipSize: true
   })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
