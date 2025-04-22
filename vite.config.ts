
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@supabase/supabase-js',
            '@tanstack/react-query'
          ],
          ui: [
            '@radix-ui/react-avatar',
            '@radix-ui/react-progress',
            '@radix-ui/react-toast',
            '@radix-ui/react-slot'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase the warning threshold to 1000kb
  }
}));
