import { exec } from 'node:child_process'
import { green } from '#lib/chalk'
import { getCacheFolderPath } from '#lib/get_cache_folder_path'

export default () => {
  return getCacheFolderPath('props')
  .then(propsDir => {
    // -f: ignore if there are no more files to delete
    // Use `-f` rather than `--force` to make it work on BusyBox
    // cf https://www.wikidata.org/wiki/User_talk:Maxlath#Small_fix and https://paste.toolforge.org/view/f40c24e5
    exec(`rm -f ${propsDir}/*.json`, err => {
      if (err) console.error('reset properties failed', err)
      else console.log(green('properties reset'))
    })
  })
}
