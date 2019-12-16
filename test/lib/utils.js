const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

module.exports = {
  // A function to quickly fail when a test gets an undesired positive answer
  undesiredRes: done => res => {
    console.warn(res, 'undesired positive res')
    done(new Error('.then function was expected not to be called'))
  },
  undesiredErr: done => err => {
    done(err)
    console.warn(err.body || err, 'undesired err body')
  },

  shellExec: async cmd => {
    const { stdout, stderr } = await exec(cmd)
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim()
    }
  }
}
