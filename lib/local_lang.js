import { isValidLang } from './validate.js'

const { LANG } = process.env

// process.env.LANG is apparently not defined on Windows
const lang = (LANG && LANG.split(/[\W_-]/)[0])
export const localLang = isValidLang(lang) ? lang : 'en'
