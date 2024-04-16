import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

import moduleFederation from "astro-module-federation";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), tailwind(), moduleFederation({
    remotes: {
      viteApp: "http://localhost:4173/assets/remoteEntry.js"
    },
    shared: ['react', 'react-dom']
  })],
  adapter: node({
    mode: "standalone"
  })
});