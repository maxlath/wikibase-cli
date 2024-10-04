#!/usr/bin/env node
import { grey } from '#lib/chalk'
import { generateDescribeSparqlQuery } from '#lib/generate_describe_sparql_query'
import { generateSampleSparqlQuery } from '#lib/generate_sample_sparql_query'
import { generateSelectSparqlQuery } from '#lib/generate_select_sparql_query'
import { outputFactory } from '#lib/output'
import program from '#lib/program'
import { sparqlQueryCommand } from '#lib/sparql_query_command'

// All arguments are passed as options values making program.args.length === 0 likely
program.canHaveZeroArguments = true

await program
.option('-s, --subject <subject>', 'set a subject')
.option('-p, --property <property>', 'set a property')
.option('-o, --object <object>', 'set an object')
.option('-qp, --qualifier-property <property>', 'set a qualifier property')
.option('-qo, --qualifier-object <object>', 'set a qualifier value')
.option('--describe <node>', 'make a DESCRIBE request')
.option('--sample', 'select a sample of triples')
.option('-a, --labels', 'requests results labels')
.option('-c, --count', 'return a count of matching results')
.option('-r, --raw', 'raw SPARQL results')
.option('-d, --dry', 'output the SPARQL without running the query')
// /!\ -o would conflict with --object
.option('--open', 'open the query in the Query Service GUI')
.option('-f, --format <format>', "set output format: json, xml, tsv, csv, binrdf, table. Default: 'table' when 1 value is selected, 'json' otherwise")
.option('-n, --limit <num>', 'set the request results limit')
.option('-x, --index <variable>', "return the result as an index, instead of a list, using the passed variable as key (can't be used with the 'raw' option)")
.option('--log-response-headers [comma-separated headers names]', 'request to output all or some HTTP header fields from the server response on stderr')
.process('query')

if (!(program.subject || program.property || program.object || program.describe || program.sample)) {
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
