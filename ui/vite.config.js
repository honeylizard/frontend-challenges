import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => {
    return {
        server: {
            port: 3000,
            open: true,
        },
        build: {
            outDir: 'build',
        },
        plugins: [
            react(),
            visualizer({
                // open: true, // Automatically opens the visualizer in your browser
            }),
        ],
    };
});