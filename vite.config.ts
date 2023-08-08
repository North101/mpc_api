import { resolve } from 'path';
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: "src/data",
    lib: {
      entry: {
        "mpc_api": resolve(__dirname, 'src/mpc_api.ts'),
        "data": resolve(__dirname, 'src/data.ts'),
      },
      name: 'MPC API',
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
