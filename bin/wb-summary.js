#!/usr/bin/env node
import { entityDataParser } from '#lib/entity_data_parser'
import { summaryParser } from '#lib/summary_parser'

const programOptions = [
  [ '-p, --properties <properties>', 'override default summary properties (separated by a comma)' ],
]

entityDataParser({ commandName: 'summary', parser: summaryParser, programOptions })
