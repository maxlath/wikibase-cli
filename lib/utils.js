const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const sum = (a, b) => a + b

const average = values => {
  if (values.length > 0) return values.reduce(sum, 0) / values.length
  else return 0
}

module.exports = { wait, average }
