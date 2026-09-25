// Visual only — the control itself carries `required` / `aria-required`
const RequiredMark = () => (
  <span aria-hidden className="text-primary">
    {' *'}
  </span>
)

export default RequiredMark
