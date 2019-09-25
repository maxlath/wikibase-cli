const prompt = require('prompt')
const { values, invert } = require('lodash')

module.exports = (keysLabels) => new Promise((resolve, reject) => {
  prompt.start()
  const labels = values(keysLabels)
  const keysByLabels = invert(keysLabels)
  return prompt.get(labels, parseResponse(resolve, reject, keysByLabels))
})

const parseResponse = (resolve, reject, keysByLabels) => (err, res) => {
  if (err) return reject(err)
  const enteredValuesByKeys = Object.keys(res).reduce((index, label) => {
    const key = keysByLabels[label]
    index[key] = res[label]
    return index
  }, {})
  resolve(enteredValuesByKeys)
}
