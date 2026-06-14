import type { Metadata } from 'next'
import { Poor_Story } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/shape.css'
import { BoardgameThemeProvider } from '@/components/theme-provider'

const font = Poor_Story({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: '보드게임 도우미',
  description: '보드게임을 위한 도구들입니다.',
  openGraph: {
    title: '보드게임 도우미',
    description: '보드게임을 위한 다양한 도구들을 제공합니다.',
    siteName: '보드게임 도우미',
    locale: 'ko_KR',
    type: 'website',
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
