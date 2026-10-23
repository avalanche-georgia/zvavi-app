import { notFound } from 'next/navigation'

import { isKnownRegion } from './regionRedirect'

// A region page's own guard, before it looks up the region's name: the [region] layout
// answers unknown slugs with a 404, but a page's metadata and body run alongside it.
// Crawlers probing /en/wp-admin, or a stray /images/… path matched as [locale]/[region],
// would otherwise hit a missing translation.
const requireKnownRegion = (regionId: string) => {
  if (!isKnownRegion(regionId)) notFound()
}

export default requireKnownRegion
