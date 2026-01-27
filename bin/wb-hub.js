#!/usr/bin/env node
import errors_ from '#lib/errors'
import { openUrl } from '#lib/open'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { get } from '#lib/request'

await program
.option('-o, --open', 'Open the found URL in a web browser')
.option('-u, --url', 'Simply generate the url')
.process('hub')

const { args, lang, json, open, url: urlOnly } = program
if (args.length === 0) program.helpAndExit(0)

let argsString = args.join(' ')

if (lang && !(/l(ang)?=/.test(argsString))) argsString += ` lang=${lang}`

// Default to Wikidata instead of Wikipedia
if (!(/s(ite)?=/.test(argsString))) argsString += ' site=wikidata'

if (!(open || urlOnly)) argsString += ' format=json'

const query = encodeURIComponent(argsString)
const url = `https://hub.toolforge.org/query?q=${query}`

if (open || urlOnly) {
  openUrl(url)
} else {
  const output = outputFactory(program)
  get(url)
  .then(body => {
    if (json) return output(body)
    const { url: destinationUrl } = body.destination
    if (destinationUrl) return output(destinationUrl)
  })
  .catch(errors_.exit)
}
