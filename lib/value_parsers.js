module.exports = {
  boolean: function (value) {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  },
  lang: (str) => str.split(/[\W_-]/)[0].toLowerCase()
}
