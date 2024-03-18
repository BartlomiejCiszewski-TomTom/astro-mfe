import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import federation from "@originjs/vite-plugin-federation";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react()],
  vite: {
    plugins: [federation({
      name: "astroApp",
      filename: "remoteEntry.js",
      remotes: {
        viteApp: "http://localhost:4173/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"] // Share react modules to avoid named exports issue.
    })]
  },
  adapter: node({
    mode: "standalone",
  })
});