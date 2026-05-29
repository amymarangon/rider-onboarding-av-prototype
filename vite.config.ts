import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/rider-onboarding-av-prototype/",
  server: { port: 5174, open: true },
});
