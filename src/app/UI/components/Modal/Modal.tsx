import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import clsx from 'clsx'

import { IconButton } from '@/UI/components'

export type ModalProps = {
  children: React.ReactNode
  className?: string
  hideCloseButton?: boolean
  isOpen: boolean
  onClose: () => void
  title?: string
  titleClassName?: string
}

const Modal = ({
  children,
  className,
  hideCloseButton,
  isOpen,
  onClose,
  title,
  titleClassName,
}: ModalProps) => {
  return (
    <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onClose} open={isOpen}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" transition />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-8">
          <DialogPanel
            className={clsx(
              'data-[closed]:transform-[scale(95%)] duration-300 ease-out data-[closed]:opacity-0',
              'max-w-screen-lg rounded-md bg-white',
              className,
            )}
            transition
          >
            <header className="flex h-14 items-center border-b px-4 lg:h-16 lg:px-6">
              {title && (
                <DialogTitle
                  as="h4"
                  className={clsx('flex-1 text-xl font-semibold', titleClassName)}
                >
                  {title}
                </DialogTitle>
              )}

              {!hideCloseButton && (
                <CloseButton as="div">
                  <IconButton className="ml-auto" iconProps={{ icon: 'xMark' }} size="lg" />
                </CloseButton>
              )}
            </header>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
