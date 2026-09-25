import { MapPin } from 'lucide-react'

import Button, { type ButtonSize, type ButtonVariant } from './Button'

const variants: ButtonVariant[] = ['primary', 'secondary', 'overlay', 'text']
const sizes: ButtonSize[] = ['lg', 'md', 'sm']

const ButtonGallery = () => (
  <div className="flex flex-col gap-5">
    {variants.map((variant) => (
      <div key={variant} className="bg-canvas rounded-media flex flex-wrap items-center gap-3 p-3">
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
