import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { seoPages } from './plugins/seoPages';

export default defineConfig({ plugins: [react(), seoPages()] });
