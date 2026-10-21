import type { GalleryEntry } from './entries'

// Nav and page order; entries inside a group are sorted by title
export const galleryGroups = [
  { id: 'foundations', title: 'Foundations' },
  { id: 'actions', title: 'Actions' },
  { id: 'inputs', title: 'Inputs' },
  { id: 'dates', title: 'Dates & time' },
  { id: 'overlays', title: 'Overlays' },
  { id: 'feedback', title: 'Feedback & status' },
  { id: 'content', title: 'Content & data' },
] as const

export type GalleryGroupId = (typeof galleryGroups)[number]['id']

export type GalleryGroup = {
  entries: GalleryEntry[]
  id: GalleryGroupId
  title: string
}

export const groupGalleryEntries = (entries: GalleryEntry[]): GalleryGroup[] =>
  galleryGroups.map(({ id, title }) => ({
    entries: entries
      .filter((entry) => entry.group === id)
      .toSorted((first, second) => first.title.localeCompare(second.title)),
    id,
    title,
  }))
