// Resized WebP copies stored next to each original photo. The variant key is
// derived from the original key, so only originals are persisted in the DB:
// `observations/2026-09/<uuid>.jpg` → `observations/2026-09/<uuid>_thumb.webp`.
//
// Variants have all metadata stripped. Originals keep the submitter's EXIF
// (incl. GPS of where they stood) and must never be served publicly.
//
// Keep in sync with scripts/backfill-photo-variants.mjs.
export const photoVariants = {
  // Full-screen viewing
  large: { maxSize: 2048, suffix: '_large.webp' },
  // Carousels and single-photo views at list/detail size
  preview: { maxSize: 1280, suffix: '_preview.webp' },
  // Cards, tables, small tiles
  thumb: { maxSize: 320, suffix: '_thumb.webp' },
} as const

export type PhotoVariant = keyof typeof photoVariants

export const getPhotoVariantKey = (key: string, variant: PhotoVariant): string =>
  key.replace(/\.[^./]+$/, '') + photoVariants[variant].suffix
