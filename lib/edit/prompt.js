const { promisify } = require('util')
const read = promisify(require('read'))
const { blue, yellow, grey } = require('tiny-chalk')

module.exports = (readsData) => {
  const results = {}

  const promptSequentially = () => {
    const nextReading = readsData.shift()
    if (!nextReading) return results
    var { key, label, pattern, options, info } = nextReading
    label = label || key
    return prompt(label, pattern, options, info)
    .then(res => { results[key] = res })
    .then(promptSequentially)
  }

  return promptSequentially()
}

const prompt = (label, pattern, options, info) => {
  const readAttempt = () => {
    var message = blue(`${label}:`)
    if (info) message += `\n${grey(info)}`
    if (options) {
      pattern = new RegExp(`^[1-${options.length}]$`)
      options.forEach((option, index) => {
        message += `\n${index + 1} - ${option}`
      })
      message += '\n-'
    }
    return read({ prompt: message })
    .then(res => {
      res = res.trim()
      if (!pattern || pattern.test(res)) {
        return res
      } else {
        const invalidLabel = options != null ? 'option' : label
        console.error(yellow(`invalid ${invalidLabel}:`), res)
        if (!options) console.error(grey(`expected pattern: ${pattern}`))
        return readAttempt()
      }
    })
  }
  return readAttempt()
}
