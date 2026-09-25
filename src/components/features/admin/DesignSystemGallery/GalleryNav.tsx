import type { GalleryEntry } from './entries'

const GalleryNav = ({ entries }: { entries: GalleryEntry[] }) => (
  <nav className="flex flex-wrap gap-2">
    {entries.map(({ id, title }) => (
      <a
        key={id}
        className="border-rule text-copy-sm text-body hover:bg-tile focus-ring rounded-full border px-3 py-1.5"
        href={`#${id}`}
      >
        {title}
      </a>
    ))}
  </nav>
)

export default GalleryNav
