// Using a custom agent to set keepAlive=true
// https://nodejs.org/api/http.html#http_class_http_agent
// https://github.com/bitinn/node-fetch#custom-agent
import http from 'node:http'
import https from 'node:https'
import { pick } from 'lodash-es'
import fetch from 'node-fetch'
import { debug } from '#lib/debug'
import program from './program.js'
import globalHeaders from './request_headers.js'

const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })
// Useful to:
// - accept self-signed certificates
// - accept certificates that would otherwise generate a UNABLE_TO_VERIFY_LEAF_SIGNATURE error
const insecureHttpsAgent = new https.Agent({ keepAlive: true, rejectUnauthorized: false })
const tlsErrorsHosts = new Set([ 'datos.bne.es' ])

const agent = ({ host, protocol }) => {
  if (tlsErrorsHosts.has(host)) return protocol === 'http:' ? httpAgent : insecureHttpsAgent
  else return protocol === 'http:' ? httpAgent : httpsAgent
}
const buildHeaders = customHeaders => {
  if (customHeaders) return Object.assign({}, globalHeaders, customHeaders)
  else return globalHeaders
}

function request (url, options) {
  const { method = 'get', headers, body } = options
  debug('request', method.toUpperCase(), url, { headers, body })
  return fetch(url, options)
}

export const get = async url => {
  const res = await request(url, { headers: globalHeaders, agent })
  return handleResponse({ res, url })
}

export const customGet = async ({ url, headers }) => {
  const res = await request(url, { headers: buildHeaders(headers), agent })
  return handleResponse({ res, url })
}

export const post = async ({ url, body, headers }) => {
  const method = 'post'
  const res = await request(url, { method, body, headers: buildHeaders(headers), agent })
  return handleResponse({ res, url, method })
}

async function handleResponse ({ res, url, method }) {
  let body = await res.text()
  const { logResponseHeaders } = program
  if (logResponseHeaders) {
    let headers = res.headers.raw()
    if (typeof logResponseHeaders === 'string') {
      const headersSubset = logResponseHeaders.split(',')
      headers = pick(headers, headersSubset)
    }
    console.error(JSON.stringify({ request: { url, method }, response: { headers } }))
  }
  // When Wikibase crash it doesn't return JSON errors anymore
  try {
    body = JSON.parse(body)
  } catch (err) {
    console.error('could not parse response body as JSON', err, { body })
  }
  const { status: statusCode } = res
  if (statusCode >= 400) {
    throw newError(statusCode, body)
  } else if (body.error) {
    const { info, code } = body.error
    const statusCode = statusCodeByErrorCode[code] || 400
    throw newError(statusCode, info, body)
  } else {
    return body
  }
}

const newError = (statusCode, body, statusMessage) => {
  if (typeof body === 'string') {
    statusMessage = body
  } else {
    statusMessage = statusMessage || body.message || statusCode
  }
  const err = new Error(statusMessage)
  err.statusMessage = statusMessage
  err.status = err.statusCode = statusCode
  err.body = body
  return err
}

const statusCodeByErrorCode = {
  'no-such-entity': 404,
}
