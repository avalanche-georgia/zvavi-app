import { Spinner } from '@components/ui'

// Shown right away while a page's server data loads — the header and footer
// stay, so a click responds instantly instead of freezing on the old page
const PublicLoading = () => (
  <div className="flex flex-1 items-center justify-center py-24">
    <Spinner size="lg" />
  </div>
)

export default PublicLoading
