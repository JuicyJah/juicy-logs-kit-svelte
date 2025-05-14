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

function getLogConfig(overrides = {}) {
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

function addLogLevelToPayload(payload, level) {
  if (typeof payload === 'string') {
    return { message: payload, level }
  } else if (typeof payload === 'object') {
    return { ...payload, level }
  } else {
    return { message: 'No message provided', level }
  }
}

async function sendLog(config, data) {
  if (!config) return
  const { token, url, source } = config

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const body = JSON.stringify(new Log(data, source))

  if (config.console) {
    console.log(data)
  }

  try {
    const response = await fetch(`${url}/api/logs`, {
      method: 'POST',
      headers,
      body
    })

    if (!response.ok) {
      console.error('JUICY_LOGS:Error sending log:', response.statusText)
    }
  } catch (error) {
    console.error('JUICY_LOGS: Error sending log:', error)
  }
}

class Log {
  constructor(data, source) {
    if (typeof data === 'string') {
      this.message = data
    } else if (typeof data === 'object') {
      this.message = data?.message ?? "No message provided"
      this.level = data?.level ?? "INFO"
      Object.assign(this, data)
    } else {
      this.message = "No message provided"
      this.level = "INFO"
    }
    this.source = source
  }
}

export default class Logger {
  constructor() {
  }

  static async log(...args) {
    return await new Logger().log(...args)
  }

  async log(messageOrData, overrides = {}) {
    const config = getLogConfig(overrides)
    await sendLog(config, messageOrData)
  }

  static async error(...args) {
    return await new Logger().error(...args)
  }

  async error(messageOrData, overrides = {}) {
    return await Logger.log(addLogLevelToPayload(messageOrData, 'ERROR'), overrides)
  }

  static async info(...args) {
    return await new Logger().info(...args)
  }

  async info(messageOrData, overrides = {}) {
    return await Logger.log(addLogLevelToPayload(messageOrData, 'INFO'), overrides)
  }

  static async warn(...args) {
    return await new Logger().warn(...args)
  }

  async warn(messageOrData, overrides = {}) {
    return await Logger.log(addLogLevelToPayload(messageOrData, 'WARN'), overrides)
  }

  static async debug(...args) {
    return await new Logger().debug(...args)
  }

  async debug(messageOrData, overrides = {}) {
    return await Logger.log(addLogLevelToPayload(messageOrData, 'DEBUG'), overrides)
  }

  static async logInferLevel(...args) {
    return await new Logger().logInferLevel(...args)
  }

  async logInferLevel(messageOrData, overrides = {}) {
    if (typeof messageOrData === 'string' || !messageOrData.status) {
      return await this.info(messageOrData, overrides)
    }

    const status = messageOrData.status

    if (status >= 400)
      return await this.warn(messageOrData, overrides)

    if (status >= 500)
      return await this.error(messageOrData, overrides)

    return await this.info(messageOrData, overrides)
  }
}