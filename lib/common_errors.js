const { red } = require('chalk')

module.exports = {
  missingProperty: property => {
    console.error(red(`the property ${property} could not be found\n`) +
      'run `wb props --reset` to refresh the local properties list')
    process.exit(1)
  }
}
