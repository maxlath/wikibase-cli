import { debug } from '#lib/debug'
import program from './program.js'
import { globalRequestHeaders } from './request_headers.js'
import { wait } from './utils.js'

function buildHeaders (customHeaders) {
  if (customHeaders) return { ...globalRequestHeaders, ...customHeaders }
  else return globalRequestHeaders
}

function request (url, options) {
  const { method = 'get', headers, body } = options
  debug('request', method.toUpperCase(), url, { headers, body })
  options.keepalive = true
  return insistentFetch(url, options)
}

const defaultRetryDelay = 5
async function insistentFetch (url, options, attempts = 0) {
  try {
    return await fetch(url, options)
  } catch (err) {
    // Only handling network errors. For HTTP errors, see handleResponse
    if (errorIsWorthARetry(err)) {
      const delaySeconds = defaultRetryDelay * ++attempts
      const method = (options.method || 'get').toUpperCase()
      retryWarn(method, url, err, delaySeconds, attempts)
      await wait(delaySeconds * 1000)
      return insistentFetch(url, options, attempts)
    } else {
      throw err
    }
  }
}

function retryWarn (method, url, err, delaySeconds, attempts) {
  console.warn(`[wikibase-cli][WARNING] ${method} ${url}
  ${err.message}${err.cause ? ` (cause: ${err.cause.message})` : ''}
  retrying in ${delaySeconds}s (attempt: ${attempts})`)
}

function errorIsWorthARetry (err) {
  if (errorCodesWorthARetry.has(err.code)) return true
  if (err.cause) return errorIsWorthARetry(err.cause)
  return false
}

const errorCodesWorthARetry = new Set([
  'ECONNREFUSED',
  'ENOTFOUND',
  'ETIMEDOUT',
])

export async function get (url) {
  const res = await request(url, { headers: globalRequestHeaders })
  return handleResponse({ res, url })
}

export async function customGet ({ url, headers, parseResponseAsJson = true }) {
  const res = await request(url, { headers: buildHeaders(headers) })
  return handleResponse({ res, url, parseResponseAsJson })
}

export async function post ({ url, body, headers, parseResponseAsJson = true }) {
  const method = 'post'
  const res = await request(url, { method, body, headers: buildHeaders(headers) })
  return handleResponse({ res, url, method, parseResponseAsJson })
}

async function handleResponse ({ res, url, method, parseResponseAsJson = true }) {
  let body = await res.text()
  const { logResponseHeaders } = program
  if (logResponseHeaders) {
    const headers = {}
    if (typeof logResponseHeaders === 'string') {
      const headersSubset = logResponseHeaders.split(',')
      for (const headerName of headersSubset) {
        headers[headerName] = res.headers.get(headerName)?.split(';').map(val => val.trim())
      }
    }
    console.error(JSON.stringify({ request: { url, method }, response: { headers } }))
  }
  if (parseResponseAsJson) {
    // When Wikibase crash it doesn't return JSON errors anymore
    try {
      body = JSON.parse(body)
    } catch (err) {
      console.error('could not parse response body as JSON', err, { responseBodySample: body.slice(0, 100) })
    }
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

function newError (statusCode, body, statusMessage) {
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
