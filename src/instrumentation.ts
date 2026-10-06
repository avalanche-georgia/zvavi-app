import type { Instrumentation } from 'next'

export const register = () => {}

// Unhandled errors in server components, route handlers and the proxy
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const { captureServerError } = await import('@/lib/posthog/server')

  await captureServerError(error, {
    digest:
      typeof error === 'object' && error && 'digest' in error ? String(error.digest) : undefined,
    method: request.method,
    path: request.path,
    render_source: context.renderSource,
    route_path: context.routePath,
    route_type: context.routeType,
    router_kind: context.routerKind,
    scope: 'onRequestError',
  })
}
