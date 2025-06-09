export default function handleHook(logger) {
  return async ({ event, resolve }) => {
    const response = await resolve(event)

    if (!!logger.httpConfig) {
      if (!logger.httpConfig.log_http_status_codes.includes(response.status) || logger.httpConfig.exclude_http_status_codes.includes(response.status)) return response

      if (logger.httpConfig.exclude_routes.includes(event.route.id)) return response

      if (!logger.httpConfig.log_http_methods.includes(event.request.method) || logger.httpConfig.exclude_http_methods.includes(event.request.method)) return response
    }

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
