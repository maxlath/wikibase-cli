module.exports = {
  string: arg => arg.toString(),
  boolean: value => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  },
  lang: str => str.split(/[\W_-]/)[0].toLowerCase(),
  object: obj => obj
}
