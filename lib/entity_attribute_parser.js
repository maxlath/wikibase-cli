import { isArray, map, values } from 'lodash-es'
import errors_ from '#lib/errors'
import pluralize from './pluralize.js'

export default (entity, attribute, lang, strictLang) => {
  if (entity.missing != null) return
  const pluarlizedAttribute = pluralize(attribute)
  const { id, type } = entity
  if (type && !attributesPerType[type].includes(pluarlizedAttribute)) {
    throw errors_.new('invalid attribute for entity type', { id, type, attribute })
  }
  const attrData = entity[pluarlizedAttribute]
  let valueObj
  if (strictLang != null) valueObj = attrData[strictLang]
  else valueObj = attrData[lang] || attrData.en || values(attrData)[0]
  if (isArray(valueObj)) {
    return map(valueObj, 'value').join(' | ')
  } else {
    return valueObj && valueObj.value
  }
}

const attributesPerType = {
  item: [ 'labels', 'descriptions', 'aliases' ],
  lexeme: [ 'lemmas' ],
  mediainfo: [ 'labels', 'descriptions' ],
  property: [ 'labels', 'descriptions', 'aliases' ],
}
