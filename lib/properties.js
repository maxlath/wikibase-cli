module.exports = {
  mainProps: {
    'https://www.wikidata.org': [ 'P31', 'P279' ]
  },
  propTypes: {
    ExternalId: { factor: 0.1, color: 'grey' },
    String: { factor: 1 },
    WikibaseItem: { factor: 1 },
    Time: { factor: 1 },
    Monolingualtext: { factor: 2 },
    Quantity: { factor: 1 },
    WikibaseProperty: { factor: 1 },
    Url: { factor: 0.5 },
    CommonsMedia: { factor: 0.5 },
    GlobeCoordinate: { factor: 0.5 },
    Math: { factor: 0.5 },
    GeoShape: { factor: 0.5 },
    TabularData: { factor: 0.5 },
    WikibaseLexeme: { factor: 0.5 },
    WikibaseForm: { factor: 0.5 },
    WikibaseSense: { factor: 0.5 },
    MusicalNotation: { factor: 0.5 }
  }
}
