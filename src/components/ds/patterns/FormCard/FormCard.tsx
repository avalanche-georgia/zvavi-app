import { useId } from 'react'

import { cn } from '@/lib/utils'

type FormCardProps = {
  children: React.ReactNode
  className?: string
  // Right side of the header: a muted hint ("Optional") or a small link
  headerAside?: React.ReactNode
  isInvalid?: boolean
  required?: boolean
  title: React.ReactNode
}

// A form section: white card, H2 title with an optional aside, fields below
const FormCard = ({
  children,
  className,
  headerAside,
  isInvalid,
  required,
  title,
}: FormCardProps) => {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'rounded-card bg-surface flex scroll-mt-24 flex-col gap-5 border px-4 py-4.5 transition-colors md:px-6 md:py-5.5',
        isInvalid ? 'border-danger-border' : 'border-rule',
        className,
      )}
    >
      <header className="flex items-baseline justify-between gap-2.5">
        <h2 className="text-heading text-ink font-bold" id={titleId}>
          {title}
          {required && (
            <span aria-hidden className="text-primary">
              {' *'}
            </span>
          )}
        </h2>
        {headerAside && <div className="text-caption text-muted shrink-0">{headerAside}</div>}
      </header>
      {children}
    </section>
  )
}

export default FormCard
