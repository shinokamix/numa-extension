import eslint from '@eslint/js';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import vitest from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const sourceFiles = ['**/*.{js,jsx,ts,tsx}'];
const testFiles = ['**/*.{test,spec}.{js,jsx,ts,tsx}'];

export default tseslint.config(
  {
    ignores: [
      '.output/**',
      '.wxt/**',
      'coverage/**',
      'src/entrypoints/options/router/routeTree.gen.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ...eslintPluginTailwindcss.configs.recommended,
    settings: {
      tailwindcss: {
        cssConfigPath: './src/shared/styles/globals.css',
      },
    },
    rules: {
      ...eslintPluginTailwindcss.configs.recommended.rules,
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: ['logo', 'react', 'card', 'read-the-docs'],
        },
      ],
    },
  },
  {
    files: sourceFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'import-x': importX,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.json',
        },
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: 'tsconfig.json',
        }),
      ],
      react: {
        version: 'detect',
      },
    },
    rules: {
      curly: ['error', 'multi-line'],
      eqeqeq: ['error', 'always'],
      'import-x/no-cycle': 'error',
      'import-x/no-default-export': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-unassigned-import': [
        'error',
        { allow: ['@/shared/styles', '**/shared/styles/globals.css'] },
      ],
      'import-x/no-unresolved': ['error', { ignore: ['^/'] }],
      'no-console': 'warn',
      'no-warning-comments': 'warn',
      'prefer-const': ['error', { destructuring: 'all' }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 10,
        },
      ],
      '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
  {
    ...react.configs.flat.recommended,
    files: ['**/*.{jsx,tsx}'],
  },
  {
    ...react.configs.flat['jsx-runtime'],
    files: ['**/*.{jsx,tsx}'],
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: ['**/*.{jsx,tsx}'],
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ['**/*.{jsx,tsx}'],
  },
  {
    ...vitest.configs.recommended,
    files: testFiles,
    rules: {
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/no-magic-numbers': 'off',
      'import-x/no-default-export': 'off',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
    },
  },
  {
    files: ['src/entrypoints/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/{widgets,features}{,/**}',
                '@/{pages,entities}/*/{api,model,ui,lib}{,/**}',
                '@/shared/{api,config,lib,ui}/*/**',
                '../../{pages,widgets,features,entities,shared}/**',
              ],
              message:
                'WXT entrypoints may import local runtime modules and public APIs from Pages, Entities, and Shared.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/ui/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/api',
                '**/api/**',
                '**/background',
                '@/features/*/{api,background}{,/**}',
                '~/features/*/{api,background}{,/**}',
              ],
              message: 'Feature UI accesses integrations through its model.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/model/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              message: 'Feature models must remain independent of React.',
            },
            {
              name: 'react-dom',
              message: 'Feature models must remain independent of React.',
            },
          ],
          patterns: [
            {
              group: ['react-dom/**'],
              message: 'Feature models must remain independent of React.',
            },
            {
              group: ['**/ui', '**/ui/**', '@/features/*/ui{,/**}', '~/features/*/ui{,/**}'],
              message: 'Feature models must remain independent of presentation code.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/api/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/model',
                '**/model/**',
                '**/ui',
                '**/ui/**',
                '@/features/*/{model,ui}{,/**}',
                '~/features/*/{model,ui}{,/**}',
              ],
              message: 'Feature API adapters must not depend on model or presentation code.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/model/**/*.{js,jsx,ts,tsx}', 'src/shared/lib/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-globals': [
        'error',
        'browser',
        'chrome',
        'document',
        'fetch',
        'localStorage',
        'window',
      ],
    },
  },
  {
    files: ['src/entrypoints/background/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-globals': ['error', 'document', 'localStorage', 'sessionStorage', 'window'],
    },
  },
  {
    files: ['wxt.config.ts', 'src/entrypoints/*/index.{ts,tsx}'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.js'],
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      'no-undef': 'error',
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['steiger.config.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'import-x/no-default-export': 'off',
    },
  },
  prettier,
);
