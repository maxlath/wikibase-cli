const getEntities = require('./get_entities')

const getEntitiesLabels = async (ids, lang = 'en') => {
  const entities = await getEntities({ ids, languages: lang, props: 'labels' })
  return parseEntitiesLabels(entities, lang)
}

const parseEntitiesLabels = (entities, lang) => {
  const entitiesLabels = {}
  Object.values(entities).forEach(entity => {
    const { id, labels } = entity
    const label = parseLangLabel(labels, lang) || parseLangLabel(labels, 'en')
    entitiesLabels[id] = label
  })
  return entitiesLabels
}

const parseLangLabel = (labels, lang) => labels && labels[lang] && labels[lang].value

const getEntityLabel = async (id, lang) => {
  const labels = await getEntitiesLabels([ id ], lang)
  const label = labels[id]
  if (!label) throw new Error(`label not found: ${id}`)
  return label
}

module.exports = { getEntitiesLabels, getEntityLabel }
