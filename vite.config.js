import { defineConfig } from "vite";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      locales: path.resolve(__dirname, "./src/locales"),
      sass: path.resolve(__dirname, "./src/sass"),
      themes: path.resolve(__dirname, "./src/sass/themes"),
      examples: path.resolve(__dirname, "./examples"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      fileName: "jeditor",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist",
        }),
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css") return "jeditor.css";
          return assetInfo.name;
        },
      },
    },
  },
});
