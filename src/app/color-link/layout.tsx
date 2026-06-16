import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '색상 선 연결 - 보드게임 도우미',
  description: '자유롭게 선을 그려서 같은 색의 점들을 연결하는 퍼즐 게임입니다. 선이 겹치면 탈락하니 조심하세요!',
  openGraph: {
    title: '색상 선 연결 - 보드게임 도우미',
    description: '자유롭게 선을 그려서 같은 색의 점들을 연결하는 퍼즐 게임입니다. 선이 겹치면 탈락하니 조심하세요!',
    images: [
      {
        url: '/color-link/icon.png',
        width: 500,
        height: 500,
        alt: '색상 선 연결 아이콘',
      },
    ],
    type: 'website',
  },
}

export default function ColorLinkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
