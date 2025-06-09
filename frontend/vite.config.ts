import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
 

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000', // Laravel API
    },
  },
  // 👇 AJOUTE cette section pour Laravel
  build: {
    outDir: "../backend/public/build", // Laravel s'attend à ce dossier
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx", // ou le point d'entrée réel de ton app
    },
  },
}));
