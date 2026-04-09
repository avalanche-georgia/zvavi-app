const partnersKeys = {
  active: () => [...partnersKeys.all, 'active'] as const,
  all: ['partnersKeys'] as const,
  item: (id: string) => [...partnersKeys.all, 'item', id] as const,
  list: () => [...partnersKeys.all, 'list'] as const,
}

export default partnersKeys
