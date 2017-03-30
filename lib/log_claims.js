const { dim } = require('chalk')

module.exports = (program, simplifiedClaims, props) => {
  const logProp = LogProp(program.verbose, props)

  for (let k in simplifiedClaims) {
    let v = simplifiedClaims[k]
    logProp(k, v)
  }
}

const LogProp = (verbose, props) => (k, v) => {
  const propLabel = dim(verbose ? ` (${props[k]})` : '')
  const value = v.toString().replace(/,/g, ' ')
  // Do not use 'output' as those data are already formated/colored
  // and are not designed to be added to the clipboard
  console.log(`${dim(k)}${propLabel} ${value}`)
}
