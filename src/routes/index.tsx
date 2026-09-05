import { createFileRoute } from '@tanstack/react-router'

import { CarouselPanel } from '#/components/panels/CarouselPanel/CarouselPanel.tsx'
import {
  genreDefinitionQueryOptions,
  genreListQueryOptions,
} from '#/lib/query-options.ts'
import { Suspense } from 'react'

export const GENRE_IDS = [878, 27, 53]

export const Route = createFileRoute('/')({
  component: Home,
  loader: ({ context }) =>
    Promise.all([
      ...GENRE_IDS.map((genreId) =>
        context.queryClient.query(genreListQueryOptions(genreId)),
      ),
      context.queryClient.query(genreDefinitionQueryOptions()),
    ]),
})

function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading your lists, be patient...</p>}>
        <CarouselPanel />
      </Suspense>
    </main>
  )
}
