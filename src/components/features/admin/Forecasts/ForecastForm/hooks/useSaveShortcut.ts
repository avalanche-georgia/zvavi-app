import { useEffect, useRef } from 'react'

// ⌘S / Ctrl+S saves instead of opening the browser's "Save page"
const useSaveShortcut = (onSave: VoidFunction) => {
  const onSaveRef = useRef(onSave)

  useEffect(() => {
    onSaveRef.current = onSave
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 's' || !(event.metaKey || event.ctrlKey)) return

      event.preventDefault()
      onSaveRef.current()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}

export default useSaveShortcut
