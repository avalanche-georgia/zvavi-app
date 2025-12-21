/* eslint-disable @typescript-eslint/no-explicit-any */
const convertCamelToSnake = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map((item) => convertCamelToSnake(item))
  }

  if (input !== null && typeof input === 'object' && !(input instanceof Date)) {
    return Object.keys(input).reduce(
      (acc, key) => {
        const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

        acc[snakeKey] = convertCamelToSnake(input[key])

        return acc
      },
      {} as Record<string, any>,
    )
  }

  return input
}

export default convertCamelToSnake
