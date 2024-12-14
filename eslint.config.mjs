import ESLintJS from '@eslint/js';
import ESLintPluginAstro from 'eslint-plugin-astro';
import ESLintPluginMDX from 'eslint-plugin-mdx';
import ESLintPluginStylistic from '@stylistic/eslint-plugin';
import ESLintPluginImport from 'eslint-plugin-import-x';

export default [
  ESLintJS.configs.recommended,
  ESLintPluginStylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  ESLintPluginImport.flatConfigs.recommended,
  ESLintPluginImport.flatConfigs.typescript,
  ...ESLintPluginAstro.configs.recommended,
  {
    name: 'astro/stylistic',
    rules: {
      'astro/prefer-class-list-directive': 'error',
      'astro/prefer-object-class-list ': 'error',
      'astro/prefer-split-class-list': 'error',
      'astro/sort-attributes': 'error',
    },
  },
  {
    ...ESLintPluginMDX.flat,
  },
  {
    ...ESLintPluginMDX.flatCodeBlocks,
  },
];