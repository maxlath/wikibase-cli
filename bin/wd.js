#!/usr/bin/env node
process.env.WB_INSTANCE = 'https://www.wikidata.org'
process.env.WB_SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql'
// Fake the executed script to be wb to trick commander to believe it
// as it would otherwise fail to build subcommand paths
process.argv[1] = process.argv[1].replace(/wd\.js$/, 'wb.js')

await import('./wb.js')
