import { routes } from 'src/app/routes'

import type { NavItem } from './types'

export const navItems: NavItem[] = [
  { href: routes.admin.root, icon: 'layoutDashboard', label: 'dashboard' },
  { href: routes.admin.forecasts.root, icon: 'cloudSnow', label: 'forecasts' },
  { href: routes.admin.recentAvalanches.root, icon: 'mountainSnow', label: 'recentAvalanches' },
  { href: routes.admin.observations.root, icon: 'telescope', label: 'observations' },
  { href: routes.admin.members.root, icon: 'users', label: 'members' },
  { href: routes.admin.partners.root, icon: 'handshake', label: 'partners' },
  {
    href: routes.admin.weatherStations.root,
    icon: 'thermometerSnowflake',
    label: 'weatherStations',
  },
]

// Pinned to the bottom of the sidebar: the ds gallery (developer tooling, linked in local dev only;
// the route stays reachable by URL on every environment), who is shown on the public Team page,
// and back to the public site
export const designSystemItem: NavItem | null =
  process.env.NODE_ENV === 'development'
    ? { href: routes.admin.designSystem, icon: 'palette', label: 'designSystem' }
    : null

export const teamItem: NavItem = { href: routes.admin.team, icon: 'userRoundCheck', label: 'team' }

export const homeItem: NavItem = { href: routes.home, icon: 'home', label: 'home' }
