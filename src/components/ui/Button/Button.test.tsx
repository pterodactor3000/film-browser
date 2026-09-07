import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { EyeIcon } from '#/components/ui/Icons/EyeIcon.tsx'

import { Button } from './Button'

describe('Button', () => {
  it('renders button text', () => {
    render(<Button type="none" text="Add to watchlist" onClick={() => {}} />)

    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toBeInTheDocument()
  })

  it('calls onClick when pressed', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button type="none" text="Add to watchlist" onClick={onClick} />)

    await user.click(screen.getByRole('button', { name: 'Add to watchlist' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders round type', () => {
    render(<Button type="round" text="Add to watchlist" onClick={() => {}} />)

    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toHaveClass('button', 'button--round')
  })

  it('renders square type', () => {
    render(<Button type="square" text="Add to watchlist" onClick={() => {}} />)

    expect(
      screen.getByRole('button', { name: 'Add to watchlist' }),
    ).toHaveClass('button', 'button--square')
  })

  it('renders icon only button', () => {
    render(
      <Button
        type="none"
        icon={<EyeIcon />}
        ariaLabel="Add to watchlist"
        onClick={() => {}}
      />,
    )

    const button = screen.getByRole('button', { name: 'Add to watchlist' })

    expect(button).toHaveClass('button', 'button--icon-only')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })
})
