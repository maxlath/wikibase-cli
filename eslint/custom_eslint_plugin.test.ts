#!/usr/bin/env node

// Inspired by https://eslint.org/docs/latest/extend/custom-rule-tutorial

import { RuleTester } from 'eslint'
import { aliasedImportPathsExtensionsRule } from './rules/aliased_import_paths_extensions.js'
import { preferredImportsRule } from './rules/preferred_imports.js'

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 'latest' },
})

ruleTester.run('aliased-import-paths-extensions', aliasedImportPathsExtensionsRule, {
  valid: [
    {
      code: "import { foo } from '#bar/buzz'",
    },
    {
      // Accept .svelte.ts extensions to distinguish those files from Svelte components
      code: "import { foo } from '#bar/buzz.svelte.ts'",
    },
  ],
  invalid: [
    {
      code: "import { foo } from '#bar/buzz.js'",
      output: "import { foo } from '#bar/buzz'",
      errors: 1,
    },
    {
      code: "import { foo } from '#bar/buzz.ts'",
      output: "import { foo } from '#bar/buzz'",
      errors: 1,
    },
  ],
})

ruleTester.run('preferred-imports', preferredImportsRule, {
  valid: [
    { code: "import { foo } from 'lodash-es'" },
    { code: "import { foo } from 'notlodash'" },
    { code: "import { foo } from '#modules/redirect'" },
  ],
  invalid: [
    {
      code: "import { foo } from 'lodash'",
      output: "import { foo } from 'lodash-es'",
      errors: 1,
    },
    {
      code: "import { foo } from '#modules/user/main_user'",
      output: "import { foo } from '#user/main_user'",
      errors: 1,
    },
  ],
})

console.log('All custom ESLint rules tests passed!')
