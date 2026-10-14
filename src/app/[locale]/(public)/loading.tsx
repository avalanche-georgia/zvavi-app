import { Loading } from '@components/shared'

// Shown right away while a page's server data loads — the header and footer
// stay, so a click responds instantly instead of freezing on the old page
const PublicLoading = () => (
  <div className="flex flex-1 items-center justify-center">
    <Loading isPage />
  </div>
)

export default PublicLoading
