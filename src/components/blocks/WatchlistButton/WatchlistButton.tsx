import { ClientOnly } from '@tanstack/react-router'

import { Button } from '#/components/ui/Button/Button.tsx'
import { EyeIcon, EyeSlashIcon } from '#/components/ui/Icons'
import {
  addToLocalWatchlist,
  getLocalWatchlist,
  removeFromLocalWatchlist,
} from '#/lib/watchlist-collection.ts'

interface WatchlistButtonProps {
  movie: {
    id: number
    title: string
    poster_path: string | null
  }
  genreId?: number
  type: 'round' | 'square' | 'none'
}

const InactiveWatchlistButton = ({
  type,
}: {
  type: WatchlistButtonProps['type']
}) => (
  <Button
    onClick={() => {}}
    ariaLabel="Add to watchlist"
    icon={<EyeIcon />}
    type={type}
    text={type === 'none' ? 'Add to watchlist' : undefined}
    disabled
  />
)

const HydratedWatchlistButton = ({
  movie,
  genreId,
  type,
}: WatchlistButtonProps) => {
  const { data: watchlist, isReady } = getLocalWatchlist()

  if (!isReady) {
    return <InactiveWatchlistButton type={type} />
  }

  const isInWatchlist = watchlist.some((item) => item.id === movie.id)
  const buttonText = isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromLocalWatchlist(movie.id)
      return
    }

    addToLocalWatchlist(movie.id, movie.title, movie.poster_path ?? '', genreId)
  }

  return (
    <Button
      onClick={handleWatchlistClick}
      ariaLabel={buttonText}
      icon={isInWatchlist ? <EyeSlashIcon /> : <EyeIcon />}
      type={type}
      text={type === 'none' ? buttonText : undefined}
    />
  )
}

const WatchlistButton = ({ movie, genreId, type }: WatchlistButtonProps) => (
  <ClientOnly fallback={<InactiveWatchlistButton type={type} />}>
    <HydratedWatchlistButton movie={movie} genreId={genreId} type={type} />
  </ClientOnly>
)

export { WatchlistButton }
