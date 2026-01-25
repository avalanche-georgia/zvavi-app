export const LD_CLIENT_SIDE_ID = process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID || ''

export const observabilityConfig = {
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
  },
  serviceName: 'zvavi-app',
  serviceVersion: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev',
  tracingOrigins: true,
}

export const sessionReplayConfig = {
  manualStart: true, // Start replay only on errors
  privacySetting: 'strict' as const,
}
