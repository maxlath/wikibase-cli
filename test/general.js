const test = require('ava')
const execa = require('execa')

test('custom instance', t => {
  return execa.shell('./bin/wd label Q123456 --instance https://wikiyou.lala')
  .catch(err => {
    t.true(err.stderr.match(/getaddrinfo ENOTFOUND wikiyou\.lala/) != null)
  })
})
