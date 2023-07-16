import { readFileSync } from 'node:fs'

export function readJsonFile (jsonFilePath) {
  return JSON.parse(readFileSync(jsonFilePath, 'utf-8'))
}
