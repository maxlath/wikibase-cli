const { unparse: convertToCsv } = require('papaparse')
const { exitMessage } = require('./errors')

let headers
let oneValuePerRow
let firstBatch = true

const logCsv = ({ entities, propsAndSubProps, join }) => {
  let csv, formattedEntities
  if (join) oneValuePerRow = false
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
    if (values && values.length > 0) {
      return entity[prop][subprop].map(value => [ entity.id, value ])
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

const validatePropsAndInitCsvHeaders = propsAndSubProps => {
  headers = [ 'id' ]
  const props = Object.keys(propsAndSubProps)
  if (props.length === 0) {
    exitMessage('--props are required to output in csv format', example)
  }
  oneValuePerRow = props.length === 1
  for (const prop of props) {
    const subprops = Object.keys(propsAndSubProps[prop])
    if (subprops.length === 0) {
      exitMessage('all --props are required to have subprops to output in csv format', example)
    }
    for (const subprop of subprops) {
      headers.push(`${prop}.${subprop}`)
    }
  }
}

const example = 'Example: --props labels.fr,aliases.de,descriptions.ja,claims.P31,claims.P123,sitelinks.enwiki'

module.exports = { logCsv, validatePropsAndInitCsvHeaders }
