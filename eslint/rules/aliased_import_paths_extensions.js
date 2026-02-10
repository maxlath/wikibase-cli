// @ts-check
// Documentation https://eslint.org/docs/latest/extend/custom-rules
// Tutorial https://eslint.org/docs/latest/extend/custom-rule-tutorial

/*
 * @type {import('@eslint/core').RuleDefinition}
 */
export const aliasedImportPathsExtensionsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce consistent aliased import paths extensions',
    },
    fixable: 'code',
    schema: [],
  },
  create (context) {
    return {
      // On AST selectors, see https://eslint.org/docs/latest/extend/selectors
      'ImportDeclaration > Literal' (node) {
        const { raw, value } = node
        if (value.startsWith('#') && (value.endsWith('.js') || value.endsWith('.ts')) && !value.endsWith('.svelte.ts')) {
          context.report({
            node,
            message: 'Imports using path aliases should not include .ts or .js extensions (except for *.svelte.ts)',
            // See https://eslint.org/docs/latest/extend/custom-rules#applying-fixes
            fix (fixer) {
              const fixedValue = raw.replace(/\.(js|ts)(['"])$/, '$2')
              return fixer.replaceText(node, fixedValue)
            },
          })
        }
      },
    }
  },
}
