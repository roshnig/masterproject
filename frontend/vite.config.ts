import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()], //allow us to use shorter path names during import. add path alias in ts.config.json file
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@context": path.resolve(__dirname, "src/context"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"), //instead of './src/utils/file.tsx, you can use @utils/file.tsx
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // This injects variables and mixins into every .scss file
        additionalData: `
          @use "/src/styles/variables.scss" as *;
           @use "/src/styles/colors.scss" as *;
            @use "/src/styles/mixins.scss" as *;
             @use "/src/styles/index.scss" as *;
        `,
      },
    },
  },
  optimizeDeps: {
    include: ["@mui/material", "@mui/icons-material"], //mui prod build optimization
  },
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1000,
  },
});
