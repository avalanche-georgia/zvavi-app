import { Footer, Header } from '@components/layout'
import { DisclaimerGate } from '@components/shared/Disclaimer'
import { Analytics } from '@vercel/analytics/next'

type LayoutProps = {
  children: React.ReactNode
}

const PublicLayout = ({ children }: LayoutProps) => (
  <>
    <DisclaimerGate>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </DisclaimerGate>

    <Analytics />
  </>
)

export default PublicLayout
