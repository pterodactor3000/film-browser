import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { SimpleMovieItem } from './SimpleMovieItem'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactElement }) => (
    <a href="/">{children}</a>
  ),
}))

describe('SimpleMovieItem', () => {
  it('renders movie title', () => {
    render(
      <SimpleMovieItem
        movie={{
          id: 12345,
          title: 'Some Title',
          poster_path: '/png.png',
          genreId: 27,
        }}
      />,
    )

    expect(screen.getByText('Some Title')).toBeInTheDocument()
  })
})
