// Log as newline-delimited JSON: one obj JSON per line. No comma.

module.exports = array => {
  for (let obj of array) {
    process.stdout.write(JSON.stringify(obj))
    process.stdout.write('\n')
  }
}
