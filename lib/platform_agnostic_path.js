import path from 'node:path'

const platformAgnosticPath = process.platform === 'win32' ? path.win32 : path

export const resolve = platformAgnosticPath.resolve
export const join = platformAgnosticPath.join
