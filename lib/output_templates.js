const program = require('./program')
const dropNonSelectedSubprops = require('./drop_non_selected_subprops')
const minimizeClaims = require('./minimize_claims')
const stringifyAsJsFunction = require('./stringify_as_js_function')
const { pick } = require('lodash')
const { simplify } = require('./wbk')(program)
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
  keepHashes: false
}

module.exports = ({ batchMode, format, propsToPick, requestedPropsAndSubProps, minimize }) => {
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

const FormatEntity = (batchMode, propsToPick, requestedPropsAndSubProps, minimize) => entity => {
  entity = simplify.entity(entity, simplifyOptions)
  if (createMode) delete entity.id
  entity = pick(entity, propsToPick)
  dropNonSelectedSubprops(entity, requestedPropsAndSubProps)
  if (!batchMode && minimize !== false) {
    minimizeClaims(entity.claims)
    minimizeSitelinks(entity.sitelinks)
  }
  return entity
}

const minimizeSitelinks = sitelinks => {
  if (!sitelinks) return
  for (const [ site, siteObj ] of Object.entries(sitelinks)) {
    if (siteObj.badges.length === 0) {
      sitelinks[site] = siteObj.title
    }
  }
}
