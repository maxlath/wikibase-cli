// Args can't be just a line splitted on spaces
// as there are JSON strings arguments, and signle or double quoted strings args

module.exports = line => {
  // One JSON object as single argument
  // typically for (create|edit)-entity commands
  // ex: { "id": "Q1", "labels": { "en": "foo" } }
  if (line[0] === '{') return [ line ]

  // Several arguments as a valid JSON array
  // ex: [ "Q1" , "P2", '{"amount":123,"unit":"Q1947"}' ]'
  if (line[0] === '[') return JSON.parse(line)

  // Otherwise, arguments should be simple enough to be separated by a single space
  // ex: Q1 P2 123
  return line.split(' ')
}
