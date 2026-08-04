import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "메모리 게임 - 보드게임 도우미",
  description:
    "뒤집힌 카드들 중 짝이 맞는 카드를 찾아내는 기억력 테스트 카드 게임입니다.",
  openGraph: {
    title: "메모리 게임 - 보드게임 도우미",
    description:
      "뒤집힌 카드들 중 짝이 맞는 카드를 찾아내는 기억력 테스트 카드 게임입니다.",
    images: [
      {
        url: "/memory/memory_icon.png",
        width: 200,
        height: 200,
        alt: "메모리 게임 아이콘",
      },
    ],
    type: "website",
  },
}

export default function MemoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
