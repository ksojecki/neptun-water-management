import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/neptun-ui',
  server: {
    port: 4200,
    host: 'localhost',
    https: {
      key: '/Users/kamilsojecki/.local-dev-cert/dev.pem',
      cert: '/Users/kamilsojecki/.local-dev-cert/cert.pem'
    }
  },
  preview: {
    port: 4300,
    host: 'localhost',
    https: {
      key: '/Users/kamilsojecki/.local-dev-cert/dev.pem',
      cert: '/Users/kamilsojecki/.local-dev-cert/cert.pem'
    }
  },
  plugins: [
    tsconfigPaths(),
    !process.env.VITEST && reactRouter(),
    tailwindcss()
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    emptyOutDir: true,
    transformMixedEsModules: true,
    outDir: './dist',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
}));
