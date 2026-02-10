#!/usr/bin/env node
import { map, partition, uniq } from 'lodash-es'
import { isEntityId, isPropertyId } from 'wikibase-sdk'
import errors_ from '#lib/errors'
import { getEntitiesLabels } from '#lib/get_entities_labels'
import { makeSparqlQuery } from '#lib/make_sparql_query'
import program from '#lib/program'

await program
.process('graph-path')

const { args } = program
const [ subject, property, object ] = args

if (!(subject && property && object)) {
  program.helpAndExit(0)
}

if (!isEntityId(subject)) throw new Error(`invalid subject id: ${subject}`)
if (!isPropertyId(property)) throw new Error(`invalid property id: ${property}`)
if (!isEntityId(object)) throw new Error(`invalid object id: ${object}`)

const rows = await makeSparqlQuery(`SELECT ?intermediary ?next {
  wd:${subject} wdt:${property}* ?intermediary .
  wd:${object} ^wdt:${property}* ?intermediary .
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
    newPaths.push(...updatedPaths)
  })
  nextSubjects = uniq(map(nextRows, 'next'))
  paths = newPaths
}

const allParts = uniq(paths.flatMap(path => path.split('.')))
const labels = await getEntitiesLabels(allParts, program.lang)

for (const path of paths) {
  console.log(path.split('.').map(part => `${labels[part]} (${part})`).join(' → '))
}
