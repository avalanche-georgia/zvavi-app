import AvalancheLoader from './AvalancheLoader'

const AvalancheLoaderGallery = () => (
  <div className="flex flex-wrap items-end gap-8">
    <AvalancheLoader label="Loading" size="sm" />
    <AvalancheLoader label="Loading" />
    <AvalancheLoader label="Loading" size="lg" />
  </div>
)

export default AvalancheLoaderGallery
