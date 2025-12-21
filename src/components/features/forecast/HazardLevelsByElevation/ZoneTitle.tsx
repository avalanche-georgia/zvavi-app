import clsx from 'clsx'

type LevelTitleProps = {
  className?: string
  elevationRange: string
  title: string
  width: string
}

const ZoneTitle = ({ className, elevationRange, title, width }: LevelTitleProps) => {
  return (
    <div className={clsx('flex flex-col items-start justify-end', className)}>
      <div className="flex w-full items-end justify-between">
        <p className="text-xs text-gray-400">{title}</p>
      </div>
      <hr className={width} />
      <p className="text-xs">{elevationRange}</p>
    </div>
  )
}

export default ZoneTitle
