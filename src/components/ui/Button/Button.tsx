import type { ReactNode } from 'react'

import './Button.scss'

interface ButtonBaseProps {
  onClick: () => void
  type: 'round' | 'square' | 'none'
  disabled?: boolean
}

interface ButtonWithTextProps extends ButtonBaseProps {
  text: string
  icon?: ReactNode
  ariaLabel?: string
}

interface ButtonIconOnlyProps extends ButtonBaseProps {
  text?: never
  icon: ReactNode
  ariaLabel: string
}

type ButtonProps = ButtonWithTextProps | ButtonIconOnlyProps

const Button = ({
  onClick,
  type = 'none',
  text,
  icon,
  ariaLabel,
  disabled = false,
}: ButtonProps) => {
  const className = [
    'button',
    type === 'round' ? 'button--round' : '',
    type === 'square' ? 'button--square' : '',
    text ? '' : 'button--icon-only',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      title={ariaLabel}
    >
      {icon}
      {text ? <span>{text}</span> : null}
    </button>
  )
}

export { Button }
