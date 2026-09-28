import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// false during server rendering and hydration, true afterwards — for output that
// depends on the browser (local timezone, storage) and would mismatch the server
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

export default useIsClient
