module.exports = commandName => {
  if (commandName === 'description') return 'desc'
  else return commandName.split('-').map(getFirstLetter).join('')
}

const getFirstLetter = word => word[0]
