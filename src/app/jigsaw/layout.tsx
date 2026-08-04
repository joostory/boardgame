import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "직소 퍼즐 - 보드게임 도우미",
  description:
    "다양한 이미지를 조각으로 나누어 다시 맞추는 힐링 직소 퍼즐 게임입니다.",
  openGraph: {
    title: "직소 퍼즐 - 보드게임 도우미",
    description:
      "다양한 이미지를 조각으로 나누어 다시 맞추는 힐링 직소 퍼즐 게임입니다.",
    images: [
      {
        url: "/jigsaw/icon.png",
        width: 200,
        height: 200,
        alt: "직소 퍼즐 아이콘",
      },
    ],
    type: "website",
  },
}

export default function JigsawLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
