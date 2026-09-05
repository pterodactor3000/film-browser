import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'

import { AdditionalInfo } from './AdditionalInfo'

describe('AdditionalInfo', () => {
  it('renders title, date and vote', () => {
    render(
      <AdditionalInfo
        originalTitle="Some Title"
        originalLanguage="en"
        releaseDate="2010-07-16"
        vote={{ average: 8.4, count: 100 }}
      />,
    )

    expect(screen.getByText('Original title (en)')).toBeInTheDocument()
    expect(screen.getByText('Some Title')).toBeInTheDocument()
    expect(screen.getByText('2010-07-16')).toBeInTheDocument()
    expect(screen.getByText('8.4 / 100')).toBeInTheDocument()
  })
})
