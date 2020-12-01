module.exports = (id, quantity, refUrl) => {
  const claim = { value: parseInt(quantity) }
  if (refUrl) claim.references = { P854: refUrl }
  return {
    id,
    claims: { P95228: claim }
  }
}

module.exports.args = [ '<id>', '<quantity>', '[reference url]' ]
module.exports.description = 'Add a P95228 statement'
module.exports.examples = [
  { args: [ 'Q1', 123 ], comment: 'set Q1#P95228 to 123' },
  { args: [ 'Q2', 456, 'https://www.wikidata.org' ] }
]
