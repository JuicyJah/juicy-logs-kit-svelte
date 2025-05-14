import handleHook from './handle.js'
import errorHook from './error.js'

export default class ConfiguredHooks {
  constructor(configuredLogger) {
    this.handle = handleHook(configuredLogger)
    this.handleError = errorHook(configuredLogger)
  }
}