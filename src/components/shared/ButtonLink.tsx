'use client'

import { Icon } from '@components/icons'
import { type ButtonVariant, buttonVariantStyles } from '@components/ui/Button'
import clsx from 'clsx'
import { Link, type LinkProps } from 'src/i18n/navigation'

type ButtonLinkCommonProps = {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
}

type ButtonLinkProps =
  | (ButtonLinkCommonProps & { isExternal?: false } & LinkProps)
  | (ButtonLinkCommonProps & { isExternal: true } & React.AnchorHTMLAttributes<HTMLAnchorElement>)

const baseStyles = [
  'flex max-w-max items-center gap-1 rounded-sm px-3 py-1.5 text-sm transition-colors',
  'focus:outline-hidden data-active:translate-y-px',
  'data-disabled:cursor-not-allowed',
  'data-focus:outline-1',
]

const ButtonLink = ({
  children,
  className,
  isExternal = false,
  variant = 'primary',
  ...linkProps
}: ButtonLinkProps) => {
  const classes = clsx(baseStyles, buttonVariantStyles[variant], className)

  if (isExternal) {
    return (
      <a className={classes} {...(linkProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span>{children}</span>
        <Icon icon="externalLink" size="sm" />
      </a>
    )
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link className={classes} {...(linkProps as LinkProps)}>
      {children}
    </Link>
  )
}

export default ButtonLink
