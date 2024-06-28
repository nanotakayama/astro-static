import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import relativeLinks from 'astro-relative-links';
import htmlBeautifier from 'astro-html-beautifier';
import publicDir from 'astro-public';

export default defineConfig({
  server: {
    host: true,
    open: true,
  },
  adapter: node({
    mode: "standalone",
  }),
  devToolbar: {
    enabled: false
  },
  integrations: [
    relativeLinks(),
    htmlBeautifier(),
    publicDir('static'),
		(await import("astro-compress")).default({
			HTML: false,
      CSS: false,
		}),
  ],
  publicDir: './dist',
  outDir: './public',
  output: "static",
  build: {
    format: 'file',
    assets: 'assets',
    inlineStylesheets: 'never',
  },
  compressHTML: false,
  vite: {
    build: {
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(-1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return 'assets/images/[name].[ext]';
            }
            if (/css|scss/i.test(extType)) {
              return 'assets/styles/app.css';
            }
          },
          entryFileNames: 'assets/scripts/app.js',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
          `@import "src/assets/styles/_global.scss";
           @import "src/assets/styles/foundation/mixin/_index.scss";
           @import "src/assets/styles/foundation/function/_index.scss";
           @import "src/assets/styles/foundation/keyframe/_index.scss";
           @import "src/assets/styles/foundation/variable/_index.scss";
           @import "src/assets/styles/foundation/vendor/_index.scss";
           @import "src/assets/styles/object/component/_index.scss";
           @import "src/assets/styles/object/project/_index.scss";
           @import "src/assets/styles/object/layout/_index.scss";
           @import "src/assets/styles/object/utility/_index.scss";`,
        }
      }
    }
  },
});
