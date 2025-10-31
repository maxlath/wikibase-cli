export function minimizeClaimsOrSnaks (snaks) {
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
      if (snak.rank === 'normal') delete snak.rank
      if (snak.value) minimizeRichSnakValue(snak)
      if (snak.qualifiers) {
        minimizeClaimsOrSnaks(snak.qualifiers)
        if (Object.keys(snak.qualifiers).length === 0) delete snak.qualifiers
      }
      if (snak.references) {
        snak.references.forEach(minimizeClaimsOrSnaks)
        if (snak.references.length === 0) delete snak.references
      }
      const keys = Object.keys(snak)
      if (keys.length === 1 && keys[0] === 'value') return snak.value
      else return snak
    })
    if (snaks[property].length === 1) snaks[property] = snaks[property][0]
  })
}

function minimizeRichSnakValue (snak) {
  const { value } = snak
  if (typeof value !== 'object') return
  if ('time' in value) {
    minimizeRichTimeValue(snak, value)
  } else if ('amount' in value) {
    minimizeRichQuantityValue(snak, value)
  }
}

function minimizeRichTimeValue (snak, value) {
  const { precision } = value
  if (value.timezone === 0) delete value.timezone
  if (value.before === 0) delete value.before
  if (value.after === 0) delete value.after
  if (precision >= 9 && precision <= 11) delete value.precision
  if (value.calendarmodel === 'http://www.wikidata.org/entity/Q1985727') delete value.calendarmodel
  const remainingKeys = Object.keys(value)
  if (remainingKeys.length === 1 && remainingKeys[0] === 'time') {
    const { time } = value
    const [ year, month, day ] = time.split('T')[0].split('-')
    if (precision === 11) snak.value = `${year}-${month}-${day}`
    else if (precision === 10) snak.value = `${year}-${month}`
    else if (precision === 9) snak.value = `${year}`
  }
}

function minimizeRichQuantityValue (snak, value) {
  // Do not try to parse numbers with string reprensentations longer than 14 as the JS number encoding could start to make things funny
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_encoding
  if (value.amount.length < 15) value.amount = parseFloat(value.amount)
  if (value.unit === '1') delete value.unit
  const remainingKeys = Object.keys(value)
  if (remainingKeys.length === 1 && remainingKeys[0] === 'amount') {
    snak.value = value.amount
  }
}
