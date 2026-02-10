#!/usr/bin/env node
import { map, partition, uniq, without } from 'lodash-es'
import { grey } from 'tiny-chalk'
import { isEntityId, isPropertyId } from 'wikibase-sdk'
import errors_ from '#lib/errors'
import { getEntitiesLabels } from '#lib/get_entities_labels'
import { makeSparqlQuery } from '#lib/make_sparql_query'
import program from '#lib/program'

await program
.process('graph-path')

const { args } = program
const [ subject, property, joinedObjects ] = args

if (!(subject && property && joinedObjects)) {
  program.helpAndExit(0)
}

const objects = joinedObjects.split(',')

if (!isEntityId(subject)) throw new Error(`invalid subject id: ${subject}`)
if (!isPropertyId(property)) throw new Error(`invalid property id: ${property}`)
objects.forEach(object => {
  if (!isEntityId(object)) throw new Error(`invalid object id: ${object}`)
})

const rows = await makeSparqlQuery(`SELECT DISTINCT ?intermediary ?next {
  VALUES (?object) { ${objects.map(object => `(wd:${object})`).join(' ')} }
  wd:${subject} wdt:${property}* ?intermediary .
  ?object ^wdt:${property}* ?intermediary .
  OPTIONAL {
    ?intermediary wdt:${property} ?next .
  }
}`)

if (rows.length === 0) {
  errors_.exitMessage('no path found')
}

const intermediaries = uniq(map(rows, 'intermediary'))
const relevantRows = rows.filter(row => intermediaries.includes(row.next))

let remainingRows = relevantRows
let nextSubjects = [ subject ]
let paths = [ subject ]
const replacedPaths = []

while (remainingRows.length > 0) {
  const newPaths = []
  const [ nextRows, rest ] = partition(remainingRows, ({ intermediary }) => {
    return nextSubjects.includes(intermediary)
  })
  if (rest.length === remainingRows.length) throw new Error('stuck')
  remainingRows = rest
  nextRows.forEach(({ intermediary, next }) => {
    const relevantPaths = paths.filter(path => {
      const pathParts = path.split('.')
      return pathParts.at(-1) === intermediary
    })
    const updatedPaths = relevantPaths.map(path => `${path}.${next}`)
    // Leave the relevantPaths in paths, to let other rows fork them if needed
    replacedPaths.push(...relevantPaths)
    newPaths.push(...updatedPaths)
  })
  nextSubjects = uniq(map(nextRows, 'next'))
  paths = [ ...without(paths, ...replacedPaths), ...newPaths ]
}

const allParts = uniq(paths.flatMap(path => path.split('.')))
const labels = await getEntitiesLabels(allParts, program.lang)

for (const path of paths) {
  console.log(path.split('.').map(part => `${labels[part]} ${grey(`(${part})`)}`).join(' → '))
}
