import packageJSON from "../package.json" with { type: "json" }
import { JuicyLogsSveltekitConfig } from "./config.js"
import ConfiguredLogger from "./logs/configured_logger.js"
import EventPusher from "./events/event_pusher.js"

export const version = packageJSON.version
export const packageName = packageJSON.name

export { JuicyLogsSveltekitConfig }
export { ConfiguredLogger as Logger }
export { EventPusher }