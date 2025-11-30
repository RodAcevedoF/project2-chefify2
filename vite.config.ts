import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			test: path.resolve(__dirname, './__tests__'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// core
					'react-vendor': ['react', 'react-dom', 'react-router-dom'],
					// UI
					mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
					// animation
					animation: ['framer-motion'],
					// data fetching & state
					data: ['@tanstack/react-query', 'axios', 'jotai'],
					// forms
					forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
					// charts
					charts: ['chart.js', 'react-chartjs-2'],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
});
