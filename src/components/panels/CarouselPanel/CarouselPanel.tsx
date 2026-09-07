import { clsx } from 'clsx'

import { Carousel } from '#/components/blocks/Carousel/Carousel.tsx'
import { GENRE_IDS } from '#/lib/genre-theme.ts'

import { CarouselPanelErrorBoundary } from './CarouselPanelErrorBoundary'

import './CarouselPanel.scss'

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
