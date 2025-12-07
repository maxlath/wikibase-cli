import { openUrl } from '#lib/open'
import { getWbk } from '#lib/wbk'
import { makeSparqlQuery } from './make_sparql_query.js'
import { outputFactory } from './output.js'
import program from './program.js'

export function sparqlQueryCommand (sparql, format) {
  const output = outputFactory(program)
  if (program.open) {
    openQueryServiceGUI(sparql)
  } else if (program.dry) {
    output(sparql.trim())
  } else {
    // Override config parameter, as it's unlikely to be the desired behavior
    program.clipboard = false
    makeSparqlQuery(sparql, format).then(output)
  }
}

function openQueryServiceGUI (sparql) {
  const { sparqlQuery } = getWbk(program)
  const queryServiceGUI = sparqlQuery(sparql).replace('sparql?format=json&query=', '#')
  openUrl(queryServiceGUI)
}
