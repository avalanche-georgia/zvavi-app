'use client'

import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-react'

import Menu from './Menu'
import MenuItem, { MenuSeparator } from './MenuItem'
import { Button } from '../Button'
import { IconButton } from '../IconButton'

const noop = () => undefined

const MenuGallery = () => (
  <div className="bg-canvas rounded-media flex items-center gap-3 p-3">
    <Menu
      trigger={
        <IconButton aria-label="More actions">
          <Ellipsis className="size-4.5" />
        </IconButton>
      }
    >
      <MenuItem icon={<Pencil />} onClick={noop}>
        Edit
      </MenuItem>
      <MenuItem icon={<Copy />} onClick={noop}>
        Duplicate
      </MenuItem>
      <MenuSeparator />
      <MenuItem icon={<Trash2 />} onClick={noop} tone="danger">
        Delete
      </MenuItem>
    </Menu>
    <Menu
      align="start"
      trigger={
        <Button size="sm" variant="secondary">
          Links, aligned start
        </Button>
      }
    >
      <MenuItem isActive render={<a href="#current" />}>
        Current page
      </MenuItem>
      <MenuItem render={<a href="#other" />}>Another page</MenuItem>
    </Menu>
  </div>
)

export default MenuGallery
