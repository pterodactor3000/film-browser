import { Button } from '#/components/ui/Button/Button.tsx'
import { EyeIcon } from '#/components/ui/Icons/EyeIcon.tsx'
import { EyeSlashIcon } from '#/components/ui/Icons/EyeSlashIcon.tsx'

interface AddToWatchlistButtonProps {
  handleWatchlistClick: () => void
  isInWatchlist: boolean
}

const AddToWatchlistButton = ({
  handleWatchlistClick,
  isInWatchlist,
}: AddToWatchlistButtonProps) => {
  return (
    <Button
      onClick={handleWatchlistClick}
      text={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      icon={isInWatchlist ? <EyeSlashIcon /> : <EyeIcon />}
      type="none"
    />
  )
}

export { AddToWatchlistButton }
