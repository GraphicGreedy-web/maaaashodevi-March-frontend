import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://maaaashodevidharmayatra.in", // change to your real domain
    dynamicRoutes:["/", "/about", "/gallery", "/blog", "/upcoming-plans", "/contact", "/blog/spiritual-significance-varanasi"]}),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
