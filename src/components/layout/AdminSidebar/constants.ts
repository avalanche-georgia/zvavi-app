import { routes } from 'src/app/routes'

import type { NavItem } from './types'

export const navItems: NavItem[] = [
  { href: routes.admin.forecasts.root, icon: 'cloudSnow', label: 'forecasts' },
  { href: routes.admin.members.root, icon: 'users', label: 'members' },
]
