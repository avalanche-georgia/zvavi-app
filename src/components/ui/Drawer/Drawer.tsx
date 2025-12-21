'use client'

import { IconButton } from '@components/shared'
import { Drawer } from 'vaul'

type VaulDrawerProps = {
  children: React.ReactNode
  content: React.ReactNode
  title: string
}

const VaulDrawer = ({ children, content, title }: VaulDrawerProps) => (
  <Drawer.Root>
    <Drawer.Trigger asChild>{children}</Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-black/30" />
      <Drawer.Content className="fixed inset-x-0 bottom-0 mx-auto flex max-h-[calc(100dvh-72px)] max-w-screen-md flex-col rounded-t-2xl bg-white outline-none">
        <Drawer.Title asChild>
          <header className="flex h-14 items-center border-b px-4">
            <h3 className="flex-1 text-xl font-semibold">{title}</h3>
            <Drawer.Close asChild>
              <IconButton className="ml-auto" iconProps={{ icon: 'xMark' }} />
            </Drawer.Close>
          </header>
        </Drawer.Title>
        <Drawer.Description asChild>
          <div className="flex-1 overflow-y-auto p-4">{content}</div>
        </Drawer.Description>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
)

export default VaulDrawer
