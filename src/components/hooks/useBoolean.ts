import React from 'react'

type UseBooleanOutput = [
  boolean,
  {
    setValue: React.Dispatch<React.SetStateAction<boolean>>
    setFalse: () => void
    setTrue: () => void
    toggle: () => void
  },
]

const useBoolean = (initialValue?: boolean): UseBooleanOutput => {
  const [value, setValue] = React.useState(Boolean(initialValue))

  const setTrue = React.useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = React.useCallback(() => {
    setValue(false)
  }, [])

  const toggle = React.useCallback(() => {
    setValue(!value)
  }, [value])

  return [value, { setFalse, setTrue, setValue, toggle }]
}

export default useBoolean
