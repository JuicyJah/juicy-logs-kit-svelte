# juicy-logs-kit-svelte
The official logging tool for sending app logs and events to Juicy Logs from SvelteKit applications.

This package is meant to abstract the boiler plate of sending logs and events to the Juicy Logs servers, as well as subscribing to the event pubsub.

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

Configuration is currently available. README to be updated.

### TODO
- Add events logging
- Add events pubsub
- Log more information about requests and headers
- Update README to document available configurations
