import { describe, expect, it } from 'vitest'

import { GENRE_IDS, getGenreTheme } from './genre-theme'

describe('genre-theme', () => {
  it('returns sci-fi square theme for genre 878', () => {
    expect(getGenreTheme(878)).toEqual({
      style: '--scifi',
      buttonType: 'square',
    })
  })

  it('returns horror round theme for genre 27', () => {
    expect(getGenreTheme(27)).toEqual({
      style: '--horror',
      buttonType: 'round',
    })
  })

  it('returns thriller none theme for genre 53', () => {
    expect(getGenreTheme(53)).toEqual({
      style: '--thriller',
      buttonType: 'none',
    })
  })

  it('returns default theme when genreId is missing or unknown', () => {
    expect(getGenreTheme()).toEqual({
      style: '',
      buttonType: 'none',
    })
    expect(getGenreTheme(12)).toEqual({
      style: '',
      buttonType: 'none',
    })
  })

  it('lists the three carousel genre ids', () => {
    expect(GENRE_IDS).toHaveLength(3)
    expect(GENRE_IDS).toEqual(expect.arrayContaining([878, 27, 53]))
  })
})
