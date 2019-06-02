const minimizeSnaks = snaks => {
  if (!snaks) return
  // Support references nested snaks
  if (snaks.snaks) snaks = snaks.snaks
  Object.keys(snaks).forEach(property => {
    const propSnaks = snaks[property]
    // Known case: when the property was explicitly requested and thus set to null
    // see ./drop_non_selected_subprops.js
    if (!propSnaks) return
    snaks[property] = propSnaks.map(snak => {
      if (snak.snaktype === 'value') delete snak.snaktype
      if (snak.qualifiers) {
        minimizeSnaks(snak.qualifiers)
        if (Object.keys(snak.qualifiers).length === 0) delete snak.qualifiers
      }
      if (snak.references) {
        snak.references.forEach(minimizeSnaks)
        if (snak.references.length === 0) delete snak.references
      }
      const keys = Object.keys(snak)
      if (keys.length === 1 && keys[0] === 'value') return snak.value
      else return snak
    })
    if (snaks[property].length === 1) snaks[property] = snaks[property][0]
  })
}

module.exports = minimizeSnaks
