import _camelCase from 'lodash/camelCase'

const convertSnakeToCamel = <T>(input: T): T => {
  if (Array.isArray(input)) {
    return input.map(convertSnakeToCamel) as unknown as T
  }

  if (input !== null && typeof input === 'object') {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const newKey = _camelCase(key)

      acc[newKey] = convertSnakeToCamel(value)

      return acc
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any)
  }

  return input
}

export default convertSnakeToCamel
