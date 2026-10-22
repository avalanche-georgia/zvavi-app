import InfoTip from './InfoTip'

// Next to a heading or label in a flex row, as screens use it (Checkbox / Switch labelAside)
const InfoTipGallery = () => (
  <div className="flex items-center gap-1.5">
    <p className="text-heading text-ink font-bold">Aspect & Elevation</p>
    <InfoTip ariaLabel="About elevation zones">
      High Alpine — above 2600 m. Alpine — 2000–2600 m. Sub Alpine — below 2000 m.
    </InfoTip>
  </div>
)

export default InfoTipGallery
