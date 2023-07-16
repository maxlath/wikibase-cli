import getEntities from './get_entities.js'

export async function getEntitiesLabels (ids, lang = 'en') {
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

export async function getEntityLabel (id, lang) {
  const labels = await getEntitiesLabels([ id ], lang)
  const label = labels[id]
  if (!label) throw new Error(`label not found: ${id}`)
  return label
}
