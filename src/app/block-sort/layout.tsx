import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '블록 정렬 퍼즐 - 보드게임 도우미',
  description: '여러 색의 블록을 정렬하여 각 튜브마다 한 가지 색상의 블록만 모으는 힐링 퍼즐 게임입니다.',
  openGraph: {
    title: '블록 정렬 퍼즐 - 보드게임 도우미',
    description: '여러 색의 블록을 정렬하여 각 튜브마다 한 가지 색상의 블록만 모으는 힐링 퍼즐 게임입니다.',
    images: [
      {
        url: '/block-sort/icon.png',
        width: 500,
        height: 500,
        alt: '블록 정렬 퍼즐 아이콘',
      },
    ],
    type: 'website',
  },
}

export default function BlockSortLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
