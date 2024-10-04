import split from 'split'
import through from 'through'
import program from '#lib/program'

let ids = []

export function readIdsFromStdin (handleIdsBatch) {
  let count = 0
  async function write (id) {
    id = id.trim()
    if (id === '') return
    count++
    ids.push(id)
    if (ids.length < 50) return

    this.pause()

    const batch = ids
    ids = []

    await handleIdsBatch(batch)
    this.resume()
  }

  async function end () {
    if (count === 0) program.helpAndExit(0)
    if (ids.length === 0) return this.emit('end')
    await handleIdsBatch(ids)
    this.emit('end')
  }

  process.stdin
  .pipe(split(/\s/))
  .pipe(through(write, end))
  .on('error', console.error)

  setTimeout(() => {
    if (count === 0) program.helpAndExit(0)
  }, 500)
}
