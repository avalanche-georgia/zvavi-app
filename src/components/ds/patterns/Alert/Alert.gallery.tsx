import Alert from './Alert'

const AlertGallery = () => (
  <div className="flex max-w-xl flex-col gap-3">
    <Alert>Daily forecasts resume in December. Observations stay live.</Alert>
    <Alert title="This forecast has expired" tone="warning">
      Conditions may have changed. A new forecast hasn’t been issued yet.
    </Alert>
    <Alert title="We do not provide rescue services" tone="danger">
      In case of an accident, call the emergency number 112.
    </Alert>
  </div>
)

export default AlertGallery
