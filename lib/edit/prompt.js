import read from 'read'
import { blue, yellow, grey } from 'tiny-chalk'

export default readsData => {
  const results = {}

  const promptSequentially = async () => {
    const nextReading = readsData.shift()
    if (!nextReading) return results
    let { key, label, pattern, options, info } = nextReading
    label = label || key
    results[key] = await prompt(label, pattern, options, info)
    return promptSequentially()
  }

  return promptSequentially()
}

const prompt = (label, pattern, options, info) => {
  const readAttempt = async () => {
    let message = blue(`${label}:`)
    if (info) message += `\n${grey(info)}`
    if (options) {
      pattern = new RegExp(`^[1-${options.length}]$`)
      options.forEach((option, index) => {
        message += `\n${index + 1} - ${option}`
      })
      message += '\n-'
    }
    let res = await read({ prompt: message })
    res = res.trim()
    if (!pattern || pattern.test(res)) {
      return res
    } else {
      const invalidLabel = options != null ? 'option' : label
      console.error(yellow(`invalid ${invalidLabel}:`), res)
      if (!options) console.error(grey(`expected pattern: ${pattern}`))
      return readAttempt()
    }
  }
  return readAttempt()
}
