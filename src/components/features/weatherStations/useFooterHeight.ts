import { useEffect, useState } from 'react'

// The site footer's height including its top margin — measured, since it varies
// by breakpoint and content (like useHeaderHeight for the header)
const useFooterHeight = () => {
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    const footer = document.querySelector('body footer')

    if (!footer) return undefined

    const observer = new ResizeObserver(() => {
      const { marginTop } = getComputedStyle(footer)

      setFooterHeight(footer.getBoundingClientRect().height + parseFloat(marginTop))
    })

    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  return footerHeight
}

export default useFooterHeight
