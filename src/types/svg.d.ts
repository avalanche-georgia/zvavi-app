declare module '*.svg?component' {
  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default Component
}

declare module '*.svg' {
  const src: string
  export default src
}
