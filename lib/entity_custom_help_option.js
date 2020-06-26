const program = require('@wikibasejs/commander')
const path = require('path')
const logCommandExamples = require('./log_command_examples')

// Called when the -h,--help flag was set, and we now need to figure out what to display
module.exports = () => {
  const { args } = program
  if (args.length === 0) return program.helpAndExit()

  let filePath, jsPath, jsModule
  try {
    filePath = args[0]
    jsPath = path.resolve(filePath)
    jsModule = require(jsPath)
  } catch (err) {
    console.error("Couldn't parse template file metadata", err, { filePath, jsPath, jsModule })
    process.exit(1)
  }

  if (jsModule.args == null) throw new Error("missing args metadata: can't display help menu")
  logTemplateHelp(jsModule, filePath)
  process.exit(0)
}

const logTemplateHelp = (jsModule, filePath) => {
  const { args, description, examples } = jsModule
  const command = `edit-entity ${filePath}`
  let helpText = ''
  if (description) helpText += `\n  ${description}`
  helpText += `\n\n  Usage:\n\n    ${command} ${args.join(' ')}\n`
  console.log(helpText)
  if (examples) logCommandExamples(command, examples, null, true)
}
