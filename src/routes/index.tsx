import { Suspense } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { CarouselPanel } from '#/components/panels/CarouselPanel/CarouselPanel.tsx'
import { Loading } from '#/components/ui/Loading/Loading.tsx'
import { GENRE_IDS } from '#/lib/genre-theme.ts'
import {
  genreDefinitionQueryOptions,
  genreListQueryOptions,
} from '#/lib/query-options.ts'

export const Route = createFileRoute('/')({
  component: Home,
  loader: ({ context }) =>
    Promise.all([
      ...GENRE_IDS.map((genreId) =>
        context.queryClient.infiniteQuery(genreListQueryOptions(genreId)),
      ),
      context.queryClient.query(genreDefinitionQueryOptions()),
    ]),
})

function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <CarouselPanel />
      </Suspense>
    </main>
  )
}
