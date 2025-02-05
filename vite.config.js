import { defineConfig } from "vite";
import { resolve } from "path";
import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/types.d.ts",
          rename: "index.d.ts",
          dest: ".",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
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
      entry: resolve(__dirname, "src/index.ts"),
      name: "jeditor",
      fileName: "jeditor",
      formats: ["es", "cjs"],
    },
    target: "esnext",
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: false,
          outDir: "dist",
          tsconfig: "./tsconfig.json",
        }),
      ],
    },
  },
});
