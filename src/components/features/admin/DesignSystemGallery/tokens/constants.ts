import type { FontSizeToken, RadiusToken, ShadowToken, TrackingToken } from '@/lib/designTokens'

type ColorGroup = {
  title: string
  tokens: string[]
}

// Full class strings, so Tailwind generates them; typed maps force an entry per token
export const colorSwatchClasses: Record<string, string> = {
  accent: 'bg-accent',
  'accent-hover': 'bg-accent-hover',
  'accent-soft': 'bg-accent-soft',
  'alert-ink': 'bg-alert-ink',
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
  scrim: 'bg-scrim',
  success: 'bg-success',
  'success-soft': 'bg-success-soft',
  surface: 'bg-surface',
  tile: 'bg-tile',
  'tile-hover': 'bg-tile-hover',
  warning: 'bg-warning',
  'warning-soft': 'bg-warning-soft',
}

export const colorGroups: ColorGroup[] = [
  { title: 'Text', tokens: ['ink', 'body', 'muted', 'placeholder', 'disabled'] },
  { title: 'Lines', tokens: ['rule', 'rule-strong'] },
  { title: 'Surfaces', tokens: ['surface', 'canvas', 'tile', 'tile-hover', 'off', 'map', 'scrim'] },
  {
    title: 'Brand',
    tokens: ['primary', 'primary-hover', 'primary-soft', 'primary-ink', 'brand-blue'],
  },
  { title: 'Accent', tokens: ['accent', 'accent-hover', 'accent-soft'] },
  {
    title: 'Status',
    tokens: [
      'danger',
      'danger-border',
      'success',
      'success-soft',
      'warning',
      'warning-soft',
      'alert-ink',
    ],
  },
]

export const fontSizeClasses: Record<FontSizeToken, string> = {
  caption: 'text-caption',
  copy: 'text-copy',
  'copy-lg': 'text-copy-lg',
  'copy-sm': 'text-copy-sm',
  display: 'text-display',
  heading: 'text-heading',
  micro: 'text-micro',
  title: 'text-title',
  'title-lg': 'text-title-lg',
  'title-sm': 'text-title-sm',
}

export const radiusClasses: Record<RadiusToken, string> = {
  badge: 'rounded-badge',
  bar: 'rounded-bar',
  card: 'rounded-card',
  control: 'rounded-control',
  field: 'rounded-field',
  item: 'rounded-item',
  media: 'rounded-media',
  sheet: 'rounded-sheet',
}

export const shadowClasses: Record<ShadowToken, string> = {
  float: 'shadow-float',
  marker: 'shadow-marker',
  'marker-cluster': 'shadow-marker-cluster',
  'marker-selected': 'shadow-marker-selected',
  menu: 'shadow-menu',
  overlay: 'shadow-overlay',
  panel: 'shadow-panel',
  pin: 'shadow-pin',
  raised: 'shadow-raised',
  sheet: 'shadow-sheet',
}

export const trackingClasses: Record<TrackingToken, string> = {
  eyebrow: 'tracking-eyebrow',
}
