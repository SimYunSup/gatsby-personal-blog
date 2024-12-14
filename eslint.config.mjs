import ESLintJS from '@eslint/js';
import ESLintPluginAstro from 'eslint-plugin-astro';
import ESLintPluginMDX from 'eslint-plugin-mdx';
import ESLintPluginStylistic from '@stylistic/eslint-plugin';
import ESLintPluginImport from 'eslint-plugin-import-x';
import ESLintPluginTypeScript from 'typescript-eslint';

const SRC_REGEX = "src/**/*.?([cm])[jt]s?(x)";
const TS_REGEX = "src/**/*.?([cm])[t]s?(x)";

const ESLintConfigStylistic = ESLintPluginStylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
  flat: true,
});

export default [
  {
    settings: {
      ...ESLintPluginImport.flatConfigs.typescript.settings,
    },
    plugins: {
      ...ESLintConfigStylistic.plugins,
      ...ESLintPluginImport.flatConfigs.recommended.plugins,
    },
    rules: {
      ...ESLintJS.configs.recommended.rules,
      ...ESLintConfigStylistic.rules,
      ...ESLintPluginImport.flatConfigs.recommended.rules,
      ...ESLintPluginImport.flatConfigs.typescript.rules,
      'import-x/no-unresolved': 'off',
    },
    files: [SRC_REGEX],
  },
  ...ESLintPluginTypeScript.config(
    {
      files: [TS_REGEX],
      extends: [
        ESLintPluginTypeScript.configs.recommended,
        ESLintPluginTypeScript.configs.stylistic,
      ]
    },
  ),
  ...ESLintPluginAstro.configs.recommended,
  {
    name: 'astro/stylistic',
    rules: {
      'astro/prefer-class-list-directive': 'error',
      'astro/prefer-object-class-list': 'error',
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