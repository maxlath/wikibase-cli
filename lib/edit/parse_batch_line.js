// Args can't be just a line splitted on spaces
// as there are JSON strings arguments, and signle or double quoted strings args

import parse from 'shell-quote/parse.js'

export default line => {
  // One JSON object as single argument
  // typically for (create|edit)-entity commands
  // ex: { "id": "Q1", "labels": { "en": "foo" } }
  if (line[0] === '{') return [ line ]

  // Several arguments as a valid JSON array
  // ex: [ "Q1" , "P2", '{"amount":123,"unit":"Q1947"}' ]'
  if (line[0] === '[') return JSON.parse(line)

  // Otherwise, parse arguments as shell arguments
  // ex: Q1 P2 "ab cd"
  return parse(preserveDollarGuid(line))
}

const preserveDollarGuid = line => {
  return line
  // Dashed GUIDs should be a supported format and don't produce
  // the same dollar issues when parsing as shell arguments
  .replace(dollarGuidPattern, '$1-$2')
}

const dollarGuidPattern = /(\w{1}\d+)\$([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/ig
