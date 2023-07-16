export default {
  string: arg => arg.toString(),
  number: str => parseInt(str),
  boolean: value => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  },
  lang: str => str.split(/[\W_-]/)[0].toLowerCase(),
  object: obj => obj,
}
