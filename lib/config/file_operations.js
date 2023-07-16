// Could be replaced by fs.promises.writeFile once we drop support for NodeJS <= v10
import { writeFileSync } from 'node:fs'
import errors_ from '../errors.js'
import valueParsers from '../value_parsers.js'
import { config } from './config.js'
import { configFilePath } from './file_path.js'
import parameters from './parameters.js'

const parametersKeys = Object.keys(parameters)

export default {
  get: key => {
    validateKey(key)
    const param = parameters[key]
    const currentValue = config[key]
    // Using a null test as some values might be falsy
    return (currentValue != null) ? currentValue : param.default
  },
  set: async (key, value) => {
    validateKey(key)
    const param = parameters[key]
    // Clear a specific parameter to get back the default setting
    if (value === 'clear' || value === 'reset') {
      delete config[key]
    } else {
      value = valueParsers[param.type](value)
      // Reject invalid value
      const valid = param.test ? param.test(value) : typeof value === param.type // eslint-disable-line valid-typeof
      if (!valid) return errors_.bundle('invalid parameter', value)
      config[key] = value
    }
    if (configFilePath) {
      writeFileSync(configFilePath, JSON.stringify(config, null, 2))
    } else {
      console.warn("config couldn't be edited as no config file path could be determined")
    }
  },
  configFilePath,
  clear: async () => {
    if (configFilePath) writeFileSync(configFilePath, '{}')
  },
}

const validateKey = key => {
  if (!parametersKeys.includes(key)) {
    return errors_.bundle('unknown parameter', key)
  }
}
