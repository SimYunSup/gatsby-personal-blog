import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
      locales: {
        ko: {
          label: '한국어',
        },
      },
      defaultLocale: 'ko',
		}),
	],
});
