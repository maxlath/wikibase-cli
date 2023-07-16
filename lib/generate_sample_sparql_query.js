export function generateSampleSparqlQuery (limit = 1000) {
  return `SELECT * {
  ?s ?p ?o .
}
LIMIT ${limit}`
}
