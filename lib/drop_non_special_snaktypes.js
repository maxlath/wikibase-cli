const dropNonSpecialSnaktypes = snaks => {
  if (!snaks) return
  // Support references nested snaks
  if (snaks.snaks) snaks = snaks.snaks
  Object.keys(snaks).forEach(property => {
    const propSnaks = snaks[property]
    propSnaks.forEach(snak => {
      if (snak.snaktype === 'value') delete snak.snaktype
      dropNonSpecialSnaktypes(snak.qualifiers)
      if (snak.references) snak.references.forEach(dropNonSpecialSnaktypes)
    })
  })
}

module.exports = dropNonSpecialSnaktypes
