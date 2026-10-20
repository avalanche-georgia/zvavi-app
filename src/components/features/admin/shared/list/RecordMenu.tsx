'use client'

import { useRef } from 'react'
import { ConfirmDialog } from '@ds/patterns'
import { IconButton, Menu, MenuItem, MenuSeparator } from '@ds/primitives'
import { Ellipsis, LoaderIcon, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import keepFocusInTable from './keepFocusInTable'
import useDeleteAfterMenuClose from './useDeleteAfterMenuClose'

type RecordMenuProps = {
  // The row's own items; Delete is added below them
  children: React.ReactNode
  deleteMessage: string
  // An action of the menu is still running (e.g. navigating to the editor)
  isBusy?: boolean
  // Accessible name of ⋯, naming the record: "More actions for forecast #180"
  label: string
  onDelete: () => Promise<void> | void
  onOpenChangeComplete?: (isOpen: boolean) => void
  // ⋯ — pass a ref when the row needs to move focus to it
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

// The ⋯ menu of a record, in its table row or on its page. Delete asks first,
// in a dialog.
const RecordMenu = ({
  children,
  deleteMessage,
  isBusy = false,
  label,
  onDelete,
  onOpenChangeComplete,
  triggerRef,
}: RecordMenuProps) => {
  const t = useTranslations()
  const ownTriggerRef = useRef<HTMLButtonElement>(null)
  const menuTriggerRef = triggerRef ?? ownTriggerRef
  const deleteConfirm = useDeleteAfterMenuClose()
  const TriggerIcon = isBusy ? LoaderIcon : Ellipsis

  const handleOpenChangeComplete = (isOpen: boolean) => {
    deleteConfirm.onMenuOpenChangeComplete(isOpen)
    onOpenChangeComplete?.(isOpen)
  }

  // In a table the row (and ⋯ with it) leaves the list — keep focus in the table
  const handleDeleteConfirm = () => {
    keepFocusInTable(menuTriggerRef.current)
    void onDelete()
  }

  const trigger = (
    <IconButton ref={menuTriggerRef} aria-label={label} tooltip={t('admin.shared.actions.more')}>
      <TriggerIcon className={isBusy ? 'size-4.5 animate-spin' : 'size-4.5'} />
    </IconButton>
  )

  return (
    <>
      <Menu onOpenChangeComplete={handleOpenChangeComplete} trigger={trigger}>
        {children}
        <MenuSeparator />
        <MenuItem icon={<Trash2 />} onClick={deleteConfirm.onDeleteRequest} tone="danger">
          {t('common.actions.delete')}
        </MenuItem>
      </Menu>

      <ConfirmDialog
        cancelLabel={t('common.actions.cancel')}
        confirmLabel={t('common.actions.delete')}
        isOpen={deleteConfirm.isConfirmOpen}
        onConfirm={handleDeleteConfirm}
        onOpenChange={deleteConfirm.onConfirmOpenChange}
        title={deleteMessage}
        tone="danger"
      />
    </>
  )
}

export default RecordMenu
