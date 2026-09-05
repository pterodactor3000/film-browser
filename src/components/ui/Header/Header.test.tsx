import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { Header } from './Header'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactElement }) => (
    <a href="/">{children}</a>
  ),
}))

describe('Header', () => {
  it('renders site name and watchlist link', () => {
    render(<Header />)

    expect(screen.getByText('Motion Pictures')).toBeInTheDocument()
    expect(screen.getByText('Watchlist')).toBeInTheDocument()
  })
})
