import FormCardGallery from '@ds/patterns/FormCard/FormCard.gallery'
import StickyActionBarGallery from '@ds/patterns/StickyActionBar/StickyActionBar.gallery'
import SuccessStateGallery from '@ds/patterns/SuccessState/SuccessState.gallery'
import BadgeGallery from '@ds/primitives/Badge/Badge.gallery'
import ButtonGallery from '@ds/primitives/Button/Button.gallery'
import ChipGroupGallery from '@ds/primitives/ChipGroup/ChipGroup.gallery'
import FieldGallery from '@ds/primitives/Field/Field.gallery'
import InfoTipGallery from '@ds/primitives/InfoTip/InfoTip.gallery'
import SegmentedControlGallery from '@ds/primitives/SegmentedControl/SegmentedControl.gallery'
import StepperGallery from '@ds/primitives/Stepper/Stepper.gallery'
import ToggleGridGallery from '@ds/primitives/ToggleGrid/ToggleGrid.gallery'

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
  { Demo: ButtonGallery, id: 'button', title: 'Button' },
  { Demo: BadgeGallery, id: 'badge', title: 'Badge' },
  { Demo: InfoTipGallery, id: 'info-tip', title: 'InfoTip' },
  { Demo: FieldGallery, id: 'field', title: 'Field & inputs' },
  { Demo: StepperGallery, id: 'stepper', title: 'Stepper' },
  { Demo: ChipGroupGallery, id: 'chip-group', title: 'ChipGroup' },
  { Demo: ToggleGridGallery, id: 'toggle-grid', title: 'ToggleGrid' },
  { Demo: SegmentedControlGallery, id: 'segmented-control', title: 'SegmentedControl' },
  { Demo: FormCardGallery, id: 'form-card', title: 'FormCard' },
  { Demo: StickyActionBarGallery, id: 'sticky-action-bar', title: 'StickyActionBar' },
  { Demo: SuccessStateGallery, id: 'success-state', title: 'SuccessState' },
]
