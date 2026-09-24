type MapsLink = {
  href: string
  // geo: is handed to the OS — opening it in a new tab would leave an empty one
  isExternalPage: boolean
}

// Android: a geo: URI opens the system chooser with every installed maps app.
// Elsewhere (iOS, desktop) there's no such chooser — Google Maps opens its app
// when installed, the website otherwise.
const getMapsLink = (latitude: number, longitude: number): MapsLink => {
  const coordinates = `${latitude},${longitude}`
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)

  if (isAndroid) return { href: `geo:${coordinates}?q=${coordinates}`, isExternalPage: false }

  return {
    href: `https://www.google.com/maps/search/?api=1&query=${coordinates}`,
    isExternalPage: true,
  }
}

export default getMapsLink
