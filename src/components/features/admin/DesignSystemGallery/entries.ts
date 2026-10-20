import ClampedTextGallery from '@ds/patterns/ClampedText/ClampedText.gallery'
import ConfirmDialogGallery from '@ds/patterns/ConfirmDialog/ConfirmDialog.gallery'
import ContentCardGallery from '@ds/patterns/ContentCard/ContentCard.gallery'
import DataTableGallery from '@ds/patterns/DataTable/DataTable.gallery'
import DrawerGallery from '@ds/patterns/Drawer/Drawer.gallery'
import FooterActionsGallery from '@ds/patterns/FooterActions/FooterActions.gallery'
import FormCardGallery from '@ds/patterns/FormCard/FormCard.gallery'
import LoadingStateGallery from '@ds/patterns/LoadingState/LoadingState.gallery'
import SheetGallery from '@ds/patterns/Sheet/Sheet.gallery'
import StickyActionBarGallery from '@ds/patterns/StickyActionBar/StickyActionBar.gallery'
import SuccessStateGallery from '@ds/patterns/SuccessState/SuccessState.gallery'
import AvalancheLoaderGallery from '@ds/primitives/AvalancheLoader/AvalancheLoader.gallery'
import BadgeGallery from '@ds/primitives/Badge/Badge.gallery'
import ButtonGallery from '@ds/primitives/Button/Button.gallery'
import CalendarGallery from '@ds/primitives/Calendar/Calendar.gallery'
import CheckboxGallery from '@ds/primitives/Checkbox/Checkbox.gallery'
import ChipGroupGallery from '@ds/primitives/ChipGroup/ChipGroup.gallery'
import ConfirmPopoverGallery from '@ds/primitives/ConfirmPopover/ConfirmPopover.gallery'
import CountBadgeGallery from '@ds/primitives/CountBadge/CountBadge.gallery'
import DatePickerGallery from '@ds/primitives/DatePicker/DatePicker.gallery'
import FieldGallery from '@ds/primitives/Field/Field.gallery'
import IconButtonGallery from '@ds/primitives/IconButton/IconButton.gallery'
import InfoTipGallery from '@ds/primitives/InfoTip/InfoTip.gallery'
import MenuGallery from '@ds/primitives/Menu/Menu.gallery'
import PaginationGallery from '@ds/primitives/Pagination/Pagination.gallery'
import PopoverGallery from '@ds/primitives/Popover/Popover.gallery'
import RadioGroupGallery from '@ds/primitives/RadioGroup/RadioGroup.gallery'
import RatingScaleGallery from '@ds/primitives/RatingScale/RatingScale.gallery'
import SegmentedControlGallery from '@ds/primitives/SegmentedControl/SegmentedControl.gallery'
import SelectGallery from '@ds/primitives/Select/Select.gallery'
import SkeletonGallery from '@ds/primitives/Skeleton/Skeleton.gallery'
import SpinnerGallery from '@ds/primitives/Spinner/Spinner.gallery'
import StatusPillGallery from '@ds/primitives/StatusPill/StatusPill.gallery'
import StepperGallery from '@ds/primitives/Stepper/Stepper.gallery'
import SwitchGallery from '@ds/primitives/Switch/Switch.gallery'
import ToggleGridGallery from '@ds/primitives/ToggleGrid/ToggleGrid.gallery'
import TooltipGallery from '@ds/primitives/Tooltip/Tooltip.gallery'

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
  { Demo: StatusPillGallery, id: 'status-pill', title: 'StatusPill' },
  { Demo: CountBadgeGallery, id: 'count-badge', title: 'CountBadge' },
  { Demo: SkeletonGallery, id: 'skeleton', title: 'Skeleton' },
  { Demo: SpinnerGallery, id: 'spinner', title: 'Spinner' },
  { Demo: AvalancheLoaderGallery, id: 'avalanche-loader', title: 'AvalancheLoader' },
  { Demo: LoadingStateGallery, id: 'loading-state', title: 'LoadingState' },
  { Demo: ConfirmPopoverGallery, id: 'confirm-popover', title: 'ConfirmPopover' },
  { Demo: ConfirmDialogGallery, id: 'confirm-dialog', title: 'ConfirmDialog' },
  { Demo: SheetGallery, id: 'sheet', title: 'Sheet' },
  { Demo: DrawerGallery, id: 'drawer', title: 'Drawer' },
  { Demo: MenuGallery, id: 'menu', title: 'Menu' },
  { Demo: IconButtonGallery, id: 'icon-button', title: 'IconButton' },
  { Demo: PopoverGallery, id: 'popover', title: 'Popover' },
  { Demo: InfoTipGallery, id: 'info-tip', title: 'InfoTip' },
  { Demo: TooltipGallery, id: 'tooltip', title: 'Tooltip' },
  { Demo: FieldGallery, id: 'field', title: 'Field & inputs' },
  { Demo: StepperGallery, id: 'stepper', title: 'Stepper' },
  { Demo: DatePickerGallery, id: 'date-picker', title: 'DatePicker' },
  { Demo: CalendarGallery, id: 'calendar', title: 'Calendar' },
  { Demo: CheckboxGallery, id: 'checkbox', title: 'Checkbox' },
  { Demo: SwitchGallery, id: 'switch', title: 'Switch' },
  { Demo: ChipGroupGallery, id: 'chip-group', title: 'ChipGroup' },
  { Demo: RadioGroupGallery, id: 'radio-group', title: 'RadioGroup' },
  { Demo: ToggleGridGallery, id: 'toggle-grid', title: 'ToggleGrid' },
  { Demo: SegmentedControlGallery, id: 'segmented-control', title: 'SegmentedControl' },
  { Demo: RatingScaleGallery, id: 'rating-scale', title: 'RatingScale' },
  { Demo: SelectGallery, id: 'select', title: 'Select' },
  { Demo: PaginationGallery, id: 'pagination', title: 'Pagination' },
  { Demo: FooterActionsGallery, id: 'footer-actions', title: 'FooterActions' },
  { Demo: FormCardGallery, id: 'form-card', title: 'FormCard' },
  { Demo: ContentCardGallery, id: 'content-card', title: 'ContentCard' },
  { Demo: ClampedTextGallery, id: 'clamped-text', title: 'ClampedText' },
  { Demo: StickyActionBarGallery, id: 'sticky-action-bar', title: 'StickyActionBar' },
  { Demo: SuccessStateGallery, id: 'success-state', title: 'SuccessState' },
  { Demo: DataTableGallery, id: 'data-table', title: 'DataTable' },
]
