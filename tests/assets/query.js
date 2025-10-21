export default authorId => {
  return `SELECT ?subject WHERE { ?subject wdt:P50 wd:${authorId} . }`
}

export function someOtherQuery (authorId) {
  return `SELECT ?subject WHERE { ?subject wdt:P110 wd:${authorId} . }`
}
