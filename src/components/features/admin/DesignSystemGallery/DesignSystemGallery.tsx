import { galleryEntries } from './entries'
import GalleryNav from './GalleryNav'
import GallerySection from './GallerySection'
import { groupGalleryEntries } from './groups'

const galleryGroups = groupGalleryEntries(galleryEntries)

// Internal, developer-facing catalogue of ds tokens and components (English only by design)
const DesignSystemGallery = () => (
  <div className="bg-canvas mx-auto flex max-w-6xl flex-col gap-6 p-4 md:p-6">
    <header className="flex flex-col gap-3">
      <h1 className="text-title md:text-title-lg text-ink font-bold">Design system</h1>
      <p className="text-copy-sm text-muted">
        Tokens and components of the ds kit. See DESIGN_SYSTEM.md for the rules.
      </p>
    </header>
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Sticky inside the admin main scroller; 3.5rem is the admin header (h-14) */}
      <aside className="md:sticky md:top-0 md:max-h-[calc(100svh-3.5rem)] md:w-48 md:shrink-0 md:self-start md:overflow-y-auto md:py-4">
        <GalleryNav groups={galleryGroups} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        {galleryGroups.map(({ entries, id, title }) => (
          <div key={id} className="flex scroll-mt-4 flex-col gap-4" id={id}>
            <h2 className="text-title text-ink font-bold">{title}</h2>
            {entries.map(({ Demo, id: entryId, title: entryTitle }) => (
              <GallerySection key={entryId} id={entryId} title={entryTitle}>
                <Demo />
              </GallerySection>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default DesignSystemGallery
