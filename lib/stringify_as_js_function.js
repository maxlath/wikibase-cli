const { uniq } = require('lodash')
const getEntitiesLabels = require('./get_entities_labels')

const dropQuotes = text => {
  return text
  .split('\n')
  .map(line => {
    return line
    // Remove keys quotes when possible
    .replace(/^(\s+)"([a-zA-Z]\w+)":\s/, '$1$2: ')
    // Alternatively, replace them by single quotes
    .replace(/^(\s+)"([^"']+)":\s/, '$1\'$2\': ')
    // Remove values quotes when possible
    .replace(/:\s"([^"']+)"(,?)$/g, ': \'$1\'$2')
    // Even when the value is on its own line
    .replace(/^(\s+)"([^"']+)"(,?)$/g, '$1\'$2\'$3')
  })
  .join('\n')
}

const entityIdPattern = /(Q|P|L)[1-9]\d*/g

const collectEntitiesIds = json => {
  const ids = json.match(entityIdPattern)
  return uniq(ids)
}

const enrichLine = entitiesLabels => line => {
  const commentLine = getCommentLine(line, entitiesLabels)
  if (commentLine) return `${commentLine}\n${line}`
  else return line
}

const snakPropertyWithDirectEntityValuePattern = /^(\s+)(P[1-9]\d*): '((Q|P|L)[1-9]\d*)'/
const snakPropertyPattern = /^(\s+)(P[1-9]\d*): /
const entityRichValuePattern = /^(\s+)value: '((Q|P|L)[1-9]\d*)'/

const getCommentLine = (line, entitiesLabels) => {
  const snakPropertyWithDirectEntityValueMatch = line.match(snakPropertyWithDirectEntityValuePattern)
  if (snakPropertyWithDirectEntityValueMatch) {
    const indentation = snakPropertyWithDirectEntityValueMatch[1]
    const propertyId = snakPropertyWithDirectEntityValueMatch[2]
    const entityId = snakPropertyWithDirectEntityValueMatch[3]
    const propertyLabel = entitiesLabels[propertyId]
    const entityLabel = entitiesLabels[entityId]
    if (propertyLabel) return `${indentation}// ${propertyLabel}: ${entityLabel}`
  }

  const propertyIdMatch = line.match(snakPropertyPattern)
  if (propertyIdMatch) {
    const indentation = propertyIdMatch[1]
    const propertyId = propertyIdMatch[2]
    const propertyLabel = entitiesLabels[propertyId]
    if (propertyLabel) return `${indentation}// ${propertyLabel}`
  }

  const entityValueMatch = line.match(entityRichValuePattern)
  if (entityValueMatch) {
    const indentation = entityValueMatch[1]
    const entityId = entityValueMatch[2]
    const entityLabel = entitiesLabels[entityId]
    if (entityLabel) return `${indentation}// ${entityLabel}`
  }
}

module.exports = async (entity, lang) => {
  const json = JSON.stringify(entity, null, 2)
  let file = `module.exports = () => (${dropQuotes(json)})`
  const entitiesIds = collectEntitiesIds(json)
  const entitiesLabels = await getEntitiesLabels(entitiesIds, lang)
  return file.split('\n').map(enrichLine(entitiesLabels)).join('\n')
}
