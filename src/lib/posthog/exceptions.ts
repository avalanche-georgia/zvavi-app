import { regionIds } from '@domain/constants'
import type { CaptureResult } from 'posthog-js'
import { locales } from 'src/i18n/config'

import { appRelease } from './config'
import { redactText } from './redact'

const maxMessageLength = 500

const knownRegionIds = new Set<string>(Object.values(regionIds))

// Harmless browser noise; more can be suppressed with rules in the PostHog UI
const noiseMessagePatterns = [
  // Layout warning from ResizeObserver, not a real failure
  /ResizeObserver loop/i,
  // Cross-origin script failure: no message, no stack, nothing to act on
  /^Script error\.?$/,
]

// Errors thrown inside browser extensions injected into the page
const extensionFramePattern = /^(chrome|moz|safari(-web)?)-extension:\/\//

type ExceptionFrame = { abs_path?: string; filename?: string }

type ExceptionEntry = {
  stacktrace?: { frames?: ExceptionFrame[] }
  value?: string
}

const getExceptionList = (event: CaptureResult): ExceptionEntry[] => {
  const list = event.properties.$exception_list

  return Array.isArray(list) ? list : []
}

const isExtensionError = (entry: ExceptionEntry) =>
  (entry.stacktrace?.frames ?? []).some((frame) =>
    extensionFramePattern.test(frame.abs_path ?? frame.filename ?? ''),
  )

const isNoiseEntry = (entry: ExceptionEntry) =>
  noiseMessagePatterns.some((pattern) => pattern.test(entry.value ?? '')) || isExtensionError(entry)

export const isNoiseException = (event: CaptureResult) => {
  const exceptionList = getExceptionList(event)

  return exceptionList.length > 0 && exceptionList.every(isNoiseEntry)
}

// Error messages can echo a URL; also caps runaway messages
export const sanitizeErrorMessage = (message: string) =>
  redactText(message).slice(0, maxMessageLength)

export const sanitizeException = (event: CaptureResult) => {
  getExceptionList(event).forEach((entry) => {
    if (entry.value) entry.value = sanitizeErrorMessage(entry.value)
  })

  return event
}

// Super-properties derived from the page the event happened on
export const getPageContextProperties = (pathname: unknown) => {
  const [locale, maybeRegionId] =
    typeof pathname === 'string' ? pathname.split('/').filter(Boolean) : []

  return {
    app_release: appRelease,
    locale: locale && (locales as string[]).includes(locale) ? locale : null,
    region_id: maybeRegionId && knownRegionIds.has(maybeRegionId) ? maybeRegionId : null,
    source: 'client',
  }
}

export const addPageContext = (event: CaptureResult) => {
  Object.assign(event.properties, getPageContextProperties(event.properties.$pathname))

  return event
}
