import { Carousel } from '#/components/blocks/Carousel/Carousel.tsx'
import { GENRE_IDS } from '#/routes/index.tsx'

const CarouselPanel = () => {
  return (
    <article>
      {GENRE_IDS.map((genreId) => (
        <Carousel key={genreId} genreId={genreId} />
      ))}
    </article>
  )
}

export { CarouselPanel }
