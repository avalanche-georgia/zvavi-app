import AboutBlock from './AboutBlock'
import JoinBlock from './JoinBlock'
import HomeSection from '../HomeSection'

// Who we are, and how to help
const AboutJoin = () => (
  <HomeSection>
    <div className="grid gap-4 md:grid-cols-2">
      <AboutBlock />
      <JoinBlock />
    </div>
  </HomeSection>
)

export default AboutJoin
