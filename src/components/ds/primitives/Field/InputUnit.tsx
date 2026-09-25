// Unit suffix inside a text-like control ("cm", "m"); the control needs `pr-10`
const InputUnit = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden
    className="text-copy text-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
  >
    {children}
  </span>
)

export default InputUnit
