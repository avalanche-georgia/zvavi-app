import { regionLocalStorageKey } from '@domain/constants'

// Saves the region the reader explicitly chose (the region chooser). Read by the
// proxy for "/" and by the public layout. Visiting a region page never calls this.
const rememberRegion = (regionId: string) => {
  document.cookie = `${regionLocalStorageKey}=${regionId}; path=/; max-age=31536000; SameSite=Lax`
}

export default rememberRegion
