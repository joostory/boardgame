import type { Metadata } from 'next'
import { Poor_Story } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/shape.css'
import { BoardgameThemeProvider } from '@/components/theme-provider'

const font = Poor_Story({
  weight: '400',
  subsets: ['latin']
})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://boardgame.joostory.net'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: '보드게임 도우미',
  description: '보드게임을 위한 도구들입니다.',
  openGraph: {
    title: '보드게임 도우미',
    description: '보드게임을 위한 다양한 도구들을 제공합니다.',
    siteName: '보드게임 도우미',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/app.png',
        width: 1200,
        height: 630,
        alt: '보드게임 도우미 대표 이미지',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={font.className}>
        <BoardgameThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
        >
          {children}
        </BoardgameThemeProvider>
      </body>
    </html>
  )
}
