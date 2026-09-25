import FormCard from './FormCard'

const FormCardGallery = () => (
  <div className="bg-canvas rounded-media flex flex-col gap-3 p-3">
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
