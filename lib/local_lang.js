const { LANG } = process.env
// process.env.LANG is apparently not defined on Windows
module.exports = (LANG && LANG.split(/[\W_-]/)[0]) || 'en'
