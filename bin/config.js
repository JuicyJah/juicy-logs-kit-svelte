import "@sveltejs/kit"
import { env } from '$env/dynamic/private'

function getURL() {
  return env?.JUICY_LOGS_URL
}

function getToken() {
  return env?.JUICY_LOGS_TOKEN
}

function getSourceName() {
  return env?.JUICY_LOGS_SOURCE_NAME
}
function getConfig(overrides = {}) {
  const config = {
    token: getToken(),
    url: getURL(),
    source: getSourceName(),
    console: false,
    ...overrides
  }

  if (!config.token)
    throw new Error('Missing JUICY_LOGS_TOKEN from environment variables')

  if (!config.url)
    throw new Error('Missing JUICY_LOGS_URL from environment variables')

  if (!config.source)
    throw new Error('Missing JUICY_LOGS_SOURCE_NAME from environment variables')

  return config
}

export default getConfig