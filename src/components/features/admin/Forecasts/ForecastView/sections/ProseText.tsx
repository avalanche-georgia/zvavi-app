import { MarkdownContent } from '@components/shared'

import { cn } from '@/lib/utils'

type ProseTextProps = {
  className?: string
  placeholder: string
  text: string | null
}

// Saved markdown as the public page renders it, or a muted placeholder when empty
const ProseText = ({ className, placeholder, text }: ProseTextProps) => {
  if (!text?.trim()) return <p className="text-copy text-placeholder italic">{placeholder}</p>

  return (
    <div className={cn('text-body flex flex-col gap-2 text-pretty', className)}>
      <MarkdownContent content={text} />
    </div>
  )
}

export default ProseText
