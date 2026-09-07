import { createFileRoute } from '@tanstack/react-router'

import { WatchlistPanel } from '#/components/panels/WatchlistPanel/WatchlistPanel.tsx'

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
