import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Pre-bundle the Supabase SDK so the dev server doesn't reload the page
  // the first time it's lazily imported.
  optimizeDeps: { include: ["@supabase/supabase-js"] },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
