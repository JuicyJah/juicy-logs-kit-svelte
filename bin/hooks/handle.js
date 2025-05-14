export default function handleHook(logger) {
  return async ({ event, resolve }) => {
    const response = await resolve(event)

    if (!config.log_http_status_codes.includes(response.status) || config.exclude_http_status_codes.includes(response.status)) return response

    if (config.exclude_routes.includes(event.route.id)) return response

    if (!config.log_http_methods.includes(event.request.method) || config.exclude_http_methods.includes(event.request.method)) return response

    logger.logInferLevel({
      message,
      ip: event.getClientAddress(),
      route: event.route.id,
      url: event.url.href,
      params: event.params,
      method: event.request.method,
      status: response.status,
      stack: error?.stack
    })

    return response
  }
}
