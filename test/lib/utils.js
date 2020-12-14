const { yellow } = require('chalk')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const testsEnv = 'export WB_CLIPBOARD=false WB_LANG=en WB_MAXLAG=100'

const shellExec = async cmd => {
  // Overwrite local config
  cmd = `${testsEnv} ; ${cmd}`
  const { stdout, stderr } = await exec(cmd)
  return {
    stdout: stdout.trim(),
    stderr: stderr.trim()
  }
}

module.exports = {
  // A function to quickly fail when a test gets an undesired positive answer
  undesiredRes: done => res => {
    console.warn(res, 'undesired positive res')
    done(new Error('.then function was expected not to be called'))
  },

  // Same but for async/await tests that don't use done
  shouldNotBeCalled: res => {
    console.warn(yellow('undesired positive res:'), res)
    const err = new Error('function was expected not to be called')
    err.name = 'shouldNotBeCalled'
    err.context = { res }
    throw err
  },

  undesiredErr: done => err => {
    done(err)
    console.warn(err.body || err, 'undesired err body')
  },

  shellExec,

  wdTest: async cmd => shellExec(`export WB_INSTANCE=https://test.wikidata.org ; ./bin/wb ${cmd}`),

  wbDry: async cmd => shellExec(`./bin/wb ${cmd} --dry`),

  randomString: () => Math.random().toString(36).slice(2, 10),
}
