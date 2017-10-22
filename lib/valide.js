module.exports = {
  // Valid lang examples: en, war, tt-cyrl, be-tarask
  lang: str => /^[a-z]{2,4}(-[a-z]{2,10})?$/.test(str)
}
