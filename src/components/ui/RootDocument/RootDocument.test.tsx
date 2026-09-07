import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { RootDocument } from './RootDocument'

vi.mock('@tanstack/react-router', () => ({
  HeadContent: () => null,
  Scripts: () => null,
  Link: ({ children }: { children: ReactElement }) => (
    <a href="/">{children}</a>
  ),
}))

describe('RootDocument', () => {
  it('renders header chrome and children', () => {
    render(
      <RootDocument>
        <main>Page content</main>
      </RootDocument>,
    )

    expect(screen.getByText('Motion Pictures')).toBeInTheDocument()
    expect(screen.getByText('Watchlist')).toBeInTheDocument()
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })
})
