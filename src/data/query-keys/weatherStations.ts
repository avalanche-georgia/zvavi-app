const weatherStationsKeys = {
  all: ['weatherStations'] as const,
  list: () => [...weatherStationsKeys.all, 'list'] as const,
}

export default weatherStationsKeys
