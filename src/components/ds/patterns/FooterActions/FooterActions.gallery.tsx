import FooterActions from './FooterActions'
import { Button } from '../../primitives/Button'

const FooterActionsGallery = () => (
  <div className="flex flex-col gap-4">
    <div className="rounded-media border-rule border p-3">
      <FooterActions note="Kept on this forecast — saved when you save the forecast.">
        <Button variant="secondary">Cancel</Button>
        <Button>Done</Button>
      </FooterActions>
    </div>
    <div className="rounded-media border-rule border p-3">
      <FooterActions isConfirmation note="Discard unsaved changes?">
        <Button variant="secondary">Keep editing</Button>
        <Button variant="danger">Discard</Button>
      </FooterActions>
    </div>
    <div className="rounded-media border-rule max-w-90 border p-3">
      <FooterActions note="Narrow footer: the note takes its own line.">
        <Button variant="secondary">Cancel</Button>
        <Button>Link</Button>
      </FooterActions>
    </div>
  </div>
)

export default FooterActionsGallery
