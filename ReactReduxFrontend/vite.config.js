import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: /^react-bootstrap\/(.*)$/,
                replacement: "react-bootstrap/cjs/$1"
            }
        ]
    },
    ssr: {
        noExternal: true
    },
    server: {
        proxy: {
            "/anecdotes": {
                target: "http://localhost:3001",
                changeOrigin: true
            }
        }
    }
});
