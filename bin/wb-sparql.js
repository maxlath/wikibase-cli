#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { commandWithTemplateCustomHelp } from '#lib/command_with_template_custom_help'
import errors_ from '#lib/errors'
import { executeFunction } from '#lib/execute_function'
import program from '#lib/program'
import { sparqlQueryCommand } from '#lib/sparql_query_command'
import { getAbsoluteFileUrl } from '#lib/utils'
import wellknownQueries from '#lib/wellknown_queries'

program.customHelpOption = commandWithTemplateCustomHelp

await program
.option('-r, --raw', 'get raw, non-simplified JSON results')
.option('-d, --dry', 'output the SPARQL without running the query')
.option('-o, --open', 'open the query in the Query Service GUI')
.option('-f, --format <format>', "set output format: json, xml, tsv, csv, binrdf, table. Default: 'table' when 1 value is selected, 'json' otherwise")
.option('-x, --index <variable>', "return the result as an index, instead of a list, using the passed variable as key (can't be used with the 'raw' option)")
.option('--log-response-headers [comma-separated headers names]', 'request to output all or some HTTP header fields from the server response on stderr')
.process('sparql')

const input = program.args[0]

const sparqlStartKeywordPattern = /(SELECT|DESCRIBE|CONSTRUCT|ASK)/i

const main = async () => {
  let sparql, absoluePath
  if (typeof input === 'string' && input.match(sparqlStartKeywordPattern) && input.match(/\{.*\}/m)) {
    sparql = input
  } else {
    const path = input
    const extension = path.split('.').slice(-1)[0]

    // Allow to pass a JS module that exports a function
    // to which is passed the remaining arguments
    // and from which the SPARQL request is generated
    if (extension.endsWith('js')) {
      absoluePath = getAbsoluteFileUrl(path)
      // or pass the name of one of the wellknown queries
    } else if (wellknownQueries.list.includes(path)) {
      absoluePath = wellknownQueries.getAbsolutePath(path)
    }

    if (absoluePath != null) {
      const fnArgs = program.args.slice(1)
      sparql = await executeFunction(absoluePath, fnArgs)
    } else {
      sparql = readFileSync(path, { encoding: 'utf-8' })
    }
  }

  if (!sparql.replace('\n', ' ').match(sparqlStartKeywordPattern)) {
    errors_.bundle("this doesn't look like SPARQL", { sparql })
  }

  const { index, format } = program

  if (index) {
    const variableMatch = ` ?${index} `
    const selectSection = sparql.split('{')[0]
    // If the variable can't be found in the SPARQL SELECT section
    // we won't be able to index the results using it
    if (!selectSection.match(variableMatch)) {
      errors_.bundle("the index variable can't be found in the SPARQL request", { sparql, index })
    }
  }

  sparqlQueryCommand(sparql, format)
}

if (program.showHelp) {
  await program.customHelpOption()
} else {
  await main().catch(console.error)
}
