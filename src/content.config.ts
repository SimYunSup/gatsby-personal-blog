import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
    loader: glob({ pattern: '**/*.md', base: "./src/content/posts" }),
    schema: docsSchema({
      extend: ({ image }) => {
        return z.object({
          // Add a field that must resolve to a local image.
          cover: image().optional(),
        });
      },
    })
  }),
};
