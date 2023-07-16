// Valid lang examples: en, war, tt-cyrl, be-tarask
export const isValidLang = str => /^[a-z]{2,4}(-[a-z]{2,10})?$/.test(str)
