import sharp from 'sharp'

// Uploads are untrusted — refuse to decode anything bigger than ~50 MP (a phone
// camera is 12–48 MP) so a decompression bomb can't exhaust memory
const limitInputPixels = 50_000_000

// Every stored image goes through sharp, which writes no metadata unless asked:
// EXIF (incl. GPS), XMP and ICC are all dropped. rotate() first bakes the EXIF
// orientation into the pixels, so photos still display upright without it.
export const loadImage = (bytes: Uint8Array) => sharp(bytes, { limitInputPixels }).rotate()

// Same format, no metadata. JPEG is re-encoded at high quality — uploads are
// already compressed client-side, so this is about stripping, not shrinking.
export const stripMetadata = (bytes: Uint8Array, contentType: string): Promise<Buffer> => {
  const image = loadImage(bytes)

  return contentType === 'image/png'
    ? image.png().toBuffer()
    : image.jpeg({ mozjpeg: true, quality: 90 }).toBuffer()
}
