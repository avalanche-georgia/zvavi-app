'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

type FallbackImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'src'> & {
  // Shown instead of a broken image once every source has failed
  fallback?: React.ReactNode
  // Tried in order — the next one is used when the current one fails to load
  // (e.g. a small variant that hasn't been generated yet → a larger one)
  sources: string[]
}

const FallbackImage = ({ alt = '', fallback, sources, ...props }: FallbackImageProps) => {
  const [sourceIndex, setSourceIndex] = useState(0)

  if (sourceIndex >= sources.length && fallback) return fallback

  const handleError = () => setSourceIndex((index) => index + 1)

  return (
    <img
      {...props}
      alt={alt}
      onError={handleError}
      src={sources[Math.min(sourceIndex, sources.length - 1)]}
    />
  )
}

export default FallbackImage
