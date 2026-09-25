import InfoTip from './InfoTip'

const InfoTipGallery = () => (
  <p className="text-heading text-ink font-bold">
    Aspect & Elevation{' '}
    <InfoTip ariaLabel="About elevation zones">
      High Alpine — above 2600 m. Alpine — 2000–2600 m. Sub Alpine — below 2000 m.
    </InfoTip>
  </p>
)

export default InfoTipGallery
