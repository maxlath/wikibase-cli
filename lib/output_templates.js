import { pick } from 'lodash-es'
import { simplifyEntity } from 'wikibase-sdk'
import dropNonSelectedSubprops from './drop_non_selected_subprops.js'
import minimizeClaims from './minimize_claims.js'
import program from './program.js'
import stringifyAsJsFunction from './stringify_as_js_function.js'

export default ({ batchMode, format, propsToPick, requestedPropsAndSubProps, minimize }) => {
  const formatEntity = FormatEntity(batchMode, propsToPick, requestedPropsAndSubProps, minimize)
  return async entities => {
    entities = entities.map(formatEntity)
    if (format === 'js') {
      const jsFile = await stringifyAsJsFunction(entities[0], program.lang)
      console.log(jsFile)
    } else {
      const newLines = entities.map(entity => JSON.stringify(entity)).join('\n')
      process.stdout.write(newLines + '\n')
    }
  }
}

function FormatEntity (batchMode, propsToPick, requestedPropsAndSubProps, minimize) {
  const { createMode = false } = program
  const simplifyOptions = {
    keepIds: !createMode,
    keepQualifiers: true,
    keepReferences: true,
    keepRichValues: true,
    keepNonTruthy: true,
    keepSnaktypes: true,
    keepRanks: true,
    keepBadges: true,
    // No need to keep the hashes as every edited claim (identified with a GUID)
    // will have it's qualifiers and references fully overriden
    keepHashes: false,
  }

  return function formatEntity (entity) {
    entity = simplifyEntity(entity, simplifyOptions)
    if (createMode) delete entity.id
    entity = pick(entity, propsToPick)
    dropNonSelectedSubprops(entity, requestedPropsAndSubProps)
    if (!batchMode && minimize !== false) {
      minimizeClaims(entity.claims)
      minimizeSitelinks(entity.sitelinks)
    }
    return entity
  }
}

const minimizeSitelinks = sitelinks => {
  if (!sitelinks) return
  for (const [ site, siteObj ] of Object.entries(sitelinks)) {
    if (siteObj.badges.length === 0) {
      sitelinks[site] = siteObj.title
    }
  }
}
