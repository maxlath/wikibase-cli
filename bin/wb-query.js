#!/usr/bin/env node
import { grey } from 'tiny-chalk'
import errors_ from '#lib/errors'
import { generateDescribeSparqlQuery } from '#lib/generate_describe_sparql_query'
import { generateSampleSparqlQuery } from '#lib/generate_sample_sparql_query'
import { generateSelectSparqlQuery } from '#lib/generate_select_sparql_query'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { sparqlQueryCommand } from '#lib/sparql_query_command'

// All arguments are passed as options values making program.args.length === 0 likely
program.canHaveZeroArguments = true

await program
.option('-s, --subject <subject>', 'Set a subject')
.option('-p, --property <property>', 'Set a property')
.option('-o, --object <object>', 'Set an object')
.option('-ps, --statement-property <property>', 'Set a statement property, as in PREFIX ps: <http://www.wikidata.org/prop/statement/>')
.option('-qp, --qualifier-property <property>', 'Set a qualifier property')
.option('-qo, --qualifier-object <object>', 'Set a qualifier value')
.option('--describe <node>', 'Make a DESCRIBE request')
.option('--sample', 'Select a sample of triples')
.option('-a, --labels', 'Requests results labels')
.option('-c, --count', 'Return a count of matching results')
.option('-r, --raw', 'Raw SPARQL results')
.option('-d, --dry', 'Output the SPARQL without running the query')
// /!\ -o would conflict with --object
.option('--open', 'Open the query in the Query Service GUI')
.option('-f, --format <format>', "Set output format: json, xml, tsv, csv, binrdf, table. Default: 'table' when 1 value is selected, 'json' otherwise")
.option('-n, --limit <num>', 'Set the request results limit')
.option('-x, --index <variable>', "Return the result as an index, instead of a list, using the passed variable as key (can't be used with the 'raw' option)")
.process('query')

if (program.args.length > 0) {
  errors_.exitMessage('wb query can not have positional arguments', `found positional arguments: ${program.args}`)
}

if (!(program.subject || program.property || program.object || program.describe || program.sample || program.statementProperty)) {
  program.helpAndExit(0)
}
const output = outputFactory(program)

const { describe, format, limit, sample } = program

let sparql

if (describe) sparql = generateDescribeSparqlQuery(describe)
else if (sample) sparql = generateSampleSparqlQuery(limit)
else sparql = generateSelectSparqlQuery(program)

output(`${grey('Generated SPARQL:')} ${sparql}`, true, true)

sparqlQueryCommand(sparql, format)
