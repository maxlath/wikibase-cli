import { pick } from 'lodash-es'
import { getStatementsKey } from 'wikibase-edit/lib/parse_instance.js'
import { simplifyEntity } from 'wikibase-sdk'
import { minimizeClaimsOrSnaks } from './minimize_claims.js'
import pickSelectedSubprops from './pick_selected_subprops.js'
import program from './program.js'
import stringifyAsJsFunction from './stringify_as_js_function.js'

export function outputTemplatesFactory ({ batchMode, format, propsToPick, requestedPropsAndSubProps, minimize }) {
  const formatEntity = FormatEntity(batchMode, propsToPick, requestedPropsAndSubProps, minimize)
  return async function outputTemplates (entities) {
    entities = entities.map(formatEntity)
    if (format.endsWith('js')) {
      const jsFile = await stringifyAsJsFunction(entities[0], program.lang, format)
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
  const statementsKey = getStatementsKey(program.instance)

  return function formatEntity (entity) {
    if (statementsKey !== 'claims') {
      if (propsToPick.includes('claims')) {
        propsToPick[propsToPick.indexOf('claims')] = statementsKey
      }
    }
    // Always include type, for the needs of simplifyEntity
    entity = pick(entity, propsToPick.concat([ 'type' ]))
    entity = simplifyEntity(entity, simplifyOptions)
    if (createMode) delete entity.id
    entity = pickSelectedSubprops(entity, requestedPropsAndSubProps)
    if (!batchMode && minimize !== false) {
      minimizeClaimsOrSnaks(entity[statementsKey])
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
