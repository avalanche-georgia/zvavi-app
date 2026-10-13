import { useState } from 'react'

// "Clear filters" also has to empty the search box, whose text is local (it writes to
// the URL after a pause). Bumping the key tells it to drop the text.
const useSearchReset = (onFiltersClear: VoidFunction) => {
  const [searchResetKey, setSearchResetKey] = useState(0)

  const handleFiltersClear = () => {
    setSearchResetKey((key) => key + 1)
    onFiltersClear()
  }

  return { onFiltersClear: handleFiltersClear, searchResetKey }
}

export default useSearchReset
