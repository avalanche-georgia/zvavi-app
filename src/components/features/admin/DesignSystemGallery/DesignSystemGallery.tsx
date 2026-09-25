import { galleryEntries } from './entries'
import GalleryNav from './GalleryNav'
import GallerySection from './GallerySection'

// Internal, developer-facing catalogue of ds tokens and components (English only by design)
const DesignSystemGallery = () => (
  <div className="bg-canvas mx-auto flex max-w-5xl flex-col gap-4 p-4 md:p-6">
    <header className="flex flex-col gap-3">
      <h1 className="text-title md:text-title-lg text-ink font-bold">Design system</h1>
      <p className="text-copy-sm text-muted">
        Tokens and components of the ds kit. See DESIGN_SYSTEM.md for the rules.
      </p>
      <GalleryNav entries={galleryEntries} />
    </header>
    {galleryEntries.map(({ Demo, id, title }) => (
      <GallerySection key={id} id={id} title={title}>
        <Demo />
      </GallerySection>
    ))}
  </div>
)

export default DesignSystemGallery
