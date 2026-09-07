interface GenreTheme {
  style: string
  buttonType: 'round' | 'square' | 'none'
}

const GENRE_THEMES: Record<number, GenreTheme> = {
  878: { style: '--scifi', buttonType: 'square' },
  27: { style: '--horror', buttonType: 'round' },
  53: { style: '--thriller', buttonType: 'none' },
}

const DEFAULT_GENRE_THEME: GenreTheme = {
  style: '',
  buttonType: 'none',
}

const GENRE_IDS = Object.keys(GENRE_THEMES).map(Number)

const getGenreTheme = (genreId?: number): GenreTheme => {
  if (genreId === undefined) {
    return DEFAULT_GENRE_THEME
  }

  return GENRE_THEMES[genreId] ?? DEFAULT_GENRE_THEME
}

export { GENRE_IDS, getGenreTheme }
