import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => {
    return {
        base: '/frontend-challenges/',
        server: {
            port: 3000,
            open: true,
        },
        build: {
            outDir: 'build',
            // TODO: This breaks GH Pages of the app
            // rollupOptions: {
            //     output: {
            //         manualChunks(id) {
            //             // Specific Vendor Group Splits
            //             if (id.includes('validator')) {
            //                 return 'vendor_validator';
            //             }
            //             if (id.includes('dayjs')) {
            //                 return 'vendor_dayjs';
            //             }
            //             if (id.includes('axios')) {
            //                 return 'vendor_axios';
            //             }
            //             if (id.includes('mathjs')) {
            //                 return 'vendor_mathjs';
            //             }
            //             if (id.includes('openmeteo')) {
            //                 return 'vendor_openmeteo';
            //             }
            //             if (id.includes('lodash')) {
            //                 return 'vendor_lodash';
            //             }
            //             if (id.includes('dotenv')) {
            //                 return 'vendor_dotenv';
            //             }
            //             if (id.includes('is-valid-domain')) {
            //                 return 'vendor_is_valid_domain';
            //             }
            //             if (id.includes('sass')) {
            //                 return 'vendor_sass';
            //             }
            //             if (['chart.js', 'react-chartjs-2'].some(el => id.includes(el))) {
            //                 return 'vendor_chartjs';
            //             }
            //             if (['leaflet', 'react-leaflet'].some(el => id.includes(el))) {
            //                 return 'vendor_leaflet';
            //             }
            //             if (
            //                 [ 
            //                     '@fortawesome/fontawesome-svg-core', 
            //                     '@fortawesome/free-brands-svg-icons',
            //                     '@fortawesome/free-regular-svg-icons',
            //                     '@fortawesome/free-solid-svg-icons',
            //                     '@fortawesome/react-fontawesome'
            //                 ].some(el => id.includes(el))
            //             ) {
            //                 return 'vendor_fortawesome';
            //             }

            //             // Split components into their own chunk
            //             if (id.includes('src/components/')) {
            //                 return 'components';
            //             }

            //             // Split other vendor libraries
            //             if (id.includes('/node_modules/')) {
            //                 return 'vendor';
            //             }
            //         },
            //     },
            // },
        },
        plugins: [
            react(),
            visualizer({
                // open: true, // Automatically opens the visualizer in your browser
            }),
        ],
    };
});