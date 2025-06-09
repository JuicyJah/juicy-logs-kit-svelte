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
}