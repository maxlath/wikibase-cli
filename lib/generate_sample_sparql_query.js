export function generateSampleSparqlQuery (limit = 10) {
  return `SELECT * {
  ?s ?p ?o .
}
LIMIT ${limit}`
}
