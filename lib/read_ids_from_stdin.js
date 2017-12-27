const split = require('split')
const through = require('through')

var ids = []

module.exports = handleIdsBatch => {
  const write = function (id) {
    ids.push(id.trim())
    if (ids.length < 50) return

    this.pause()

    const batch = ids
    ids = []

    handleIdsBatch(batch)
    .then(() => this.resume())
  }

  const end = function () {
    if (ids.length === 0) return this.emit('end')
    handleIdsBatch(ids)
    .then(this.emit.bind(this, 'end'))
  }

  process.stdin
  .pipe(split(' '))
  .pipe(through(write, end))
}
