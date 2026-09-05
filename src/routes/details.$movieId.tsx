import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { DetailsPanel } from '#/components/panels/DetailsPanel/DetailsPanel.tsx'
import { movieDetailsQueryOptions } from '#/lib/query-options.ts'

export const Route = createFileRoute('/details/$movieId')({
  component: DetailsPage,
  loader: ({ context, params }) =>
    context.queryClient.query(movieDetailsQueryOptions(params.movieId)),
})

function DetailsPage() {
  const { movieId } = Route.useParams()
  const { data } = useSuspenseQuery(movieDetailsQueryOptions(movieId))

  return (
    <main>
      <DetailsPanel movie={data} />
    </main>
  )
}
