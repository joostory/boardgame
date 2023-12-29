import type { Metadata } from 'next'
import { Poor_Story } from 'next/font/google'
import './globals.css'

const font = Poor_Story({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: '보드게임 도우미',
  description: '보드게임을 위한 도구들입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
