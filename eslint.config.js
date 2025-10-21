import { globalIgnores } from '@eslint/config-helpers'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import importxPlugin from 'eslint-plugin-import-x'
import globals from 'globals'

// Inspect the generated config:
//    npx eslint --inspect-config
// Inspect the config applying to a specific file:
//    eslint --print-config file_to_check.js

export default defineConfig([
  js.configs.recommended,
  importxPlugin.flatConfigs.recommended,
  stylistic.configs.customize({
    braceStyle: '1tbs',
    jsx: false,
  }),
  {
    files: [ '**/*.js', '**/*.cjs' ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'array-callback-return': 'off',
      eqeqeq: [ 'error', 'smart' ],
      'implicit-arrow-linebreak': [ 'error', 'beside' ],

      // See https://github.com/un-ts/eslint-plugin-import-x#rules
      'import-x/newline-after-import': 'error',
      'import-x/no-named-as-default': 'off',
      'import-x/no-duplicates': 'error',
      'import-x/no-named-as-default-member': 'off',
      'import-x/order': [ 'error', {
        pathGroups: [ {
          pattern: '#*/**',
          group: 'internal',
          position: 'before',
        } ],
        groups: [ 'builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'type' ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
        },
      } ],

      indent: [ 'error', 2, {
        MemberExpression: 'off',
      } ],

      'no-ex-assign': [ 'off' ],
      'no-var': [ 'error' ],

      // Disable until eslint-plugin-node-import adds support for ESLint 9
      // or `eslint-plugin-import-x` implements `import/enforce-node-protocol-usage`
      // 'node-import/prefer-node-protocol': 2,

      'nonblock-statement-body-position': [ 'error', 'beside' ],
      'object-shorthand': [ 'error', 'properties' ],
      'one-var': [ 'off' ],
      'prefer-arrow-callback': [ 'error' ],
      'prefer-const': [ 'off' ],

      // See https://eslint.style/rules
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
      '@stylistic/arrow-parens': [ 'error', 'as-needed' ],
      '@stylistic/brace-style': 'error',
      '@stylistic/comma-dangle': [ 'error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      } ],
      '@stylistic/indent': [ 'error', 2, { MemberExpression: 'off' } ],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/operator-linebreak': [ 'error', 'after', { overrides: { '?': 'before', ':': 'before' } } ],
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/member-delimiter-style': [ 'error', {
        multiline: {
          delimiter: 'none',
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      } ],
      '@stylistic/object-curly-spacing': [ 'error', 'always' ],
      '@stylistic/quote-props': [ 'error', 'as-needed' ],
      '@stylistic/quotes': [ 'error', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' } ],
      '@stylistic/space-before-function-paren': [ 'error', { anonymous: 'always', asyncArrow: 'always', named: 'always' } ],
      '@stylistic/space-infix-ops': 'error',
    },
  },
  {
    files: [ './tests/**/*.js' ],
    languageOptions: {
      globals: {
        it: 'readonly',
        xit: 'readonly',
        describe: 'readonly',
        xdescribe: 'readonly',
        beforeEach: 'readonly',
        before: 'readonly',
      },
    },
  },
  globalIgnores([
    '**/node_modules',
    'docs/examples',
  ]),
])
