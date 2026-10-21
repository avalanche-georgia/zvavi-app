import type { GalleryGroup } from './groups'

const GalleryNav = ({ groups }: { groups: GalleryGroup[] }) => (
  <nav className="flex flex-col gap-4">
    {groups.map(({ entries, id, title }) => (
      <div key={id} className="flex flex-col gap-1">
        <a className="text-copy-sm text-muted hover:text-ink focus-ring font-bold" href={`#${id}`}>
          {title}
        </a>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 md:flex-col">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a className="text-copy-sm text-body hover:text-ink focus-ring" href={`#${entry.id}`}>
                {entry.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
)

export default GalleryNav
