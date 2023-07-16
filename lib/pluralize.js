// Attributes that can't be pluralized with `${attribute}s`
// or are already pluralized
const plurals = {
  aliases: 'aliases',
}

export default attribute => plurals[attribute] || `${attribute}s`
