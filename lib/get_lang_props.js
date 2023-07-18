import { writeFile } from 'node:fs/promises'
import { URL } from 'node:url'
import { getCacheFolderPath } from '#lib/get_cache_folder_path'
import { hashString } from '#lib/hash_string'
import { readJsonFile } from '#lib/json'
import fetchLangProps from './fetch_lang_props.js'

export default async program => {
  const { lang, sparqlEndpoint, noCache } = program
  const sparqlEndpointName = getSparqlEndpointPart(sparqlEndpoint)

  const propsDir = await getCacheFolderPath('props')
  const langJsonFilePath = `${propsDir}/${lang}${sparqlEndpointName}.v2.json`

  if (noCache) return refreshProps(program, langJsonFilePath)

  try {
    return readJsonFile(langJsonFilePath)
  } catch (err) {
    return refreshProps(program, langJsonFilePath)
  }
}

const refreshProps = async (program, langJsonFilePath) => {
  await fetchAndSaveProps(program, langJsonFilePath)
  return readJsonFile(langJsonFilePath)
}

const fetchAndSaveProps = async (program, langJsonFilePath) => {
  const props = await fetchLangProps(program)
  return writeFile(langJsonFilePath, JSON.stringify(props))
}

const getSparqlEndpointPart = sparqlEndpoint => {
  if (!sparqlEndpoint) return ''
  const { host } = new URL(sparqlEndpoint)
  const hash = hashString(sparqlEndpoint)
  return `-${host}-${hash}`
}
