type ModalFooterProps = {
  children: React.ReactNode
}

const ModalFooter = ({ children }: ModalFooterProps) => (
  <footer className="flex justify-end gap-2 border-t px-4 py-2 lg:gap-4 lg:px-6 lg:py-4">
    {children}
  </footer>
)

export default ModalFooter
