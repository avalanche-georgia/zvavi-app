import { BankRequisitesSection } from './BankRequisitesSection'
import EmergencyDisclaimerSection from './EmergencyDisclaimerSection'
import LinksSection from './LinksSection'

const PageContent = () => (
  <div className="flex flex-col gap-6">
    <LinksSection />
    <hr />
    <BankRequisitesSection />
    <hr />
    <EmergencyDisclaimerSection />
  </div>
)

export default PageContent
