import Spinner from './Spinner'

const SpinnerGallery = () => (
  <div className="flex items-center gap-6">
    <Spinner label="Loading" size="sm" />
    <Spinner label="Loading" />
    <Spinner label="Loading" size="lg" />
  </div>
)

export default SpinnerGallery
