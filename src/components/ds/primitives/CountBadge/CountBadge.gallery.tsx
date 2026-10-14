import CountBadge from './CountBadge'

const CountBadgeGallery = () => (
  <div className="flex items-center gap-3">
    <CountBadge count={4} />
    <CountBadge count={27} />
    <CountBadge count={128} />
  </div>
)

export default CountBadgeGallery
