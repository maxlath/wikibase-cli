const fs = require('fs')
const path = require('path')
const errors_ = require('./errors')

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const sum = (a, b) => a + b

const average = values => {
  if (values.length > 0) return values.reduce(sum, 0) / values.length
  else return 0
}

const getAbsoluteFilePath = filepath => path.resolve(process.cwd(), filepath)

const isFilePathSync = arg => {
  const possibleFilePath = getAbsoluteFilePath(arg)
  return fs.existsSync(possibleFilePath)
}

const isJsonString = str => {
  if (typeof str !== 'string') return false
  else return (str.trim()[0] === '{' || str.trim()[0] === '[')
}

const validateTemplateCommand = ({ commandName, validCommands }) => {
  if (!validCommands) return
  if (validCommands && !validCommands.includes(commandName)) {
    throw errors_.exitMessage('wrong command for this template', { commandName, validCommands })
  }
}

module.exports = { wait, average, isFilePathSync, isJsonString, getAbsoluteFilePath, validateTemplateCommand }
