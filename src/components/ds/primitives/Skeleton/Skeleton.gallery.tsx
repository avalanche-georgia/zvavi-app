import Skeleton from './Skeleton'

const SkeletonGallery = () => (
  <div className="flex max-w-sm items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3.5" />
    </div>
  </div>
)

export default SkeletonGallery
