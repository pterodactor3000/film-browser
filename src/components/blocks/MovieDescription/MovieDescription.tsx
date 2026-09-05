import { AddToWatchlistButton } from '../AddToWatchlistButton/AddToWatchlistButton'

interface MovieDescriptionProps {
  title: string
  overview: string
  isInWatchlist: boolean
  watchlistButtonHandler: () => void
}

const MovieDescription = ({
  title,
  overview,
  isInWatchlist,
  watchlistButtonHandler,
}: MovieDescriptionProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <AddToWatchlistButton
        handleWatchlistClick={watchlistButtonHandler}
        isInWatchlist={isInWatchlist}
      />
      <div>{overview}</div>
    </div>
  )
}

export { MovieDescription }
