// Copy this file as 'new_person.js' in your current directory
// then run it in cli with:
// wd create-entity new_person.js "John Doe" "James John Doe"

module.exports = function (name, alias) {
  return {
    labels: {
      en: name,
      es: name,
      fr: name,
      it: name,
      pt: name,
      sv: name,
      nl: name
    },
    aliases: {
      en: alias,
      nl: alias
    },
    claims: {
      P31: {
        // human
        value: 'Q5',
      },
    },
    summary: 'a previously missing totally notable person'
  }
}
