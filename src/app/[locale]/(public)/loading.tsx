import { Loading } from '@components/shared'

// Shown right away while a page's server data loads — the header and footer
// stay, so a click responds instantly instead of freezing on the old page.
// A screen tall, so the footer starts below the fold and the page streaming
// in doesn't shove it down (a layout shift)
const PublicLoading = () => (
  <div className="flex min-h-dvh flex-1 items-center justify-center">
    <Loading isPage />
  </div>
)

export default PublicLoading
