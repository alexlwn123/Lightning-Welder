import path from "path";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), commonjs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: path.resolve(__dirname, "node_modules/buffer"),
      cipher: path.resolve(__dirname, "node_modules/browserify-cipher"),
    },
  },
  base: "/Lightning-Welder/",
  // optimizeDeps: {
  //   exclude: ["browserify-cipher"],
  // },
});
