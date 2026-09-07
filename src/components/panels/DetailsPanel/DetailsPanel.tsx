import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

import { AdditionalInfo } from '#/components/blocks/AdditionalInfo/AdditionalInfo.tsx'
import { MovieDescription } from '#/components/blocks/MovieDescription/MovieDescription.tsx'
import { Image } from '#/components/ui/Image/Image.tsx'
import {
  addToLocalWatchlist,
  getLocalWatchlist,
  removeFromLocalWatchlist,
} from '#/lib/watchlist-collection.ts'
import { getGenreTheme } from '#/lib/genre-theme.ts'

import './DetailsPanel.scss'

const DetailsPanel = ({
  movie,
  genreId,
}: {
  movie: TmdbMovieDetails
  genreId?: number
}) => {
  const { data: watchlist } = getLocalWatchlist()
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const { style: genreStyle, buttonType } = getGenreTheme(genreId)

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromLocalWatchlist(movie.id)
    } else {
      addToLocalWatchlist(
        movie.id,
        movie.title,
        movie.poster_path || '',
        genreId,
      )
    }
  }

  const movieDetails = {
    title: movie.title,
    tagline: movie.tagline,
    overview: movie.overview,
    genres: movie.genres.map((genre) => genre.name),
    runtimeMinutes: movie.runtime,
    releaseYear: movie.release_date.slice(0, 4),
    voteAverage: movie.vote_average,
    isInWatchlist,
    watchlistButtonHandler: handleWatchlistClick,
    buttonType,
  }

  const additionalInfo = {
    originalTitle: movie.original_title,
    originalLanguage: movie.original_language,
    releaseDate: movie.release_date,
    status: movie.status,
    spokenLanguages: movie.spoken_languages.map(
      (language) => language.english_name,
    ),
    productionCompanies: movie.production_companies.map(
      (company) => company.name,
    ),
    productionCountries: movie.production_countries.map(
      (country) => country.name,
    ),
    originCountry: movie.origin_country,
    budget: movie.budget,
    revenue: movie.revenue,
    homepage: movie.homepage,
    imdbId: movie.imdb_id,
    collectionName: movie.belongs_to_collection?.name ?? null,
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
    <article className={clsx(`details-style${genreStyle}`, 'details-page')}>
      {movie.poster_path ? (
        <Image alt={movie.title} src={movie.poster_path} width={500} />
      ) : null}
      <MovieDescription {...movieDetails} />
      <AdditionalInfo {...additionalInfo} />
    </article>
  )
}

export { DetailsPanel }
