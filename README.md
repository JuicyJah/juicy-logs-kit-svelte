# juicy-logs-kit-svelte
The official logging tool for sending app logs and events to Juicy Logs from SvelteKit applications.

This package is meant to abstract the boiler plate of sending logs and events to the Juicy Logs servers, as well as subscribing to the event pubsub.

Signup for a free account at https://logs.juicyjah.com/signup and take the first step to a fresh and painless app logging and event pub/sub experience.

## How to use
1. Install the package with npm
```
npm i juicy-logs-kit-svelte
```

2. Add to your SvelteKit app.
```javascript
// src/hooks.server.js
import { sequence } from '@sveltejs/kit/hooks'
import { Logger } from "juicy-logs-kit-svelte"
...

const { hooks } = new Logger()

export const handle = sequence(hooks.handle, otherHandleFunction)

export const handleError = sequence(hooks.handleError, otherHandleErrorFunction)

```

3. In your environment variables, provide the URL and API token needed to access your logs at Juicy Logs.

```bash
#.env

...
JUICY_LOGS_URL=https://logs.juicyjah.com
JUICY_LOGS_TOKEN=your-token-here
JUICY_LOGS_SOURCE_NAME=your-app-name-here

```

4. Access your logs at https://logs.juicyjah.com

## Configure your logs

You can customize the logging behavior by passing a configuration object when initializing the Logger:

```javascript
const { hooks } = new Logger({
  log_debug: true,      // Enable/disable debug logs
  log_info: true,       // Enable/disable info logs
  log_error: true,      // Enable/disable error logs
  log_warn: true,       // Enable/disable warning logs
  log_http_methods: ['GET', 'POST', 'PUT', 'DELETE'],  // HTTP methods to log
  exclude_http_methods: [],  // HTTP methods to exclude from logging
  log_http_status_codes: [200, 201, 400, 401, 403, 404, 500], // Status codes to log
  exclude_http_status_codes: [], // Status codes to exclude from logging
  exclude_routes: ['/health-check'], // Routes to exclude from logging
  console: false        // Enable console logging in addition to sending to Juicy Logs
})
```

All configuration options are optional and will use sensible defaults if not specified.

## Using Events

Juicy Logs supports event pushing for tracking important application events. To use events:

```javascript
import { EventPusher } from "juicy-logs-kit-svelte"

// Create an event pusher instance
const eventPusher = new EventPusher()

// Push a simple event with just a message
await eventPusher.push("User logged in")

// Push a detailed event
await eventPusher.push({
  type: "user_action",        // Event type for categorization
  type_id: "login",          // Specific event identifier
  action: "login_successful", // The action that occurred
  message: "User successfully logged in",  // Human-readable message
  data: {                    // Additional event data
    userId: "123",
    timestamp: new Date(),
    browser: "Chrome"
  }
})

// You can also use the static method
await EventPusher.push({
  type: "system_event",
  message: "Application started"
})
```

Events require either a `type` or `type_id` field to be specified when sending detailed events. The `message` field is optional but recommended for better readability in your event logs.

You can view your events in the Events section of your Juicy Logs dashboard at https://logs.juicyjah.com.

### TODO
- Add events pubsub subscription functionality
- Add more request metadata logging (headers, user agent, etc.)
- Add support for custom log formatters
- Add batch event processing
