import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import errors_ from './errors.js'

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const sum = (a, b) => a + b

export function average (values) {
  if (values.length > 0) return values.reduce(sum, 0) / values.length
  else return 0
}

export const getAbsoluteFileUrl = filepath => pathToFileURL(path.resolve(process.cwd(), filepath))

export function isFilePathSync (arg) {
  const possibleFileUrl = getAbsoluteFileUrl(arg)
  return existsSync(possibleFileUrl)
}

export function isJsonString (str) {
  if (typeof str !== 'string') return false
  else return (str.trim()[0] === '{' || str.trim()[0] === '[')
}

export function validateTemplateCommand ({ commandName, validCommands }) {
  if (!validCommands) return
  if (validCommands && !validCommands.includes(commandName)) {
    throw errors_.exitMessage('wrong command for this template', { commandName, validCommands })
  }
}

export function getHost (url) {
  const { host } = new URL(url)
  return host
}
