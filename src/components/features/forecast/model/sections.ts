// Anchors of the page sections the jump bar links to, in page order
export const sectionIds = ['summary', 'problems', 'avalanches', 'conditions'] as const

export type SectionId = (typeof sectionIds)[number]
