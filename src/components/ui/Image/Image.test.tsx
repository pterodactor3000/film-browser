import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'

import { Image } from './Image'

describe('Image', () => {
  it('builds a tmdb poster url', () => {
    render(<Image src="/png.png" alt="Some Title" width={92} />)

    expect(screen.getByRole('img', { name: 'Some Title' })).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w92/png.png',
    )
  })
})
