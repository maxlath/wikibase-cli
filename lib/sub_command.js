const execa = require('execa')
const wdCommand = __dirname.replace(/lib$/, '') + 'bin/wd'
// Sub shell seem to disable chalk colors unless passed FORCE_COLOR
const env = 'export FORCE_COLOR=true'

module.exports = command => {
  return execa.shell(`${env}; ${wdCommand} ${command}`)
  .then(res => console.log(res.stdout))
  .catch(console.error)
}
