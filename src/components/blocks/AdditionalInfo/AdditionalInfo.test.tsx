import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'

import { AdditionalInfo } from './AdditionalInfo'

const additionalInfo = {
  originalTitle: 'Some Title',
  originalLanguage: 'en',
  releaseDate: '2010-07-16',
  status: 'Released',
  spokenLanguages: ['English', 'Spanish'],
  productionCompanies: ['Studio A', 'Studio B'],
  productionCountries: ['United States of America'],
  originCountry: ['US'],
  budget: 11000000,
  revenue: 775398007,
  homepage: 'http://www.example.com',
  imdbId: 'tt0076759',
  collectionName: 'Some Collection',
  vote: {
    average: 8.4,
    count: 100,
  },
}

describe('AdditionalInfo', () => {
  it('renders original title, date, vote count and remaining details', () => {
    render(<AdditionalInfo {...additionalInfo} />)

    expect(screen.getByText('Original title (en)')).toBeInTheDocument()
    expect(screen.getByText('Some Title')).toBeInTheDocument()
    expect(screen.getByText('2010-07-16')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Released')).toBeInTheDocument()
    expect(screen.getByText('English, Spanish')).toBeInTheDocument()
    expect(screen.getByText('Studio A, Studio B')).toBeInTheDocument()
    expect(screen.getByText('United States of America')).toBeInTheDocument()
    expect(screen.getByText('US')).toBeInTheDocument()
    expect(screen.getByText('11000000')).toBeInTheDocument()
    expect(screen.getByText('775398007')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'http://www.example.com' }),
    ).toHaveAttribute('href', 'http://www.example.com')
    expect(screen.getByRole('link', { name: 'tt0076759' })).toHaveAttribute(
      'href',
      'https://www.imdb.com/title/tt0076759',
    )
    expect(screen.getByText('Some Collection')).toBeInTheDocument()
  })
})
