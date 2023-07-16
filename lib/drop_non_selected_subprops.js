import { pick } from 'lodash-es'

export default (entity, requestedPropsAndSubProps) => {
  if (!requestedPropsAndSubProps) return

  const requestedProps = Object.keys(requestedPropsAndSubProps)
  requestedProps.forEach(prop => {
    const subkeys = Object.keys(requestedPropsAndSubProps[prop])
    if (subkeys && subkeys.length > 0) {
      entity[prop] = pick(entity[prop], subkeys)
      subkeys.forEach(subkey => {
        if (!entity[prop][subkey]) entity[prop][subkey] = null
      })
    }
  })
}
