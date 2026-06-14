import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '단어 추리 - 보드게임 도우미',
  description: '5개의 자소로 이루어진 한글 비밀 단어를 5번의 기회 내에 맞추는 단어 추리(워들) 게임입니다.',
  openGraph: {
    title: '단어 추리 - 보드게임 도우미',
    description: '5개의 자소로 이루어진 한글 비밀 단어를 5번의 기회 내에 맞추는 단어 추리(워들) 게임입니다.',
    images: [
      {
        url: '/wordle/icon.png',
        width: 200,
        height: 200,
        alt: '단어 추리 아이콘',
      },
    ],
    type: 'website',
  },
}

export default function WordleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
