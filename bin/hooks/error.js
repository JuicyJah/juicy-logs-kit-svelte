export default function errorHook(logger) {
  return async ({ error, event, status, message }) => {
    const ret = {
      status,
      message
    }

    if (!logger.config.log_http_status_codes.includes(status) || logger.config.exclude_http_status_codes.includes(status)) return ret

    if (logger.config.exclude_routes.includes(event.route.id)) return ret

    if (!logger.config.log_http_methods.includes(event.request.method) || logger.config.exclude_http_methods.includes(event.request.method)) return ret

    logger.error({
      message,
      ip: event.getClientAddress(),
      route: event.route.id,
      url: event.url.href,
      params: event.params,
      method: event.request.method,
      status,
      stack: error?.stack
    })

    return ret
  }
}
