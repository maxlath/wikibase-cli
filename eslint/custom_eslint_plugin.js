import { aliasedImportPathsExtensionsRule } from './rules/aliased_import_paths_extensions.js'

export const customPlugin = {
  rules: {
    'aliased-import-paths-extensions': aliasedImportPathsExtensionsRule,
  },
}
