import { defineConfig } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { astroImageTools } from "astro-imagetools";
import sitemap from "@astrojs/sitemap";
import relativeLinks from 'astro-relative-links';
import htmlBeautifier from 'astro-html-beautifier';
// import publicDir from 'astro-public';

export default defineConfig({
  server: {
    host: true,
    open: true,
  },
  devToolbar: {
    enabled: false
  },
  integrations: [astroImageTools],
  integrations: [
    relativeLinks(),
    htmlBeautifier(),
    sitemap(),
		(await import("astro-compress")).default({
			HTML: false,
      CSS: false,
		}),
  ],
  publicDir: 'true',
  outDir: './public',
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
      assetInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/scripts/app.js',
          assetFileNames: (assetInfo) => {
            const {name} = assetInfo
            if (/\.(jpe?g|png|gif|svg|xml|ico)$/.test(name ?? '')) {
              return 'assets/images/[name][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/styles/app[extname]';
            }
            return 'assets/[name][extname]';
          }
        },
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "src/assets/images/*",
            dest: "assets/images",
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
          '@use "src/assets/styles/_global.scss" as *;'
        }
      }
    }
  },
});
