interface ImageProps {
  src: string
  alt: string
  width?: number
}

const Image = ({ src, width, alt }: ImageProps) => {
  return (
    <img
      alt={alt}
      src={`https://image.tmdb.org/t/p/${width ? 'w' + width : 'original'}${src}`}
    />
  )
}

export { Image }
