/* eslint-disable no-undef */
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  esbuild: {
    jsxFactory: 'h', // Change this to your desired JSX factory function
    jsxFragment: 'Fragment', // Change this to your desired JSX fragment
  },

  server: {
    port: 3000,
  },
  preview: {
    port: 80,
  },
});
