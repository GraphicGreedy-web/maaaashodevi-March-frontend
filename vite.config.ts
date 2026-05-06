import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import { blogPosts } from "./src/data/blogPosts";

const staticRoutes = [
  "/about",
  "/gallery",
  "/blog",
  "/upcoming-plans",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
];

const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://maaaashodevidharmayatra.in",
      dynamicRoutes: [...staticRoutes, ...blogRoutes],
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
