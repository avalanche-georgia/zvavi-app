'use client'

import { useToast } from '@components/hooks'

import ConfirmDialogDemo from './ConfirmDialogDemo'
import { DialogList } from '../../primitives'

const wait = (isFailing: boolean) =>
  new Promise((resolve, reject) => setTimeout(isFailing ? reject : resolve, 1500))

const moreLabel = (count: number) => `+${count} more`

const forecasts = [60, 58, 57, 55, 51, 49, 44].map((id) => (
  <>
    <a className="text-accent font-semibold hover:underline" href="#confirm-dialog">
      Forecast #{id}
    </a>
    <span className="text-copy-sm text-muted"> · 24 Sep 2026</span>
  </>
))

const ConfirmDialogGallery = () => {
  const { toastError } = useToast()

  // As a real caller does: says why, and rethrows so the dialog stays open
  const handleFailingConfirm = async () => {
    try {
      await wait(true)
    } catch (error) {
      toastError('ConfirmDialogGallery', { error })
      throw error
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <ConfirmDialogDemo
        confirmLabel="Delete"
        label="danger + list"
        title="Delete A-0224"
        tone="danger"
      >
        <p>The record is deleted permanently. This can’t be undone.</p>
        <p>
          Linked to <b className="font-semibold">7 forecasts</b>. They stay, without this avalanche:
        </p>
        <DialogList items={forecasts} moreLabel={moreLabel} />
      </ConfirmDialogDemo>
      <ConfirmDialogDemo
        confirmLabel="Discard"
        label="warning"
        title="Discard unsaved changes?"
        tone="warning"
      >
        <p>Your unsaved changes will be lost.</p>
      </ConfirmDialogDemo>
      <ConfirmDialogDemo
        confirmLabel="Publish"
        label="info"
        title="Publish forecast #61"
        tone="info"
      >
        <p>It goes live on the website and in partner apps right away.</p>
      </ConfirmDialogDemo>
      <ConfirmDialogDemo
        confirmLabel="Delete"
        label="pending, succeeds"
        onConfirm={() => wait(false)}
        pendingLabel="Deleting…"
        title="Delete forecast #180"
        tone="danger"
      >
        <p>The forecast is deleted permanently. This can’t be undone.</p>
      </ConfirmDialogDemo>
      <ConfirmDialogDemo
        confirmLabel="Delete"
        label="pending, fails"
        onConfirm={handleFailingConfirm}
        pendingLabel="Deleting…"
        title="Delete forecast #180"
        tone="danger"
      >
        <p>The forecast is deleted permanently. This can’t be undone.</p>
      </ConfirmDialogDemo>
      <ConfirmDialogDemo confirmLabel="Confirm" label="no body" title="Are you sure?" tone="info" />
    </div>
  )
}

export default ConfirmDialogGallery
