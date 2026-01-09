import { Footer, Header } from '@components/layout'
import { DisclaimerGate } from '@components/shared/Disclaimer'
import WIPBanner from '@components/shared/WIPBanner'
import { Analytics } from '@vercel/analytics/next'

type LayoutProps = {
  children: React.ReactNode
}

const PublicLayout = ({ children }: LayoutProps) => (
  <>
    <DisclaimerGate>
      <Header />
      <WIPBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </DisclaimerGate>

    <Analytics />
  </>
)

export default PublicLayout
