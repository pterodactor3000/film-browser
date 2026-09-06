import { Button } from '#/components/ui/Button/Button.tsx'
import { EyeIcon, EyeSlashIcon } from '#/components/ui/Icons'

interface AddToWatchlistButtonProps {
  handleWatchlistClick: () => void
  isInWatchlist: boolean
  type: 'round' | 'square' | 'none'
}

const AddToWatchlistButton = ({
  handleWatchlistClick,
  isInWatchlist,
  type,
}: AddToWatchlistButtonProps) => {
  return (
    <Button
      onClick={handleWatchlistClick}
      ariaLabel={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      icon={isInWatchlist ? <EyeSlashIcon /> : <EyeIcon />}
      type={type}
    />
  )
}

export { AddToWatchlistButton }
