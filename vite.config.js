import dts from "vite-plugin-dts";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [dts({ rollupTypes: true })],
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "mockObjects",
      formats: ["es", "cjs", "iife"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["object-recipes"],
    },
  },
});
