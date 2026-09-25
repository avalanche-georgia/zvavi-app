import { useId } from 'react'

import { cn } from '@/lib/utils'

type FormCardProps = {
  children: React.ReactNode
  className?: string
  // Card-level error (e.g. "Drop a pin"): red border + message linked to the section
  error?: string
  // Right side of the header: a muted hint ("Optional") or a small link
  headerAside?: React.ReactNode
  required?: boolean
  // Announced after the title when `required` (a translated "Required")
  requiredText?: string
  title: React.ReactNode
}

// A form section: white card, H2 title with an optional aside, fields below
const FormCard = ({
  children,
  className,
  error,
  headerAside,
  required,
  requiredText,
  title,
}: FormCardProps) => {
  const id = useId()
  const titleId = `${id}-title`
  const errorId = `${id}-error`

  return (
    <section
      aria-describedby={error ? errorId : undefined}
      aria-labelledby={titleId}
      className={cn(
        'rounded-card bg-surface flex scroll-mt-24 flex-col gap-5 border px-4 py-4.5 transition-colors md:px-6 md:py-5.5',
        error ? 'border-danger-border' : 'border-rule',
        className,
      )}
    >
      <header className="flex items-baseline justify-between gap-2.5">
        <h2 className="text-heading text-ink font-bold" id={titleId}>
          {title}
          {required && (
            <>
              <span aria-hidden className="text-primary">
                {' *'}
              </span>
              {requiredText && <span className="sr-only">{` (${requiredText})`}</span>}
            </>
          )}
        </h2>
        {headerAside && <div className="text-caption text-muted shrink-0">{headerAside}</div>}
      </header>
      {children}
      {/* A direct child of the section: scroll-to-first-error brings the whole card into view */}
      {error && (
        <p className="text-copy-sm text-danger" data-field-error id={errorId}>
          {error}
        </p>
      )}
    </section>
  )
}

export default FormCard
