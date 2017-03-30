const { dim, bgBlack } = require('chalk')
const _ = require('lodash')
const wdk = require('wikidata-sdk')
const getLangProps = require('../lib/get_lang_props')
const write = process.stdout.write.bind(process.stdout)

module.exports = (program, simplifiedClaims, props) => {
  const getLabels = require('../lib/get_labels')(program)
  const { lang, verbose } = program

  return Promise.all([
    getLabels(collectEntityIds(simplifiedClaims)),
    getLangProps(lang)
  ])
  .then(results => {
    const [ labels, props ] = results
    const logProp = LogProp(verbose, labels, props)

    for (let k in simplifiedClaims) {
      let v = simplifiedClaims[k]
      logProp(k, v)
    }
  })
}

const collectEntityIds = claims => {
  return _(claims)
  .values()
  .flatten()
  .filter(wdk.isEntityId)
  .value()
}

const LogProp = (verbose, labels, props) => (prop, values) => {
  if (verbose) {
    write(formatEntity(bgBlack(props[prop]), prop) + ': ')
  } else {
    write(prop + ': ')
  }

  write(values.map(formatValue(labels, verbose)).join(' - '))
  write('\n')
}

const formatValue = (labels, verbose) => value => {
  if (wdk.isEntityId(value) && verbose) {
    return formatEntity(labels[value], value)
  } else {
    return value
  }
}

const formatEntity = (label, id) => label + ' ' + dim(`(${id})`)
