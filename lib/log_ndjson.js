// Log as newline-delimited JSON: one obj JSON per line. No comma.

export default array => {
  for (const obj of array.flat()) {
    process.stdout.write(JSON.stringify(obj))
    process.stdout.write('\n')
  }
}
