import "@sveltejs/kit"
import packageJSON from "../../package.json" assert { type: "json" }
import { env } from '$env/dynamic/private'
import { JuicyLogsBaseConfig } from '@juicyjah/juicy-logs-kit-core'

const PACKAGE_NAME = packageJSON.name
const PACKAGE_VERSION = packageJSON.version

export default class JuicyLogsSveltekitConfig extends JuicyLogsBaseConfig {
  constructor(overrides = {}) {
    overrides = {
      url: env?.JUICY_LOGS_URL,
      token: env?.JUICY_LOGS_TOKEN,
      source: env?.JUICY_LOGS_SOURCE_NAME,
      juicy_logs_version: PACKAGE_VERSION,
      juicy_logs_package: PACKAGE_NAME,
      ...overrides
    }
    super(overrides)
  }
}
