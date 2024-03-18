import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "viteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./ViteButton": "./src/components/ViteButton",
        "./ViteApp": "./src/App",
      },
      shared: ['react', 'react-dom', 'react-router-dom'] // Share react-router-dom with the host.
    }),
  ],
  build: {
    target: 'esnext',
  },
});
