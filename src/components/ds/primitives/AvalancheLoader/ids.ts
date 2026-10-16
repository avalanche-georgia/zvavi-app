// SVG ids are document-wide, so every instance gets its own set
export const makeIds = (uid: string) => ({
  id: (name: string) => `${name}${uid}`,
  ref: (name: string) => `url(#${name}${uid})`,
})
