import { clsx } from 'clsx'

import { AdditionalInfo } from '#/components/blocks/AdditionalInfo/AdditionalInfo.tsx'
import { MovieDescription } from '#/components/blocks/MovieDescription/MovieDescription.tsx'
import { WatchlistButton } from '#/components/blocks/WatchlistButton/WatchlistButton.tsx'
import { Image } from '#/components/ui/Image/Image.tsx'
import { getGenreTheme } from '#/lib/genre-theme.ts'
import type { TmdbMovieDetails } from '#/lib/types.ts'

import './DetailsPanel.scss'

const DetailsPanel = ({
  movie,
  genreId,
}: {
  movie: TmdbMovieDetails
  genreId?: number
}) => {
  const { style: genreStyle, buttonType } = getGenreTheme(genreId)

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

  return (
    <article className={clsx(`details-style${genreStyle}`, 'details-page')}>
      {movie.poster_path ? (
        <Image alt={movie.title} src={movie.poster_path} width={500} />
      ) : null}
      <MovieDescription
        title={movie.title}
        tagline={movie.tagline}
        overview={movie.overview}
        genres={movie.genres.map((genre) => genre.name)}
        runtimeMinutes={movie.runtime}
        releaseYear={movie.release_date.slice(0, 4)}
        voteAverage={movie.vote_average}
        watchlistButton={
          <WatchlistButton movie={movie} genreId={genreId} type={buttonType} />
        }
      />
      <AdditionalInfo {...additionalInfo} />
    </article>
  )
}

export { DetailsPanel }
