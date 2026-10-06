import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Opens in a new tab so the consent choice in progress isn't lost
const PrivacyPolicyLink = ({ children }: { children: React.ReactNode }) => (
  <Link className="text-primary underline" href={routes.privacy} target="_blank">
    {children}
  </Link>
)

export const renderPrivacyPolicyLink = (chunks: React.ReactNode) => (
  <PrivacyPolicyLink>{chunks}</PrivacyPolicyLink>
)

export default PrivacyPolicyLink
