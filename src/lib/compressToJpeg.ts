type CompressToJpegOptions = {
  maxSizeMB: number
  maxWidthOrHeight: number
}

// Re-encodes a picked photo in the browser to a smaller JPEG. Re-encoding drops all
// EXIF (incl. GPS), so stored photos never carry metadata. The library is loaded only
// when a photo is actually picked.
const compressToJpeg = async (
  file: File,
  { maxSizeMB, maxWidthOrHeight }: CompressToJpegOptions,
): Promise<Blob> => {
  const { default: imageCompression } = await import('browser-image-compression')

  return imageCompression(file, {
    fileType: 'image/jpeg',
    initialQuality: 0.85,
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
  })
}

export default compressToJpeg
