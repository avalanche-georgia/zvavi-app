import { Spinner } from '@components/ui'

// Shown right away while a page's server data loads — the sidebar and header
// stay, so a click responds instantly instead of freezing on the old page
const AdminLoading = () => (
  <div className="flex h-full items-center justify-center py-24">
    <Spinner size="lg" />
  </div>
)

export default AdminLoading
