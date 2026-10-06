// Human-facing record number derived from the DB id: A-0007, A-0412, A-12345
const formatAvalancheId = (id: number) => `A-${String(id).padStart(4, '0')}`

export default formatAvalancheId
