// HEIC is the iPhone default. Safari decodes it natively; every other browser
// needs libheif (~3 MB, so it's only loaded once a HEIC actually shows up).
// Chrome often reports an empty MIME type for .heic, hence the extension check.
const heicMimePattern = /^image\/hei[cf]/
const heicExtensionPattern = /\.hei[cf]$/i

type DmsValue = [[number, number], [number, number], [number, number]]

export const isHeicFile = (file: File): boolean =>
  heicMimePattern.test(file.type) || heicExtensionPattern.test(file.name)

export const convertHeicToJpeg = async (file: File): Promise<File> => {
  const { heicTo } = await import('heic-to/csp')
  const jpeg = await heicTo({ blob: file, quality: 0.92, type: 'image/jpeg' })

  return new File([jpeg], file.name.replace(heicExtensionPattern, '.jpg'), { type: 'image/jpeg' })
}

// EXIF rationals: degrees, minutes, seconds (seconds kept to 1/100)
const toDms = (decimal: number): DmsValue => {
  const absolute = Math.abs(decimal)
  const degrees = Math.floor(absolute)
  const minutesFloat = (absolute - degrees) * 60
  const minutes = Math.floor(minutesFloat)

  return [
    [degrees, 1],
    [minutes, 1],
    [Math.round((minutesFloat - minutes) * 60 * 100), 100],
  ]
}

const blobToBinaryString = async (blob: Blob): Promise<string> => {
  const bytes = new Uint8Array(await blob.arrayBuffer())
  const chunkSize = 0x8000
  let binary = ''

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize))
  }

  return binary
}

// Decoding HEIC → JPEG drops all metadata, so the GPS position is read from
// the original and written back into the final JPEG. Best-effort: any failure
// just returns the photo without GPS rather than failing the upload.
export const copyGpsFromHeic = async (source: File, jpeg: Blob): Promise<Blob> => {
  try {
    const [{ default: exifr }, { default: piexif }] = await Promise.all([
      import('exifr'),
      import('piexifjs'),
    ])
    const gps = await exifr.gps(source)

    if (!gps) return jpeg

    const exif = piexif.dump({
      GPS: {
        [piexif.GPSIFD.GPSLatitudeRef]: gps.latitude >= 0 ? 'N' : 'S',
        [piexif.GPSIFD.GPSLatitude]: toDms(gps.latitude),
        [piexif.GPSIFD.GPSLongitudeRef]: gps.longitude >= 0 ? 'E' : 'W',
        [piexif.GPSIFD.GPSLongitude]: toDms(gps.longitude),
      },
    })
    const withGps = piexif.insert(exif, await blobToBinaryString(jpeg))

    return new Blob([Uint8Array.from(withGps, (char) => char.charCodeAt(0))], {
      type: 'image/jpeg',
    })
  } catch (error) {
    console.warn('copyGpsFromHeic | GPS not copied', error)

    return jpeg
  }
}
