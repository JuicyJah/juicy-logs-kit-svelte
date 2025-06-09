import { JuicyLogsSveltekitConfig } from '../config.js'
import { EventPusher as CoreEventPusher } from '@juicyjah/juicy-logs-kit-core'

export default class EventPusher extends CoreEventPusher {
  constructor(configOverrides) {
    const svelteConfig = new JuicyLogsSveltekitConfig(configOverrides)
    super(configOverrides)

    this.config = svelteConfig
  }
}