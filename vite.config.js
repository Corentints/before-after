// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/BeforeAfter.ts',
      name: 'BeforeAfter',
      fileName: 'before-after',
    },
  },
  plugins: [
    cssInjectedByJsPlugin({ topExecutionPriority: false }),
  ],
});
