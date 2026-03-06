// Brand and partner SVGs — processed by SVGR via Turbopack rules
declare module '@assets/icons/brand/facebook.svg' {
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default Component
}

declare module '@assets/icons/brand/instagram.svg' {
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default Component
}

declare module '@assets/images/partnerLogos/mta.svg' {
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default Component
}

// All other SVGs — served as static images
declare module '*.svg' {
  import type { StaticImageData } from 'next/image'
  const content: StaticImageData
  export default content
}
