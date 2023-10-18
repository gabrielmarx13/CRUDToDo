import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crud Todo List',
  description: 'CMPSC487W Project 2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
