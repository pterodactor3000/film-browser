import { useEffect, useState } from 'react'

import { AdditionalInfo } from '#/components/blocks/AdditionalInfo/AdditionalInfo.tsx'
import { MovieDescription } from '#/components/blocks/MovieDescription/MovieDescription.tsx'
import { Image } from '#/components/ui/Image/Image.tsx'
import {
  addToWatchlist,
  getLocalWatchlist,
  removeFromWatchlist,
} from '#/lib/watchlist-collection.ts'

const DetailsPanel = ({ movie }: { movie: TmdbMovieDetails }) => {
  const { data: watchlist } = getLocalWatchlist()
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie.id, movie.title, movie.poster_path || '')
    }
  }

  const movieDetails = {
    title: movie.title,
    overview: movie.overview,
    isInWatchlist,
    watchlistButtonHandler: handleWatchlistClick,
  }

  const additionalInfo = {
    originalTitle: movie.original_title,
    originalLanguage: movie.original_language,
    releaseDate: movie.release_date,
    vote: {
      average: movie.vote_average,
      count: movie.vote_count,
    },
  }

  useEffect(() => {
    setIsInWatchlist(
      watchlist.find((watchlistMovie) => watchlistMovie.id === movie.id)?.id
        ? true
        : false,
    )
  }, [movie, watchlist])

  return (
    <article>
      {movie.poster_path ? (
        <Image alt={movie.title} src={movie.poster_path} />
      ) : null}
      <MovieDescription {...movieDetails} />
      <AdditionalInfo {...additionalInfo} />
    </article>
  )
}

export { DetailsPanel }
