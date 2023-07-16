import path from 'node:path'

export default process.platform === 'win32' ? path.win32 : path
