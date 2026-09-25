import ColorTokens from './tokens/ColorTokens'
import RadiusTokens from './tokens/RadiusTokens'
import ShadowTokens from './tokens/ShadowTokens'
import TypeScaleTokens from './tokens/TypeScaleTokens'

export type GalleryEntry = {
  Demo: React.ComponentType
  id: string
  title: string
}

// Register every ds component here (its demo lives next to it as `<Name>.gallery.tsx`)
export const galleryEntries: GalleryEntry[] = [
  { Demo: ColorTokens, id: 'colors', title: 'Colours' },
  { Demo: TypeScaleTokens, id: 'typography', title: 'Typography' },
  { Demo: RadiusTokens, id: 'radii', title: 'Radii' },
  { Demo: ShadowTokens, id: 'shadows', title: 'Shadows' },
]
