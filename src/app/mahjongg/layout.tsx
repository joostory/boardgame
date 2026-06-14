import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '마작 솔리테어 - 보드게임 도우미',
  description: '짝이 맞는 마작 패를 찾아 보드에서 모두 제거하는 정통 마작 솔리테어(사천성) 게임입니다.',
  openGraph: {
    title: '마작 솔리테어 - 보드게임 도우미',
    description: '짝이 맞는 마작 패를 찾아 보드에서 모두 제거하는 정통 마작 솔리테어(사천성) 게임입니다.',
    images: [
      {
        url: '/mahjongg/icon.png',
        width: 200,
        height: 200,
        alt: '마작 솔리테어 아이콘',
      },
    ],
    type: 'website',
  },
}

export default function MahjonggLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
