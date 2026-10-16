import ClampedText from './ClampedText'

const longText =
  'Ski school and guiding company in Gudauri, running since 2012. They fund the daily forecast and the field days our forecasters spend digging snow pits. In spring they host free companion-rescue practice for anyone who turns up.'

const ClampedTextGallery = () => (
  <div className="grid max-w-xl gap-5">
    <div className="flex flex-col gap-2">
      <code className="text-caption text-muted">lines=2, overflowing</code>
      <ClampedText className="text-copy" lessLabel="Show less" lines={2} moreLabel="Read more">
        {longText}
      </ClampedText>
    </div>
    <div className="flex w-72 flex-col gap-2">
      <code className="text-caption text-muted">lines=1, narrow</code>
      <ClampedText className="text-copy-sm" lessLabel="Show less" lines={1} moreLabel="Read more">
        {longText}
      </ClampedText>
    </div>
    <div className="flex flex-col gap-2">
      <code className="text-caption text-muted">fits — no toggle</code>
      <ClampedText className="text-copy" lessLabel="Show less" lines={2} moreLabel="Read more">
        Hotel and spa next to the Sadzele lift.
      </ClampedText>
    </div>
  </div>
)

export default ClampedTextGallery
