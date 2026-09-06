import { Button } from '#/components/ui/Button/Button.tsx'
import { EyeIcon, EyeSlashIcon } from '#/components/ui/Icons'

interface AddToWatchlistButtonProps {
  handleWatchlistClick: () => void
  isInWatchlist: boolean
  type: 'round' | 'square' | 'none'
  text?: string
  ariaLabel: string
}

const AddToWatchlistButton = ({
  handleWatchlistClick,
  isInWatchlist,
  type,
  text,
  ariaLabel,
}: AddToWatchlistButtonProps) => {
  return (
    <Button
      onClick={handleWatchlistClick}
      ariaLabel={ariaLabel}
      icon={isInWatchlist ? <EyeSlashIcon /> : <EyeIcon />}
      type={type}
      text={text}
    />
  )
}

export { AddToWatchlistButton }
