import TextAreaField from './TextAreaField'

const AdditionalTextFields = () => {
  return (
    <>
      <div className="flex items-center gap-6">
        <TextAreaField type="snowpack" />
        <TextAreaField type="weather" />
      </div>
      <TextAreaField type="additionalHazards" />
    </>
  )
}

export default AdditionalTextFields
