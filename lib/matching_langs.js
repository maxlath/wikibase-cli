const wdLang = require('wikidata-lang')
const { values, padEnd } = require('lodash')

const find = input => {
  const regex = new RegExp(input, 'i')
  return values(wdLang.byCode)
  .filter(matches(regex))
}

const matches = regex => langData => {
  const { label, native } = langData
  return label.match(regex) || native.match(regex)
}

const format = langsData => langsData.map(formatLangData).join('\n')

const formatLangData = langData => {
  const { code, label, native, wd } = langData
  return `${padEnd(code, 5)} ${padEnd(wd, 10)} ${padEnd(label, 10)} ${padEnd(native, 10)} `
}

module.exports = { find, format }
