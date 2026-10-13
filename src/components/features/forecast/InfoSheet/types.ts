// Problem properties that have an explanation
export type ProblemField = 'aspects' | 'distribution' | 'sensitivity' | 'size' | 'trend'

// What the info sheet explains: the overall danger level or one problem property
export type InfoTopic = ProblemField | 'danger'
