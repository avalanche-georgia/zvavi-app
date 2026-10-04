import { cn } from '@/lib/utils'

type SheetNoteProps = {
  children: React.ReactNode
  tone: 'info' | 'success'
}

// Banner at the top of an avalanche panel opened from the forecast form
const SheetNote = ({ children, tone }: SheetNoteProps) => (
  <p
    className={cn(
      'text-copy-sm mx-4 mt-4 rounded-xl px-3.5 py-3',
      tone === 'success' ? 'bg-success-soft text-success' : 'bg-accent-soft text-accent-hover',
    )}
  >
    {children}
  </p>
)

export default SheetNote
