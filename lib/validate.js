// Valid lang examples: en, war, tt-cyrl, be-tarask
export function isValidLang (str) {
  return typeof str === 'string' && /^[a-z]{2,4}(-[a-z]{2,10})?$/.test(str)
}
