import clsx from 'clsx'

type RegionBadgeProps = {
  regionName: string
  colorClass: string
  isExtremeRisk: boolean
}

const RegionBadge = ({ colorClass, isExtremeRisk, regionName }: RegionBadgeProps) => (
  <span
    className={clsx(
      'absolute -top-2.5 left-3 rounded-full px-4 py-1 text-xs font-semibold md:text-sm',
      'z-10 border-x border-b-2',
      isExtremeRisk
        ? 'border-white/20 text-white shadow shadow-white/20'
        : 'border-black/10 shadow-md',
      colorClass,
    )}
  >
    {regionName}
  </span>
)

export default RegionBadge
