export const mainProps = {
  'https://www.wikidata.org': [ 'P31', 'P279', 'P569', 'P570', 'P571', 'P577', 'P580', 'P582' ],
}

export const propTypes = {
  commonsMedia: { factor: 0.5 },
  'entity-schema': { factor: 0.5 },
  'external-id': { factor: 0.1, color: 'grey' },
  'geo-shape': { factor: 0.5 },
  'globe-coordinate': { factor: 0.5 },
  math: { factor: 0.5 },
  monolingualtext: { factor: 2 },
  'musical-notation': { factor: 0.5 },
  quantity: { factor: 1 },
  string: { factor: 1 },
  'tabular-data': { factor: 0.5 },
  time: { factor: 1 },
  url: { factor: 0.5 },
  'wikibase-form': { factor: 0.5 },
  'wikibase-item': { factor: 1 },
  'wikibase-lexeme': { factor: 0.5 },
  'wikibase-property': { factor: 1 },
  'wikibase-sense': { factor: 0.5 },
}
