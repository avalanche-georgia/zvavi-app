import { MarkdownContent } from '@components/shared'

import { cn } from '@/lib/utils'

type ProseProps = {
  className?: string
  content: string
}

// Forecaster-written markdown (bold, italic, line breaks) as running text
const Prose = ({ className, content }: ProseProps) => (
  <div className={cn('text-ink flex flex-col gap-2 text-pretty', className)}>
    <MarkdownContent content={content} />
  </div>
)

export default Prose
