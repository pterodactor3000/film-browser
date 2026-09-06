import { Carousel } from '#/components/blocks/Carousel/Carousel.tsx'
import { GENRE_IDS } from '#/routes/index.tsx'
import { clsx } from 'clsx'

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
