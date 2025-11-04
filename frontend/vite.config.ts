import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()], //allow us to use shorter path names during import. add path alias in ts.config.json file
  base: "/",
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"), //instead of './src/utils/file.tsx, you can use @utils/file.tsx
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // This injects variables and mixins into every .scss file
        additionalData: `
          @use "/src/styles/variables.scss" as *;
        `,
      },
    },
  },
});
