import { pick, values } from 'lodash-es'
import { simplify, getSitelinkUrl } from 'wikibase-sdk'
import { bgGreen, bgMagenta, bgBlue, grey, white } from '#lib/chalk'
import entityAttributeParser from '#lib/entity_attribute_parser'
import logClaims from '#lib/log_claims'
import { mainProps } from '#lib/properties'
import { get } from './request.js'

export async function summaryParser (params) {
  const { entities } = params
  const entitiesList = values(entities)
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

    return parseEntity(nextEntity, params).then(parseNext)
  }

  return parseNext()
}

const parseEntity = async (entity, params) => {
  if (entity.missing != null) {
    console.log(grey('missing'))
  }

  const { lang, program } = params
  const { type, datatype } = entity

  if (datatype) {
    console.log(bgMagenta(white('Datatype')), datatype)
  }

  if (type === 'item' || type === 'property') {
    const label = entityAttributeParser(entity, 'label', lang)
    console.log(bgGreen(white('Label')), label)
    const description = entityAttributeParser(entity, 'description', lang)
    if (description) console.log(bgBlue(white('Description')), description)
  } else if (type === 'lexeme') {
    const lemma = entityAttributeParser(entity, 'lemma', lang)
    console.log(bgGreen(white('Lemma')), lemma)
    entity.senses.forEach(sense => {
      const glosse = entityAttributeParser(sense, 'glosse', lang)
      console.log(bgBlue(white('Glosse')), glosse)
    })
  }

  let { claims, sitelinks } = entity
  let properties = (program.properties && program.properties.split(',')) || []
  if (properties.length === 0) {
    const instanceMainProps = mainProps[program.instance]
    if (instanceMainProps) properties = instanceMainProps
  }
  claims = program.verbose ? claims : pick(claims, properties)
  const simplifiedClaims = simplify.claims(claims)

  const extraData = {}
  if (type === 'lexeme') {
    extraData.lexicalCategory = entity.lexicalCategory
    extraData.language = entity.language
  }

  await logClaims({ program, simplifiedClaims, resort: false, extraData })
  await logWikipediaIntro({ sitelinks, lang })
}

async function logWikipediaIntro ({ sitelinks, lang }) {
  // Only certain entity types (i.e. items) have sitelinks
  if (sitelinks == null) return
  const wpSitelink = sitelinks[`${lang}wiki`]
  if (wpSitelink) {
    const intro = await getWikipediaIntro({ lang, title: wpSitelink.title })
    if (intro) {
      const url = getSitelinkUrl(wpSitelink)
      console.log(`${grey('Wikipedia intro')} ${intro} ${grey(url)}`)
    }
  }
}

async function getWikipediaIntro ({ lang, title }) {
  const query = new URLSearchParams({
    format: 'json',
    action: 'query',
    titles: title,
    prop: 'extracts',
    explaintext: 'true',
    exintro: 'true',
  })
  const url = `https://${lang}.wikipedia.org/w/api.php?${query.toString()}`
  const body = await get(url)
  if (body.query && body.query.pages) {
    return Object.values(body.query.pages)[0].extract
  }
}
