import type { ReactNode } from 'react'

import { HeadContent, Scripts } from '@tanstack/react-router'

import { Header } from '#/components/ui/Header/Header.tsx'

interface RootDocumentProps {
  children: ReactNode
}

const RootDocument = ({ children }: RootDocumentProps) => {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export { RootDocument }
