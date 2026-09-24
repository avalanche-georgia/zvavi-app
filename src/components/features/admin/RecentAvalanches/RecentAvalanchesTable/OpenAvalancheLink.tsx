import { Link } from 'src/i18n/navigation'

import type { AvalancheSheetMode } from '../AvalancheSheet'

import { routes } from '@/routes'

type OpenAvalancheLinkProps = {
  children: React.ReactNode
  id: number
  onOpen: (id: number, mode?: AvalancheSheetMode) => void
}

// Opens the record in the side panel; a modified click (new tab / window)
// still follows the link to the full page
const OpenAvalancheLink = ({ children, id, onOpen }: OpenAvalancheLinkProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return

    event.preventDefault()
    onOpen(id)
  }

  return (
    <Link
      className="text-sm font-medium hover:underline"
      href={routes.admin.recentAvalanches.view(id)}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

export default OpenAvalancheLink
