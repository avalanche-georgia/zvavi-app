import { useEffect } from 'react'

// Turns off the browser's scroll anchoring while the page is shown. With it on,
// unfolding a card can "open upward": the browser pins something below the
// card (the next card, the footer) and scrolls the page to keep it in place.
// Without it the top of the card stays put and the content grows downward.
const useStableScroll = () => {
  useEffect(() => {
    const { style } = document.documentElement
    const previous = style.overflowAnchor

    style.overflowAnchor = 'none'

    return () => {
      style.overflowAnchor = previous
    }
  }, [])
}

export default useStableScroll
