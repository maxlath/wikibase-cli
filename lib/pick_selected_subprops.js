import { pick } from 'lodash-es'

export default (entity, requestedPropsAndSubProps) => {
  if (!requestedPropsAndSubProps || Object.keys(requestedPropsAndSubProps).length === 0) return entity

  if (requestedPropsAndSubProps.claims && entity.statements) {
    requestedPropsAndSubProps.statements = requestedPropsAndSubProps.claims
    delete requestedPropsAndSubProps.claims
  }

  const trimedEntity = {
    id: entity.id,
  }

  // Preserve info key/values, as some are needed downstream
  // Ex: type is required by simplifyEntity
  for (const key of Object.keys(entity)) {
    if (!requestedPropsAndSubProps[key] && !key.includes(omittableProps)) {
      trimedEntity[key] = entity[key]
    }
  }

  const requestedProps = Object.keys(requestedPropsAndSubProps)
  for (const prop of requestedProps) {
    const subkeys = Object.keys(requestedPropsAndSubProps[prop])
    if (subkeys && subkeys.length > 0) {
      trimedEntity[prop] = pick(entity[prop], subkeys)
      subkeys.forEach(subkey => {
        if (!entity[prop]?.[subkey]) {
          trimedEntity[prop] = trimedEntity[prop] || {}
          trimedEntity[prop][subkey] = null
        }
      })
    } else {
      trimedEntity[prop] = entity[prop]
    }
  }

  return trimedEntity
}

const omittableProps = [ 'info', 'sitelinks', 'aliases', 'labels', 'descriptions', 'claims', 'datatype' ]
