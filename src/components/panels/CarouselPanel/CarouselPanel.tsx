import { Carousel } from '#/components/blocks/Carousel/Carousel.tsx'
import { clsx } from 'clsx'

import { CarouselPanelErrorBoundary } from './CarouselPanelErrorBoundary'

import './CarouselPanel.scss'
import { GENRE_IDS } from '#/lib/genre-theme.ts'

const CarouselPanel = () => {
  return (
    <CarouselPanelErrorBoundary>
      <article className={clsx('carousel-panel')}>
        {GENRE_IDS.map((genreId) => (
          <Carousel key={genreId} genreId={genreId} />
        ))}
      </article>
    </CarouselPanelErrorBoundary>
  )
}

export { CarouselPanel }
