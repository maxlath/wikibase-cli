import { exec } from 'node:child_process'
import { green } from '#lib/chalk'
import getCacheFolderPath from '#lib/get_cache_folder_path'

export default () => {
  return getCacheFolderPath('props')
  .then(propsDir => {
    // --force: ignore if there are no more files to delete
    exec(`rm --force ${propsDir}/*.json`, (err, res) => {
      if (err) console.error('reset properties failed', err)
      else console.log(green('properties reset'))
    })
  })
}
