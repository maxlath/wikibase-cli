const entityAttributeParser = require('../lib/entity_attribute_parser')
const { simplify } = require('wikibase-sdk')
const logClaims = require('../lib/log_claims')
const { bgGreen, bgBlue, grey } = require('chalk')
const _ = require('lodash')
const { mainProps } = require('../lib/properties')
const errors_ = require('../lib/errors')

module.exports = options => entities => {
  const entitiesList = _.values(entities)
  let firstLogged = false

  // Log entities sequentially as properties still need an async operation
  const parseNext = () => {
    const nextEntity = entitiesList.shift()
    if (!nextEntity) return

    if (firstLogged) {
      // Add a line between summaries
      console.log('')
    } else {
      firstLogged = true
    }

    console.log(grey('id'), nextEntity.id)

    return parseEntity(nextEntity, options).then(parseNext)
  }

  return parseNext()
}

const parseEntity = (entity, options) => {
  if (entity.missing != null) {
    console.log(grey('missing'))
    return Promise.resolve()
  }

  const { lang, program } = options

  const label = entityAttributeParser(entity, 'label', lang)
  console.log(bgGreen('Label'), label)

  const description = entityAttributeParser(entity, 'description', lang)
  if (description) console.log(bgBlue('Description'), description)

  var { claims } = entity
  var properties = (program.properties && program.properties.split(',')) || []
  if (properties.length === 0) {
    const instanceMainProps = mainProps[program.instance]
    if (instanceMainProps) properties = instanceMainProps
  }
  claims = program.verbose ? claims : _.pick(claims, properties)
  const simplifiedClaims = simplify.claims(claims)

  return logClaims({ program, simplifiedClaims, resort: false })
  .catch(errors_.exit)
}
