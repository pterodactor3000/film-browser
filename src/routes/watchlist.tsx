import { WatchlistPanel } from '#/components/panels/WatchlistPanel/WatchlistPanel.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/watchlist')({
  component: WatchlistPage,
})

function WatchlistPage() {
  return (
    <main>
      <WatchlistPanel />
    </main>
  )
}
