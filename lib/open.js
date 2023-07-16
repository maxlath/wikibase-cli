import open from 'open'
import { copyAndExit } from './copy.js'
import program from './program.js'

export function openUrl (url) {
  const { url: urlOnly, clipboard } = program
  if (urlOnly) {
    clipboard ? copyAndExit(url) : console.log(url)
  } else {
    if (clipboard) copyAndExit(url)
    open(url, { url: true })
  }
}
