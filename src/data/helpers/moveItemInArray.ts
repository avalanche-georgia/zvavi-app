const moveItemInArray = <T>(arr: T[], from: number, to: number): T[] => {
  if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return arr

  const result = [...arr]
  const [item] = result.splice(from, 1)

  result.splice(to, 0, item)

  return result
}

export default moveItemInArray
