import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';

import { RehypeFigurePlugin } from './src/config/rehype/figure';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: {
        en: 'Ethan Sup\'s logs',
        ko: '생각 덩어리'
      },
      description: 'blog to storing my thinking',
      logo: {
        src: './public/favicon-96x96.png',
      },
      // favicon: '/public/favicon-',
      social: {
        github: 'https://github.com/SimYunSup',
      },
      customCss: [
        './src/styles/custom.css',
        './src/styles/component.css'
      ],
      locales: {
        ko: {
          label: '한국어',
        },
      },
      defaultLocale: 'ko',
      components: {
        Sidebar: './src/components/Sidebar.astro',
        PageFrame: './src/components/PageFrame.astro',
        Hero: './src/components/Hero.astro',
      },
    }),
    icon(),
  ],
  vite: {
    resolve: {
      alias: {
        '@components': path.resolve(dirname, './src/components'),
        '@styles': path.resolve(dirname, './src/styles'),
      }
    }
  },
  markdown: {
    rehypePlugins: [
      RehypeFigurePlugin,
    ],
  },
});