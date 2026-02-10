import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { grey, yellow } from 'tiny-chalk'

const execAsync = promisify(exec)

const testsEnv = 'export WB_CLIPBOARD=false WB_LANG=en WB_MAXLAG=100'

export async function shellExec (cmd, options = {}) {
  console.log(grey('shellExec command:'), cmd)
  // Overwrite local config
  cmd = `${testsEnv} ; ${cmd}`
  let { stdout, stderr } = await execAsync(cmd)
  if (options.trim !== false) {
    stdout = stdout.trim()
    stderr = stderr.trim()
  }
  return { stdout, stderr }
}

// A function to quickly fail when a test gets an undesired positive answer
export const undesiredRes = done => res => {
  console.warn(res, 'undesired positive res')
  done(new Error('.then function was expected not to be called'))
}

// Same but for async/await tests that don't use done
export const shouldNotBeCalled = res => {
  console.warn(yellow('undesired positive res:'), res)
  const err = new Error('function was expected not to be called')
  err.name = 'shouldNotBeCalled'
  err.context = { res }
  throw err
}

export const wdTest = async cmd => shellExec(`export WB_INSTANCE=https://test.wikidata.org ; ./bin/wb.js ${cmd}`)

export const wbDry = async cmd => shellExec(`./bin/wb.js ${cmd} --dry`)

export const randomString = () => Math.random().toString(36).slice(2, 10)
