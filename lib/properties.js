module.exports = {
  mainProps: {
    'https://www.wikidata.org': [ 'P31', 'P279' ]
  },
  propTypes: {
    'external-id': { factor: 0.1, color: 'grey' },
    'string': { factor: 1 },
    'wikibase-item': { factor: 1 },
    'time': { factor: 1 },
    'monolingualtext': { factor: 2 },
    'quantity': { factor: 1 },
    'wikibase-property': { factor: 1 },
    'url': { factor: 0.5 },
    'commonsMedia': { factor: 0.5 },
    'globe-coordinate': { factor: 0.5 },
    'math': { factor: 0.5 },
    'geo-shape': { factor: 0.5 },
    'tabular-data': { factor: 0.5 },
    'wikibase-lexeme': { factor: 0.5 },
    'wikibase-form': { factor: 0.5 },
    'wikibase-sense': { factor: 0.5 },
    'musical-notation': { factor: 0.5 }
  }
}
