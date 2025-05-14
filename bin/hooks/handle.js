export default function handleHook(logger) {
  return async ({ event, resolve }) => {
    const response = await resolve(event)

    if (!logger.config.log_http_status_codes.includes(response.status) || logger.config.exclude_http_status_codes.includes(response.status)) return response

    if (logger.config.exclude_routes.includes(event.route.id)) return response

    if (!logger.config.log_http_methods.includes(event.request.method) || logger.config.exclude_http_methods.includes(event.request.method)) return response

    logger.logInferLevel({
      ip: event.getClientAddress(),
      route: event.route.id,
      url: event.url.href,
      params: event.params,
      method: event.request.method,
      status: response.status
    })

    return response
  }
}
