require('util').inspect.defaultOptions.depth = null
const getEntitiesByBatches = require('./get_entities_by_batches')

module.exports = (ids, lang = 'en') => new Promise((resolve, reject) => {
  const languages = lang === 'en' ? [ 'en' ] : [ lang, 'en' ]
  try {
    const allEntities = []
    const onResponse = entities => allEntities.push(...entities)
    const onDone = () => resolve(parseEntitiesLabels(allEntities, lang))
    getEntitiesByBatches({ ids, props: 'labels', languages, onResponse, onDone })
  } catch (err) {
    reject(err)
  }
})

const parseEntitiesLabels = (entities, lang) => {
  const entitiesLabels = {}
  entities.forEach(entity => {
    const { id, labels } = entity
    const label = parseLangLabel(labels, lang) || parseLangLabel(labels, 'en')
    entitiesLabels[id] = label
  })
  return entitiesLabels
}

const parseLangLabel = (labels, lang) => labels && labels[lang] && labels[lang].value
