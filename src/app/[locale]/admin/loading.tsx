import { Loading } from '@components/shared'

// Shown right away while a page's server data loads — the sidebar and header
// stay, so a click responds instantly instead of freezing on the old page
const AdminLoading = () => <Loading isPage />

export default AdminLoading
