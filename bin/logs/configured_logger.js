import { Logger as CoreLogger } from '@juicyjah/juicy-logs-kit-core'
import { JuicyLogsSveltekitConfig } from '../config.js'
import ConfiguredHooks from '../hooks/configured_hooks.js'

export default class ConfiguredLogger extends CoreLogger {
  constructor(httpConfigOverrides = {}, appConfigOverrides = {}) {
    const svelteConfig = new JuicyLogsSveltekitConfig(appConfigOverrides)
    super(httpConfigOverrides, svelteConfig)

    this.config = svelteConfig
    this.hooks = new ConfiguredHooks(this)
  }

  static async log(messageOrData, config) {
    return await CoreLogger.log(messageOrData, new JuicyLogsSveltekitConfig(config))
  }

  static async error(messageOrData, config) {
    return await CoreLogger.error(messageOrData, new JuicyLogsSveltekitConfig(config))
  }

  static async info(messageOrData, config) {
    return await CoreLogger.info(messageOrData, new JuicyLogsSveltekitConfig(config))
  }

  static async warn(messageOrData, config) {
    return await CoreLogger.warn(messageOrData, new JuicyLogsSveltekitConfig(config))
  }

  static async debug(messageOrData, config) {
    return await CoreLogger.debug(messageOrData, new JuicyLogsSveltekitConfig(config))
  }

  static async logInferLevel(messageOrData, config) {
    return await CoreLogger.logInferLevel(messageOrData, new JuicyLogsSveltekitConfig(config))
  }
}