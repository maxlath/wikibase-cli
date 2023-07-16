import { get, padEnd } from 'lodash-es'
import { inverse } from '#lib/chalk'
import { isPlainObject } from './types.js'

export function tabularize (collection) {
  // Assumes shape stability among collection members
  const columns = initializeColumnsMetadataFromRow(collection[0])
  const columnsNames = Object.keys(columns)
  addColumnValues(collection, columns, columnsNames)
  const headerLine = buildHeaderLine(columns, columnsNames)
  const lines = buildLines(columns, columnsNames)
  return inverse(headerLine) + '\n' + lines
}

const initializeColumnsMetadataFromRow = row => {
  const columns = {}
  Object.keys(row).forEach(key => {
    const value = row[key]
    if (isPlainObject(value)) {
      Object.keys(value).forEach(subkey => {
        const path = `${key}.${subkey}`
        columns[path] = { maxLength: path.length, values: [] }
      })
    } else {
      columns[key] = { maxLength: key.length, values: [] }
    }
  })
  return columns
}

const addColumnValues = (collection, columns, columnsNames) => {
  collection.forEach(row => {
    columnsNames.forEach(columnName => {
      const value = get(row, columnName)
      addMaxLength(columns, columnName, value)
      columns[columnName].values.push(value)
    })
  })
}

const addMaxLength = (columns, path, value) => {
  if (!value) return
  const valueLength = value.toString().length
  if (valueLength > columns[path].maxLength) columns[path].maxLength = valueLength
}

const buildHeaderLine = (columns, columnsNames) => {
  return columnsNames
  .map(columnNames => {
    const { maxLength } = columns[columnNames]
    return padEnd(columnNames, maxLength + 1)
  })
  .join(' ')
}

const buildLines = (columns, columnsNames) => {
  const firstColumn = columns[columnsNames[0]]
  return firstColumn.values
  .map((x, index) => {
    return columnsNames
    .map(columnNames => {
      const { maxLength } = columns[columnNames]
      const value = columns[columnNames].values[index] || ''
      return padEnd(value, maxLength + 1)
    })
    .join(' ')
  })
  .join('\n')
}
