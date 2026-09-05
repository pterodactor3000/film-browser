import { Link } from '@tanstack/react-router'

const Header = () => {
  return (
    <header>
      <Link to="/">Motion Pictures</Link>
      <Link to="/watchlist">Watchlist</Link>
    </header>
  )
}

export { Header }
