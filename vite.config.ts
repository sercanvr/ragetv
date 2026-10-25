/// <reference types="vitest" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { app } from './server/app';

// Vite dev server middleware to serve Hono /api/* routes locally
function honoDevPlugin(): Plugin {
  return {
    name: 'hono-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          try {
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers.host || 'localhost:5173';
            const fullUrl = `${protocol}://${host}${req.url}`;

            const headers = new Headers();
            for (const [key, val] of Object.entries(req.headers)) {
              if (val) {
                if (Array.isArray(val)) {
                  val.forEach((v) => headers.append(key, v));
                } else {
                  headers.set(key, val);
                }
              }
            }

            const honoReq = new Request(fullUrl, {
              method: req.method || 'GET',
              headers,
            });

            const honoRes = await app.fetch(honoReq);

            res.statusCode = honoRes.status;
            honoRes.headers.forEach((v, k) => {
              res.setHeader(k, v);
            });

            const body = await honoRes.text();
            res.end(body);
            return;
          } catch (err) {
            console.error('Hono dev middleware error:', err);
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), honoDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  server: {
    host: true, // Mobil ve yerel ağ erişimi için şart (0.0.0.0)
    open: true, // Varsayılan tarayıcıda otomatik aç
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173, // Mobilde anlık yenileme için şart
    },
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            return 'vendor-utils';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
