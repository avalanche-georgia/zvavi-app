import Logo from '@assets/images/logo.png'
import Image from 'next/image'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Logo + "Avalanche.ge", linking home. Also heads the footer.
const HeaderLogo = () => (
  <Link
    className="focus-ring text-primary flex shrink-0 items-center gap-2.5 rounded-lg text-[19px] font-bold tracking-[-0.01em]"
    href={routes.home}
  >
    <Image alt="" height={30} priority src={Logo} width={30} />
    Avalanche.ge
  </Link>
)

export default HeaderLogo
