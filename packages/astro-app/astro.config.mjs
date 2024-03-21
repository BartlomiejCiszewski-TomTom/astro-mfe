import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import federation from "@originjs/vite-plugin-federation";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), tailwind()],
  vite: {
    build: {
      target: "esnext",
    },
    plugins: [
      federation({
        remotes: {
          viteApp: "http://localhost:4173/assets/remoteEntry.js",
        },
        // shared: ['react', 'react-dom']
      }),
    ],
  },
  adapter: node({
    mode: "standalone",
  }),
});
