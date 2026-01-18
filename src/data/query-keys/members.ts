const membersKeys = {
  all: ['membersKeys'] as const,

  item: (id: string) => [...membersKeys.all, 'item', id] as const,
  list: () => [...membersKeys.all, 'list'] as const,
  verify: (code: string) => [...membersKeys.all, 'verify', code] as const,
}

export default membersKeys
