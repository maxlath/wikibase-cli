/**
 * A super light JSON get promise adapted from
 * https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
 * Requires ~ 1ms to load instead of the bluereq ~320ms or request-promise ~340ms
 */
module.exports = function lightGet (url) {
  // return new pending promise
  const promise = new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http')
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode >= 400) {
        reject(new Error(response.statusCode + ' ' + response.statusMessage))
      }
      // temporary data holder
      const body = []
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk))
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')))
    })
    // handle connection errors of the request
    request.on('error', reject)
  })

  return promise.then(JSON.parse)
}
