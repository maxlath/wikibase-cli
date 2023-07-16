import { copy } from 'copy-paste'

export function copyAndExit (text) {
  copy(text, () => {
    console.log(text)
    process.exit(0)
  })
}
