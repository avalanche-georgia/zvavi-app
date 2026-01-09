const generateOptions = (values: string[], scope: string, translator: (key: string) => string) =>
  values.map((value) => ({
    label: translator(`${scope}.${value}`),
    value,
  }))

export default generateOptions
