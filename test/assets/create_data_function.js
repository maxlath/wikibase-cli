module.exports = (label, quantity, refUrl) => {
  const claim = { value: parseInt(quantity) }
  if (refUrl) claim.references = { P854: refUrl }
  return {
    labels: {
      en: label
    },
    claims: { P95228: claim }
  }
}

module.exports.args = [ '<label>', '<quantity>', '[reference url]' ]
module.exports.description = 'Create an item with a label and a P95228 statement'
module.exports.examples = [
  { args: [ 'foo', 123 ], comment: 'Create a new entity with P95228 set to 123' },
  { args: [ 'bar', 456, 'https://www.wikidata.org' ] }
]
