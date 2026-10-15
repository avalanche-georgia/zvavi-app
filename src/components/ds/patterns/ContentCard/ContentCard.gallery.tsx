import ContentCard from './ContentCard'
import { Button } from '../../primitives/Button'

const ContentCardGallery = () => (
  <div className="flex max-w-xl flex-col gap-3">
    <ContentCard title="Who we are">
      <p>A volunteer-run, registered non-profit providing public avalanche forecasts.</p>
    </ContentCard>
    <ContentCard
      action={
        <Button size="sm" variant="text">
          Edit
        </Button>
      }
      title="With an action"
    >
      <p>Body text sits below the title, in the body colour.</p>
      <p>Paragraphs are spaced evenly.</p>
    </ContentCard>
    <ContentCard title="Forecasts are guidance" tone="warning">
      <p>A highlighted section: limits the reader must know.</p>
    </ContentCard>
    <ContentCard title="We do not provide rescue services" tone="danger">
      <p>In case of an accident, call the emergency number 112.</p>
    </ContentCard>
  </div>
)

export default ContentCardGallery
