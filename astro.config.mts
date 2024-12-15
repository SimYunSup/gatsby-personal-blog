import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';

import { RehypeFigurePlugin } from './src/config/rehype/figure';

import partytown from '@astrojs/partytown';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://ethansup.net',
  integrations: [
    starlight({
      title: {
        en: 'Think Storage',
        ko: '생각 덩어리'
      },
      description: 'blog to storing my thinking',
      logo: {
        light: './src/assets/logo/favicon-dark.svg',
        dark: './src/assets/logo/favicon.svg',
      },
      favicon: '/logo/favicon.svg',
      social: {
        github: 'https://github.com/SimYunSup',
        linkedin: 'https://www.linkedin.com/in/pedogunu',
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
    partytown({
      config: {
        forward: [
          'dataLayer.push',
        ],
      },
    }),
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
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      }
    }
  },
});