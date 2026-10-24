import ClampedTextGallery from '@ds/patterns/ClampedText/ClampedText.gallery'
import ConfirmDialogGallery from '@ds/patterns/ConfirmDialog/ConfirmDialog.gallery'
import ContentCardGallery from '@ds/patterns/ContentCard/ContentCard.gallery'
import DataTableGallery from '@ds/patterns/DataTable/DataTable.gallery'
import DrawerGallery from '@ds/patterns/Drawer/Drawer.gallery'
import FooterActionsGallery from '@ds/patterns/FooterActions/FooterActions.gallery'
import FormCardGallery from '@ds/patterns/FormCard/FormCard.gallery'
import LoadingStateGallery from '@ds/patterns/LoadingState/LoadingState.gallery'
import QuickDateFieldGallery from '@ds/patterns/QuickDateField/QuickDateField.gallery'
import SheetGallery from '@ds/patterns/Sheet/Sheet.gallery'
import SortableItemGallery from '@ds/patterns/SortableItem/SortableItem.gallery'
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
import DateRangePickerGallery from '@ds/primitives/DateRangePicker/DateRangePicker.gallery'
import DialogGallery from '@ds/primitives/Dialog/Dialog.gallery'
import FallbackImageGallery from '@ds/primitives/FallbackImage/FallbackImage.gallery'
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
import TimeFieldGallery from '@ds/primitives/TimeField/TimeField.gallery'
import ToggleGridGallery from '@ds/primitives/ToggleGrid/ToggleGrid.gallery'
import TooltipGallery from '@ds/primitives/Tooltip/Tooltip.gallery'

import type { GalleryGroupId } from './groups'
import ColorTokens from './tokens/ColorTokens'
import RadiusTokens from './tokens/RadiusTokens'
import ShadowTokens from './tokens/ShadowTokens'
import TypeScaleTokens from './tokens/TypeScaleTokens'

export type GalleryEntry = {
  Demo: React.ComponentType
  group: GalleryGroupId
  id: string
  title: string
}

// Register every ds component here with its group (its demo lives next to it as `<Name>.gallery.tsx`);
// the page sorts and groups them
export const galleryEntries: GalleryEntry[] = [
  { Demo: ColorTokens, group: 'foundations', id: 'colors', title: 'Colours' },
  { Demo: TypeScaleTokens, group: 'foundations', id: 'typography', title: 'Typography' },
  { Demo: RadiusTokens, group: 'foundations', id: 'radii', title: 'Radii' },
  { Demo: ShadowTokens, group: 'foundations', id: 'shadows', title: 'Shadows' },
  { Demo: ButtonGallery, group: 'actions', id: 'button', title: 'Button' },
  { Demo: BadgeGallery, group: 'feedback', id: 'badge', title: 'Badge' },
  { Demo: StatusPillGallery, group: 'feedback', id: 'status-pill', title: 'StatusPill' },
  { Demo: CountBadgeGallery, group: 'feedback', id: 'count-badge', title: 'CountBadge' },
  { Demo: SkeletonGallery, group: 'feedback', id: 'skeleton', title: 'Skeleton' },
  { Demo: SpinnerGallery, group: 'feedback', id: 'spinner', title: 'Spinner' },
  {
    Demo: AvalancheLoaderGallery,
    group: 'feedback',
    id: 'avalanche-loader',
    title: 'AvalancheLoader',
  },
  { Demo: LoadingStateGallery, group: 'feedback', id: 'loading-state', title: 'LoadingState' },
  {
    Demo: ConfirmPopoverGallery,
    group: 'overlays',
    id: 'confirm-popover',
    title: 'ConfirmPopover',
  },
  { Demo: DialogGallery, group: 'overlays', id: 'dialog', title: 'Dialog' },
  { Demo: ConfirmDialogGallery, group: 'overlays', id: 'confirm-dialog', title: 'ConfirmDialog' },
  { Demo: SheetGallery, group: 'overlays', id: 'sheet', title: 'Sheet' },
  { Demo: DrawerGallery, group: 'overlays', id: 'drawer', title: 'Drawer' },
  { Demo: MenuGallery, group: 'actions', id: 'menu', title: 'Menu' },
  { Demo: IconButtonGallery, group: 'actions', id: 'icon-button', title: 'IconButton' },
  { Demo: PopoverGallery, group: 'overlays', id: 'popover', title: 'Popover' },
  { Demo: InfoTipGallery, group: 'overlays', id: 'info-tip', title: 'InfoTip' },
  { Demo: TooltipGallery, group: 'overlays', id: 'tooltip', title: 'Tooltip' },
  { Demo: FieldGallery, group: 'inputs', id: 'field', title: 'Field & inputs' },
  { Demo: StepperGallery, group: 'inputs', id: 'stepper', title: 'Stepper' },
  { Demo: DatePickerGallery, group: 'dates', id: 'date-picker', title: 'DatePicker' },
  {
    Demo: DateRangePickerGallery,
    group: 'dates',
    id: 'date-range-picker',
    title: 'DateRangePicker',
  },
  { Demo: TimeFieldGallery, group: 'dates', id: 'time-field', title: 'TimeField' },
  { Demo: CalendarGallery, group: 'dates', id: 'calendar', title: 'Calendar' },
  { Demo: CheckboxGallery, group: 'inputs', id: 'checkbox', title: 'Checkbox' },
  { Demo: SwitchGallery, group: 'inputs', id: 'switch', title: 'Switch' },
  { Demo: ChipGroupGallery, group: 'inputs', id: 'chip-group', title: 'ChipGroup' },
  { Demo: RadioGroupGallery, group: 'inputs', id: 'radio-group', title: 'RadioGroup' },
  { Demo: ToggleGridGallery, group: 'inputs', id: 'toggle-grid', title: 'ToggleGrid' },
  {
    Demo: SegmentedControlGallery,
    group: 'inputs',
    id: 'segmented-control',
    title: 'SegmentedControl',
  },
  { Demo: RatingScaleGallery, group: 'inputs', id: 'rating-scale', title: 'RatingScale' },
  { Demo: SelectGallery, group: 'inputs', id: 'select', title: 'Select' },
  { Demo: PaginationGallery, group: 'actions', id: 'pagination', title: 'Pagination' },
  { Demo: FooterActionsGallery, group: 'actions', id: 'footer-actions', title: 'FooterActions' },
  { Demo: FormCardGallery, group: 'inputs', id: 'form-card', title: 'FormCard' },
  { Demo: QuickDateFieldGallery, group: 'dates', id: 'quick-date-field', title: 'QuickDateField' },
  { Demo: ContentCardGallery, group: 'content', id: 'content-card', title: 'ContentCard' },
  { Demo: ClampedTextGallery, group: 'content', id: 'clamped-text', title: 'ClampedText' },
  {
    Demo: StickyActionBarGallery,
    group: 'actions',
    id: 'sticky-action-bar',
    title: 'StickyActionBar',
  },
  { Demo: SuccessStateGallery, group: 'feedback', id: 'success-state', title: 'SuccessState' },
  { Demo: DataTableGallery, group: 'content', id: 'data-table', title: 'DataTable' },
  { Demo: FallbackImageGallery, group: 'content', id: 'fallback-image', title: 'FallbackImage' },
  { Demo: SortableItemGallery, group: 'content', id: 'sortable-item', title: 'SortableItem' },
]
