import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'

import {
  genreDefinitionQueryOptions,
  genreListQueryOptions,
} from '#/lib/query-options.ts'
import { Button } from '#/components/ui/Button/Button.tsx'

import { SimpleMovieItem } from '../SimpleMovieItem/SimpleMovieItem'
import { ChevronLeft, ChevronRight } from '../../ui/Icons'

import './Carousel.scss'

const Carousel = ({ genreId }: { genreId: number }) => {
  const { data: genreDefinitions } = useSuspenseQuery(
    genreDefinitionQueryOptions(),
  )

  const genreName = genreDefinitions.genres.find(
    (genre) => genre.id === genreId,
  )?.name

  // infinite query setup
  // load next page of movies when showing second to last 5 movies from current page
  const STEP = 5
  const VISIBLE_COUNT = 10

  const {
    data: moviesList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(genreListQueryOptions(genreId))

  const movies = moviesList.pages.flatMap((page) => page.results)
  const [startIndex, setStartIndex] = useState(0)

  const batchCount = Math.ceil(movies.length / 5)
  const currentBatch = startIndex / 5
  const isSecondToLastBatch = batchCount >= 2 && currentBatch === batchCount - 2

  const maxStartIndex = Math.max(0, movies.length - VISIBLE_COUNT)
  const visibleMovies = movies.slice(startIndex, startIndex + VISIBLE_COUNT)

  const goNext = () => {
    setStartIndex((index) => Math.min(index + STEP, maxStartIndex))
  }

  const goPrev = () => {
    setStartIndex((index) => Math.max(0, index - STEP))
  }

  useEffect(() => {
    if (!isSecondToLastBatch || !hasNextPage || isFetchingNextPage) {
      return
    }

    fetchNextPage()
  }, [isSecondToLastBatch, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <section className={clsx('carousel-wrapper')}>
      <h3>{genreName}</h3>
      <section className={clsx('carousel')}>
        <Button
          onClick={goPrev}
          type="round"
          icon={<ChevronLeft />}
          ariaLabel="Previous"
          disabled={startIndex === 0}
        />
        <ul>
          {visibleMovies.map((movie) => (
            <SimpleMovieItem
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                genreId: genreId,
              }}
            />
          ))}
        </ul>
        <Button
          onClick={goNext}
          type="round"
          icon={<ChevronRight />}
          ariaLabel="Next"
          disabled={startIndex >= maxStartIndex}
        />
      </section>
    </section>
  )
}

export { Carousel }
