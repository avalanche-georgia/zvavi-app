// HEIC is the iPhone default. Safari decodes it natively; every other browser
// needs libheif (~3 MB, so it's only loaded once a HEIC actually shows up).
// Chrome often reports an empty MIME type for .heic, hence the extension check.
const heicMimePattern = /^image\/hei[cf]/
const heicExtensionPattern = /\.hei[cf]$/i

export const isHeicFile = (file: File): boolean =>
  heicMimePattern.test(file.type) || heicExtensionPattern.test(file.name)

export const convertHeicToJpeg = async (file: File): Promise<File> => {
  const { heicTo } = await import('heic-to/csp')
  const jpeg = await heicTo({ blob: file, quality: 0.92, type: 'image/jpeg' })

  return new File([jpeg], file.name.replace(heicExtensionPattern, '.jpg'), { type: 'image/jpeg' })
}
