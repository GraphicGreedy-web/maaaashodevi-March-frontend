import { defineConfig } from "vite";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
    plugins: [
        sitemap({
            hostname: "https://maaaashodevidharmayatra.in",
            dynamicRoutes:["/", "/about", "/gallery", "/blog", "/upcoming-plans", "/contact", "/blog/spiritual-significance-varanasi"]
        }),
    ],
});
