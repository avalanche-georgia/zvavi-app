import { MapPin } from 'lucide-react'

import Button, { type ButtonSize, type ButtonVariant } from './Button'

import { cn } from '@/lib/utils'

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'danger',
  'overlay',
  'text',
  'disclosure',
  'inverse',
]
const sizes: ButtonSize[] = ['lg', 'md', 'sm']

const ButtonGallery = () => (
  <div className="flex flex-col gap-5">
    {variants.map((variant) => (
      <div
        key={variant}
        className={cn(
          'rounded-media flex flex-wrap items-center gap-3 p-3',
          // inverse sits on dark surfaces
          variant === 'inverse' ? 'bg-ink' : 'bg-canvas',
        )}
      >
        <code className="text-caption text-muted w-20">{variant}</code>
        {sizes.map((size) => (
          <Button key={size} size={size} variant={variant}>
            {size}
          </Button>
        ))}
        <Button variant={variant}>
          <MapPin aria-hidden className="size-4" />
          With icon
        </Button>
        <Button disabled variant={variant}>
          Disabled
        </Button>
        <Button isBusy variant={variant}>
          Busy
        </Button>
      </div>
    ))}
  </div>
)

export default ButtonGallery
