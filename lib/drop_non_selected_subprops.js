const _ = require('lodash')

module.exports = (entity, props, propsSubkeys) => {
  if (!props) return

  props.forEach(prop => {
    const subkey = propsSubkeys[prop]
    if (subkey) {
      entity[prop] = _.pick(entity[prop], subkey)
      if (!entity[prop][subkey]) entity[prop][subkey] = null
    }
  })
}
