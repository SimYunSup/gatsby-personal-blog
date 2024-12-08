import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
    schema: docsSchema({
      extend: ({ image }) => {
        return z.object({
          // Add a field that must resolve to a local image.
          cover: image(),
        });
      },
    })
  }),
};
