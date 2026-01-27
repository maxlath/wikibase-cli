#!/usr/bin/env node
import { isMediaInfoId, isPropertyId } from 'wikibase-sdk'
import errors_ from '#lib/errors'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import { getSitelinkUrlFactory } from '#lib/get_sitelink_url'
import { getMediaInfoEntityTitle } from '#lib/mediainfo'
import { openUrl } from '#lib/open'
import program from '#lib/program'
import { guidPattern, tolerantIdParserFactory } from '#lib/tolerant_id_parser'

await program
.option('-p, --wikipedia', 'Open the Wikipedia article')
.option('-y, --history', 'Open the Wikidata history')
.option('-t, --talk', 'Open the Talk page')
.option('-u, --url', 'Simply generate the url')
.option('-r, --revision <id>', 'Open a specific revision')
.process('open')

const getSitelinkUrl = getSitelinkUrlFactory(program)
const parseId = tolerantIdParserFactory({
  allowStatementsIds: true,
  allowEntitiesSchemasIds: true,
  allowNestedIds: true,
})

const { instance, args, lang } = program
exitOnMissingInstance(instance)

let ids
try {
  ids = args.map(parseId).filter(id => id != null)
// eslint-disable-next-line no-unused-vars
} catch (err) {
  // invalid ids: trigger a search
}

if (!ids || ids.length === 0) {
  const search = encodeURIComponent(args.join(' '))
  if (program.wikipedia) {
    openUrl(`https://${lang}.wikipedia.org/w/index.php?title=Special:Search&search=${search}`)
  } else {
    openUrl(`${instance}/w/index.php?title=Special:Search&search=${search}`)
  }
} else {
  const openId = async id => {
    if (program.wikipedia) {
      try {
        const url = await getSitelinkUrl(id, lang, 'wiki')
        openUrl(url)
      } catch (err) {
        if (err.statusCode === 404) {
          console.error('Wikipedia article not found: opening Wikidata page on sitelinks')
          openUrl(`${instance}/wiki/${id}#sitelinks-wikipedia`)
        } else {
          throw err
        }
      }
    } else if (program.history) {
      if (isPropertyId(id)) {
        openUrl(`${instance}/w/index.php?title=Property:${id}&action=history`)
      } else if (isMediaInfoId(id)) {
        const title = await getMediaInfoEntityTitle(id)
        openUrl(`${instance}/w/index.php?title=${title}&action=history`)
      } else {
        // Will be redirected to title=${id} if Item is the main namespace
        openUrl(`${instance}/w/index.php?title=Item:${id}&action=history`)
      }
    } else if (program.talk) {
      if (isPropertyId(id)) {
        openUrl(`${instance}/wiki/Property_talk:${id}`)
      } else {
        openUrl(`${instance}/wiki/Item_talk:${id}`)
      }
    } else if (program.revision) {
      openUrl(`${instance}/w/index.php?title=${id}&oldid=${program.revision}`)
    } else if (guidPattern.test(id)) {
      const urlStatementId = id.replace('$', '-')
      openUrl(`${instance}/entity/statement/${urlStatementId}`)
    } else {
      openUrl(`${instance}/entity/${id}`)
    }
  }

  Promise.all(ids.map(openId))
  .catch(errors_.exit)
}
