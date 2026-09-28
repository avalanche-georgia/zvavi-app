import { useId } from 'react'

import { cn } from '@/lib/utils'

type FormCardProps = {
  // Buttons on the right of the header; they wrap under the title on narrow cards
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
  // Muted line under the title
  description?: React.ReactNode
  // Card-level error (e.g. "Drop a pin"): red border + message linked to the section
  error?: string
  // Right side of the header: a muted hint ("Optional") or a small link
  headerAside?: React.ReactNode
  required?: boolean
  // Announced after the title when `required` (a translated "Required")
  requiredText?: string
  // Anchor target, e.g. for an in-page section nav
  sectionId?: string
  title: React.ReactNode
  // Small tag right after the title, e.g. "This forecast only"
  titleTag?: React.ReactNode
}

// A form section: white card, H2 title with an optional aside, fields below
const FormCard = ({
  actions,
  children,
  className,
  description,
  error,
  headerAside,
  required,
  requiredText,
  sectionId,
  title,
  titleTag,
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
      id={sectionId}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2.5">
            <h2
              className="text-heading text-ink flex flex-wrap items-center gap-2 font-bold"
              id={titleId}
            >
              <span>
                {title}
                {required && (
                  <>
                    <span aria-hidden className="text-primary">
                      {' *'}
                    </span>
                    {requiredText && <span className="sr-only">{` (${requiredText})`}</span>}
                  </>
                )}
              </span>
              {titleTag}
            </h2>
            {headerAside && <div className="text-caption text-muted shrink-0">{headerAside}</div>}
          </div>
          {description && <p className="text-copy-sm text-muted">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
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
