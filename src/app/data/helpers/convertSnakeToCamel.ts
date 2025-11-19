import _camelCase from 'lodash/camelCase'

const convertSnakeToCamel = (input: unknown): unknown => {
  if (Array.isArray(input)) {
    return input.map(convertSnakeToCamel)
  }

  if (input !== null && typeof input === 'object') {
    return Object.entries(input).reduce(
      (acc, [key, value]) => {
        const newKey = _camelCase(key)

        acc[newKey] = convertSnakeToCamel(value)

        return acc
      },
      {} as Record<string, unknown>,
    )
  }

  return input
}

export default convertSnakeToCamel
