import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '모두의 마블 - 보드게임 도우미',
  description: '주사위를 굴려 땅을 사고 건물을 짓는 모두의 마블 게임입니다.',
  openGraph: {
    title: '모두의 마블 - 보드게임 도우미',
    description: '주사위를 굴려 땅을 사고 건물을 짓는 모두의 마블 게임입니다.',
    images: [
      {
        url: '/modoo/modoo.png',
        width: 200,
        height: 200,
        alt: '모두의 마블 아이콘',
      },
    ],
    type: 'website',
  },
}

export default function ModooLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
