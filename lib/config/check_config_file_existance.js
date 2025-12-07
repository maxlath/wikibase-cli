import { access, writeFile } from 'fs/promises'
import read from 'read'

export async function checkConfigFileExistance (configFilePath) {
  try {
    await access(configFilePath)
  } catch (err) {
    if (err.code === 'ENOENT' && process.stdout.isTTY) {
      await offerToCreateMissingConfigFile(configFilePath)
    } else {
      throw err
    }
  }
}

async function offerToCreateMissingConfigFile (configFilePath) {
  try {
    const res = await read({ prompt: `Config file not found at ${configFilePath}. Create? y/N` })
    if (res.trim() === 'y') {
      await writeFile(configFilePath, '{}', { mode: 0o600 })
    } else {
      process.exit(1)
    }
  } catch (err) {
    if (err.message === 'canceled') process.exit(1)
    else throw err
  }
}
