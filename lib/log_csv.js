const { unparse: convertToCsv } = require('papaparse')
const { exitMessage } = require('./errors')

let headers
let oneValuePerRow
let firstBatch = true

const logCsv = ({ entities, propsAndSubProps }) => {
  let csv, formattedEntities
  if (oneValuePerRow) {
    formattedEntities = flatten(entities.map(format(propsAndSubProps)))
  } else {
    formattedEntities = entities.map(format(propsAndSubProps))
  }
  if (firstBatch) {
    csv = convertToCsv({ fields: headers, data: formattedEntities })
    firstBatch = false
  } else {
    csv = convertToCsv(formattedEntities)
  }
  process.stdout.write(csv + '\n')
}

const format = propsAndSubProps => entity => {
  if (oneValuePerRow) {
    const prop = Object.keys(propsAndSubProps)[0]
    const subprop = Object.keys(propsAndSubProps[prop])[0]
    const values = entity[prop] && entity[prop][subprop]
    if (values != null && !(values instanceof Array)) {
      return [ [ entity.id, values ] ]
    } else if (values != null && values.length > 0) {
      return values.map(value => [ entity.id, value ])
    } else {
      return [ [ entity.id, undefined ] ]
    }
  } else {
    const result = [ entity.id ]
    for (const prop in propsAndSubProps) {
      for (const subprop in propsAndSubProps[prop]) {
        let value
        if (entity[prop] && entity[prop][subprop]) {
          value = entity[prop][subprop]
        }
        result.push(value)
      }
    }
    return result
  }
}

const flatten = array => [].concat(...array)

const validatePropsAndInitCsvHeaders = (propsAndSubProps, join) => {
  headers = [ 'id' ]
  const props = Object.keys(propsAndSubProps)
  if (props.length === 0) {
    exitMessage('--props are required to output in csv format', example)
  }
  // oneValuePerRow = props.length === 1 && !join
  let subpropsCount = 0
  for (const prop of props) {
    const subprops = Object.keys(propsAndSubProps[prop])
    if (subprops.length === 0) {
      exitMessage('all --props are required to have subprops to output in csv format', example)
    }
    for (const subprop of subprops) {
      subpropsCount++
      headers.push(`${prop}.${subprop}`)
    }
  }
  oneValuePerRow = subpropsCount === 1 && !join
  if (subpropsCount > 1 && join) {
    exitMessage('--join is only possible when there is only one value for --props')
  }
}

const example = 'Example: --props labels.fr,aliases.de,descriptions.ja,claims.P31,claims.P123,sitelinks.enwiki'

module.exports = { logCsv, validatePropsAndInitCsvHeaders }
