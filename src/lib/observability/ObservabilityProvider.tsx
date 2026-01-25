'use client'

import Observability from '@launchdarkly/observability'
import SessionReplay from '@launchdarkly/session-replay'
import { LDProvider } from 'launchdarkly-react-client-sdk'
import type { PropsWithChildren } from 'react'

import { LD_CLIENT_SIDE_ID, observabilityConfig, sessionReplayConfig } from './config'

// Silent logger for production
const noopLogger = {
  debug: () => {},
  error: () => {},
  info: () => {},
  warn: () => {},
}

export const ObservabilityProvider = ({ children }: PropsWithChildren) => {
  if (!LD_CLIENT_SIDE_ID) {
    return children
  }

  return (
    <LDProvider
      clientSideID={LD_CLIENT_SIDE_ID}
      context={{
        anonymous: true,
        kind: 'user',
      }}
      options={{
        logger: process.env.NODE_ENV === 'production' ? noopLogger : undefined,
        plugins: [new Observability(observabilityConfig), new SessionReplay(sessionReplayConfig)],
      }}
    >
      {children}
    </LDProvider>
  )
}
