const { uniq } = require('lodash')
const { getEntitiesLabels } = require('./get_entities_labels')

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
const directEntityValuePerLinePattern = /^(\s+)'((Q|P|L)[1-9]\d*)',?$/

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

  let commentLine

  commentLine = getPatternComment(line, snakPropertyPattern, entitiesLabels)
  if (commentLine) return commentLine

  commentLine = getPatternComment(line, entityRichValuePattern, entitiesLabels)
  if (commentLine) return commentLine

  commentLine = getPatternComment(line, directEntityValuePerLinePattern, entitiesLabels)
  if (commentLine) return commentLine
}

const getPatternComment = (line, pattern, entitiesLabels) => {
  const match = line.match(pattern)
  if (match) {
    const indentation = match[1]
    const id = match[2]
    const label = entitiesLabels[id]
    if (label) return `${indentation}// ${label}`
  }
}

module.exports = async (entity, lang) => {
  const json = JSON.stringify(entity, null, 2)
  const file = `module.exports = () => (${dropQuotes(json)})`
  const entitiesIds = collectEntitiesIds(json)
  const entitiesLabels = await getEntitiesLabels(entitiesIds, lang)
  return file.split('\n').map(enrichLine(entitiesLabels)).join('\n')
}
