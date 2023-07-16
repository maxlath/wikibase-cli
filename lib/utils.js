import { existsSync } from 'node:fs'
import path from 'node:path'
import errors_ from './errors.js'

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const sum = (a, b) => a + b

export const average = values => {
  if (values.length > 0) return values.reduce(sum, 0) / values.length
  else return 0
}

export const getAbsoluteFilePath = filepath => path.resolve(process.cwd(), filepath)

export const isFilePathSync = arg => {
  const possibleFilePath = getAbsoluteFilePath(arg)
  return existsSync(possibleFilePath)
}

export const isJsonString = str => {
  if (typeof str !== 'string') return false
  else return (str.trim()[0] === '{' || str.trim()[0] === '[')
}

export const validateTemplateCommand = ({ commandName, validCommands }) => {
  if (!validCommands) return
  if (validCommands && !validCommands.includes(commandName)) {
    throw errors_.exitMessage('wrong command for this template', { commandName, validCommands })
  }
}
