export const LD_CLIENT_SIDE_ID = process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_ID || ''

export const observabilityConfig = {
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: false, // Disabled for security - prevents capturing auth tokens
  },
  serviceName: 'zvavi-app',
  tracingOrigins: true,
}

export const sessionReplayConfig = {
  manualStart: true, // Start replay only on errors
  privacySetting: 'strict' as const,
}
