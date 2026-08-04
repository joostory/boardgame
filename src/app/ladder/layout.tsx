import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "사다리 타기 - 보드게임 도우미",
  description: "복불복 벌칙이나 순서 정하기에 유용한 사다리 타기 게임입니다.",
  openGraph: {
    title: "사다리 타기 - 보드게임 도우미",
    description: "복불복 벌칙이나 순서 정하기에 유용한 사다리 타기 게임입니다.",
    images: [
      {
        url: "/ladder/ladder_icon.png",
        width: 200,
        height: 200,
        alt: "사다리 타기 아이콘",
      },
    ],
    type: "website",
  },
}

export default function LadderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
