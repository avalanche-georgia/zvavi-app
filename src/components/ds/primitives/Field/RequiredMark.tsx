// The asterisk is visual only. Controls that take `required` (text inputs) announce
// it themselves; groups and cards can't, so they pass `srText` ("Required") instead.
const RequiredMark = ({ srText }: { srText?: string }) => (
  <>
    <span aria-hidden className="text-primary">
      {' *'}
    </span>
    {srText && <span className="sr-only">{` (${srText})`}</span>}
  </>
)

export default RequiredMark
