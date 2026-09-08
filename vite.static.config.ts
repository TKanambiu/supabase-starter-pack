// Static single-page build for cPanel / any plain static host.
// Run: npm run build:static  ->  outputs dist/index.html + dist/assets/ + copied public files.
// This config is completely separate from vite.config.ts (Lovable's SSR build), so
// TanStack Start, server functions, auth and the database keep working on Lovable hosting.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { fileURLToPath } from "node:url";
import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const outDir = fileURLToPath(new URL("./dist", import.meta.url));

const HTACCESS = `Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
`;

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    {
      // SPA deep-link support on Apache/cPanel + a 404 fallback for other hosts.
      name: "zentramed-static-fallbacks",
      apply: "build",
      closeBundle() {
        writeFileSync(resolve(outDir, ".htaccess"), HTACCESS);
        copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
      },
    },
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
