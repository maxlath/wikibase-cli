export default async authorId => {
  return `SELECT ?subject WHERE { ?subject wdt:P50 wd:${authorId} . }`
}
