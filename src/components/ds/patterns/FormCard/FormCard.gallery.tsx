import FormCard from './FormCard'

const FormCardGallery = () => (
  <div className="bg-canvas rounded-media flex flex-col gap-3 p-3">
    <FormCard
      actions={<button className="text-copy-sm text-accent">Add problem</button>}
      description="Written for this forecast and saved with it."
      sectionId="form-card-demo"
      title="Avalanche problems"
      titleTag={
        <span className="rounded-badge bg-tile text-micro text-muted px-1.5 py-0.5 uppercase">
          This forecast only
        </span>
      }
    >
      <p className="text-copy text-body">Card content.</p>
    </FormCard>
    <FormCard headerAside="Optional" title="Anything else?">
      <p className="text-copy text-body">Card content.</p>
    </FormCard>
    <FormCard
      error="Drop a pin or enter coordinates."
      required
      requiredText="Required"
      title="Where?"
    >
      <p className="text-copy text-body">Card content.</p>
    </FormCard>
  </div>
)

export default FormCardGallery
