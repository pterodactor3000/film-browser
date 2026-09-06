interface TmdbMovieListItem {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  softcore: boolean
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface TmdbMovieListResponse {
  page: number
  results: TmdbMovieListItem[]
  total_pages: number
  total_results: number
}

interface TmdbCollection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

interface TmdbGenre {
  id: number
  name: string
}

interface TmdbProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface TmdbProductionCountry {
  iso_3166_1: string
  name: string
}

interface TmdbSpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface TmdbMovieDetails {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: TmdbCollection | null
  budget: number
  genres: TmdbGenre[]
  homepage: string
  id: number
  imdb_id: string | null
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: TmdbProductionCompany[]
  production_countries: TmdbProductionCountry[]
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: TmdbSpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface TmdbGenreListResponse {
  genres: TmdbGenre[]
}

interface MovieSimpleItem {
  id: number
  title: string
  poster_path: string | null
  genreId: number
}
