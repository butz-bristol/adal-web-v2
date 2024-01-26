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
    // Use 'jsx' loader for '.js' files
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx', // Optional, specify 'jsx' for '.jsx' files as well
    },
  },

  server: {
    port: 3000,
  },
  preview: {
    port: 80,
  },
});
