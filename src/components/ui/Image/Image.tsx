import { useState } from 'react'
import { clsx } from 'clsx'

import './Image.scss'

interface ImageProps {
  src: string
  alt: string
  width?: number
}

const Image = ({ src, width, alt }: ImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState('')
  const tmdbSrc = `https://image.tmdb.org/t/p/${width ? 'w' + width : 'original'}${src}`
  const isLoaded = loadedSrc === tmdbSrc

  const markLoaded = (img: HTMLImageElement) => {
    if (img.naturalWidth > 0) {
      setLoadedSrc(tmdbSrc)
    }
  }

  return (
    <div className={clsx('image-frame', isLoaded && 'is-loaded')}>
      <img
        alt={alt}
        src={tmdbSrc}
        width={width}
        onLoad={(event) => markLoaded(event.currentTarget)}
        onError={() => setLoadedSrc(tmdbSrc)}
        ref={(img) => {
          if (img?.complete) {
            markLoaded(img)
          }
        }}
      />
    </div>
  )
}

export { Image }
