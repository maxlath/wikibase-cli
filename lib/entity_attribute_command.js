import { max, padEnd, values } from 'lodash-es'
import { grey, red } from '#lib/chalk'
import { debug } from '#lib/debug'
import entityAttributeParser from './entity_attribute_parser.js'
import { entityDataParser } from './entity_data_parser.js'
import pluralize from './pluralize.js'

export async function entityAttributeCommand (attribute, extraParams) {
  debug('entity_attribute_command', { attribute, extraParams })
  let commandName, ids
  if (extraParams) {
    ids = extraParams.ids
  } else {
    commandName = attribute
  }
  const pluarlizedAttribute = pluralize(attribute)
  const props = [ pluarlizedAttribute ]

  const parser = async ({ lang, strictLang, output, entities }) => {
    const entitiesList = values(entities)
    const multiEntities = entitiesList.length > 1
    const maxLength = max(entitiesList.map(entity => entity.id.length)) + 1
    entitiesList.forEach(logAttribute(attribute, lang, strictLang, multiEntities, maxLength, output))
  }

  await entityDataParser({ commandName, props, parser, ids })
}

const logAttribute = (attribute, lang, strictLang, multiEntities, maxLength, output) => entity => {
  let value
  try {
    value = entityAttributeParser(entity, attribute, lang, strictLang)
  } catch (err) {
    if (err.message === 'invalid attribute for entity type') {
      console.error(red(err.message), err.context)
      return
    } else {
      throw err
    }
  }
  // Prefix value with the id if there are multiple entities
  if (multiEntities) {
    console.log(grey(padEnd(entity.id, maxLength)), value || grey('not found'))
  } else {
    output(value)
  }
}
