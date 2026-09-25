import SuccessState from './SuccessState'
import { Button } from '../../primitives'

const SuccessStateGallery = () => (
  <SuccessState
    actions={
      <>
        <Button size="lg" variant="secondary">
          Submit another
        </Button>
        <Button size="lg">View observations</Button>
      </>
    }
    description="Our forecasters will review it before it appears publicly."
    title="Thanks — observation received"
  />
)

export default SuccessStateGallery
