import { cn } from '@/lib/utils'

type SheetIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

// 40px square icon button for sheet headers (close, prev/next)
const SheetIconButton = ({ className, type = 'button', ...props }: SheetIconButtonProps) => (
  <button
    {...props}
    className={cn(
      'grid size-10 shrink-0 place-items-center rounded-[10px] transition-colors',
      'hover:bg-tile focus-visible:outline-accent focus-visible:outline-2',
      'disabled:cursor-default disabled:bg-transparent disabled:opacity-30',
      className,
    )}
    type={type}
  />
)

export default SheetIconButton
