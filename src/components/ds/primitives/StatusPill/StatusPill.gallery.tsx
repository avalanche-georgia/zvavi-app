import StatusPill from './StatusPill'

const StatusPillGallery = () => (
  <div className="flex flex-wrap items-center gap-3">
    <StatusPill tone="success" withDot>
      Current
    </StatusPill>
    <StatusPill tone="success">Active</StatusPill>
    <StatusPill tone="warning">Draft</StatusPill>
    <StatusPill tone="accent">Pending</StatusPill>
    <StatusPill tone="danger">Expired</StatusPill>
    <StatusPill>Published</StatusPill>
  </div>
)

export default StatusPillGallery
