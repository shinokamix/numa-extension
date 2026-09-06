import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import regexp from 'eslint-plugin-regexp';
import security from 'eslint-plugin-security';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const sourceFiles = ['**/*.{js,jsx,ts,tsx}'];
const testFiles = ['**/*.{test,spec}.{js,jsx,ts,tsx}'];

const asErrors = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([name, configuration]) => {
      const severity = Array.isArray(configuration) ? configuration[0] : configuration;

      return [
        name,
        severity === 'off' || severity === 0
          ? configuration
          : Array.isArray(configuration)
            ? ['error', ...configuration.slice(1)]
            : 'error',
      ];
    }),
  );

export default tseslint.config(
  {
    ignores: [
      '.output/**',
      '.wxt/**',
      'coverage/**',
      'src/entrypoints/options/router/routeTree.gen.ts',
    ],
  },
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    ...eslintPluginTailwindcss.configs.recommended,
    settings: {
      tailwindcss: {
        cssConfigPath: './src/shared/styles/globals.css',
      },
    },
    rules: {
      ...asErrors(eslintPluginTailwindcss.configs.recommended.rules),
      'tailwindcss/no-custom-classname': 'error',
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
      promise,
      regexp,
      security,
      'simple-import-sort': simpleImportSort,
      sonarjs,
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
      ...asErrors(importX.flatConfigs.recommended.rules),
      ...asErrors(importX.flatConfigs.typescript.rules),
      ...asErrors(regexp.configs['flat/recommended'].rules),
      complexity: ['error', { max: 12 }],
      curly: ['error', 'multi-line'],
      eqeqeq: ['error', 'always'],
      'max-depth': ['error', 4],
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': [
        'error',
        { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      'max-nested-callbacks': ['error', 4],
      'max-params': ['error', 4],
      'max-statements': ['error', 40],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-anonymous-default-export': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-deprecated': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.{test,spec}.{js,jsx,ts,tsx}',
            '**/*.config.{js,ts}',
            'eslint.config.js',
          ],
          whitelist: ['wxt'],
        },
      ],
      'import-x/no-default-export': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-unassigned-import': [
        'error',
        { allow: ['@/shared/styles', '**/shared/styles/globals.css'] },
      ],
      'import-x/no-mutable-exports': 'error',
      'import-x/no-named-default': 'error',
      'import-x/no-relative-packages': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-unresolved': ['error', { ignore: ['^/'] }],
      'import-x/no-useless-path-segments': 'error',
      'promise/no-multiple-resolved': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/param-names': 'error',
      'security/detect-bidi-characters': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-new-buffer': 'error',
      'security/detect-non-literal-require': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'no-console': 'error',
      'no-warning-comments': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-check': false,
          'ts-expect-error': true,
          'ts-ignore': true,
          'ts-nocheck': true,
        },
      ],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'error',
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
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
  {
    ...react.configs.flat.recommended,
    files: ['**/*.{jsx,tsx}'],
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/button-has-type': 'error',
      'react/destructuring-assignment': 'error',
      'react/hook-use-state': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-array-index-key': 'error',
      'react/no-multi-comp': 'error',
      'react/no-object-type-as-default-prop': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/prefer-stateless-function': 'error',
      'react/self-closing-comp': 'error',
    },
  },
  {
    files: [
      'src/pages/providers/ui/{alert,alert-dialog,dialog,field}.tsx',
      'src/pages/settings/ui/{sheet,sidebar,tooltip}.tsx',
      'src/shared/ui/select/select.tsx',
    ],
    rules: {
      'react/no-multi-comp': 'off',
    },
  },
  {
    ...react.configs.flat['jsx-runtime'],
    files: ['**/*.{jsx,tsx}'],
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: ['**/*.{jsx,tsx}'],
    rules: asErrors(reactHooks.configs.flat.recommended.rules),
  },
  {
    ...jsxA11y.flatConfigs.strict,
    files: ['**/*.{jsx,tsx}'],
    settings: {
      'jsx-a11y': {
        components: {
          Button: 'button',
        },
      },
    },
  },
  {
    ...vitest.configs.recommended,
    files: testFiles,
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-filename': 'error',
      'vitest/consistent-test-it': ['error', { fn: 'it' }],
      'vitest/consistent-vitest-vi': 'error',
      'vitest/expect-expect': 'error',
      'vitest/max-nested-describe': ['error', { max: 3 }],
      'vitest/no-conditional-expect': 'error',
      'vitest/no-conditional-tests': 'error',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-standalone-expect': 'error',
      'vitest/prefer-hooks-in-order': 'error',
      'vitest/prefer-hooks-on-top': 'error',
      'vitest/prefer-lowercase-title': 'error',
      'vitest/prefer-strict-equal': 'error',
      'vitest/prefer-to-be': 'error',
      'vitest/prefer-to-have-length': 'error',
      'vitest/require-top-level-describe': 'error',
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
              regex:
                '^(?:(?:@/|~/src/)(?:(?:pages|widgets|features|entities)/[^/]+/.+|shared/[^/]+/[^/]+/.+)|(?:\\.\\./)+(?:(?:pages|widgets|features|entities)/[^/]+/.+|shared/[^/]+/[^/]+/.+))$',
              message:
                'WXT entrypoints may import only public APIs from lower Feature-Sliced Design layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'src/{pages,widgets,features,entities}/**/*.{js,jsx,ts,tsx}',
      'src/shared/**/*.{js,jsx,ts,tsx}',
    ],
    rules: {
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: [
                './src/pages',
                './src/widgets',
                './src/features',
                './src/entities',
                './src/shared',
              ],
              from: './src/entrypoints',
              message: 'Feature-Sliced Design layers must not import WXT entrypoints.',
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
    files: ['vitest.config.ts', 'wxt.config.ts', 'src/entrypoints/*/index.{ts,tsx}'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ['src/pages/settings/ui/sidebar.tsx'],
    rules: {
      'max-lines': ['error', { max: 350, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ['src/shared/lib/cn/cn.ts'],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
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
