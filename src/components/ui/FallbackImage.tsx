'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

type FallbackImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'src'> & {
  // Tried in order — the next one is used when the current one fails to load
  // (e.g. a resized variant that hasn't been generated yet → the original)
  sources: string[]
}

const FallbackImage = ({ alt = '', sources, ...props }: FallbackImageProps) => {
  const [sourceIndex, setSourceIndex] = useState(0)

  const handleError = () => {
    if (sourceIndex < sources.length - 1) setSourceIndex(sourceIndex + 1)
  }

  return <img {...props} alt={alt} onError={handleError} src={sources[sourceIndex]} />
}

export default FallbackImage
