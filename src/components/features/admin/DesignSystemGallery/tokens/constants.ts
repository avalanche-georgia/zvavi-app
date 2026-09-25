import type { FontSizeToken, RadiusToken, ShadowToken } from '@/lib/designTokens'

type ColorGroup = {
  title: string
  tokens: string[]
}

// Full class strings, so Tailwind generates them; typed maps force an entry per token
export const colorSwatchClasses: Record<string, string> = {
  accent: 'bg-accent',
  'accent-hover': 'bg-accent-hover',
  'accent-soft': 'bg-accent-soft',
  body: 'bg-body',
  'brand-blue': 'bg-brand-blue',
  canvas: 'bg-canvas',
  danger: 'bg-danger',
  'danger-border': 'bg-danger-border',
  disabled: 'bg-disabled',
  ink: 'bg-ink',
  map: 'bg-map',
  muted: 'bg-muted',
  off: 'bg-off',
  placeholder: 'bg-placeholder',
  primary: 'bg-primary',
  'primary-hover': 'bg-primary-hover',
  'primary-ink': 'bg-primary-ink',
  'primary-soft': 'bg-primary-soft',
  rule: 'bg-rule',
  'rule-strong': 'bg-rule-strong',
  success: 'bg-success',
  'success-soft': 'bg-success-soft',
  surface: 'bg-surface',
  tile: 'bg-tile',
  'tile-hover': 'bg-tile-hover',
}

export const colorGroups: ColorGroup[] = [
  { title: 'Text', tokens: ['ink', 'body', 'muted', 'placeholder', 'disabled'] },
  { title: 'Lines', tokens: ['rule', 'rule-strong'] },
  { title: 'Surfaces', tokens: ['surface', 'canvas', 'tile', 'tile-hover', 'off', 'map'] },
  {
    title: 'Brand',
    tokens: ['primary', 'primary-hover', 'primary-soft', 'primary-ink', 'brand-blue'],
  },
  { title: 'Accent', tokens: ['accent', 'accent-hover', 'accent-soft'] },
  { title: 'Status', tokens: ['danger', 'danger-border', 'success', 'success-soft'] },
]

export const fontSizeClasses: Record<FontSizeToken, string> = {
  caption: 'text-caption',
  copy: 'text-copy',
  'copy-lg': 'text-copy-lg',
  'copy-sm': 'text-copy-sm',
  heading: 'text-heading',
  micro: 'text-micro',
  title: 'text-title',
  'title-lg': 'text-title-lg',
}

export const radiusClasses: Record<RadiusToken, string> = {
  badge: 'rounded-badge',
  card: 'rounded-card',
  control: 'rounded-control',
  field: 'rounded-field',
  media: 'rounded-media',
}

export const shadowClasses: Record<ShadowToken, string> = {
  float: 'shadow-float',
  overlay: 'shadow-overlay',
  pin: 'shadow-pin',
  raised: 'shadow-raised',
}
