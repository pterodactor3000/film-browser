import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { DetailsPanel } from '#/components/panels/DetailsPanel/DetailsPanel.tsx'
import { movieDetailsQueryOptions } from '#/lib/query-options.ts'

export const Route = createFileRoute('/details/$movieId')({
  component: DetailsPage,
  // this is here because to change styles based on genre CLICKED in carousel,
  // i need that data in the details.
  // i cannot just take the genre from movie def, because there might be overlap of all 3 defined
  validateSearch: (search: Record<string, unknown>): { genreId?: number } => {
    const genreId = Number(search.genreId)
    return Number.isFinite(genreId) ? { genreId } : {}
  },
  loader: ({ context, params }) =>
    context.queryClient.query(movieDetailsQueryOptions(params.movieId)),
})

function DetailsPage() {
  const { movieId } = Route.useParams()
  const { genreId } = Route.useSearch()
  const { data } = useSuspenseQuery(movieDetailsQueryOptions(movieId))

  return (
    <main>
      <DetailsPanel movie={data} genreId={genreId} />
    </main>
  )
}
