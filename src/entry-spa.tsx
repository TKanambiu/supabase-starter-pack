// Client-only entry used by the static (cPanel) build: `npm run build:static`.
// The TanStack Start server entry (src/server.ts) is untouched and still used by Lovable hosting.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";

const router = getRouter();
const el = document.getElementById("root");

if (el) {
  createRoot(el).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
