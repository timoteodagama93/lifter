import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';



export default defineConfig({
  mode: 'production',
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: false,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
     sourcemap: true, // Descomente se precisar de sourcemaps
    // ... outras configurações de build
  },
  //base: '/caminho-do-subdiretorio/', // Ajuste conforme necessário
  // ... outras configurações
});
