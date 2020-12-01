const makeSparqlQuery = require('./make_sparql_query')
const program = require('./program')
const { sparqlQuery } = require('../lib/wbk')(program)
const output = require('./output')(program)
const open = require('../lib/open')

module.exports = (sparql, format) => {
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

const openQueryServiceGUI = sparql => {
  const queryServiceGUI = sparqlQuery(sparql).replace('sparql?format=json&query=', '#')
  open(queryServiceGUI)
}
