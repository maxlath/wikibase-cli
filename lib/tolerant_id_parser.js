// Accept anything looking like an id:
// Q33977
// or wd:Q33977
// or https://www.wikidata.org/entity/Q33977
// or https://inventaire.io/entity/wd:Q33977
// or even azfzafzaQ33977afz
module.exports = function (input) {
  if (input == null) return
  const match = input.match(/(Q|P)\d+/)
  return match && match[0]
}
