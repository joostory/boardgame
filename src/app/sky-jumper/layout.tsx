import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "스카이 점퍼 - 보드게임 도우미",
  description:
    "캐릭터를 조종하여 발판을 밟고 하늘 높이 올라가는 아케이드 점핑 게임입니다.",
  openGraph: {
    title: "스카이 점퍼 - 보드게임 도우미",
    description:
      "캐릭터를 조종하여 발판을 밟고 하늘 높이 올라가는 아케이드 점핑 게임입니다.",
    images: [
      {
        url: "/sky-jumper/icon.png",
        width: 200,
        height: 200,
        alt: "스카이 점퍼 아이콘",
      },
    ],
    type: "website",
  },
}

export default function SkyJumperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
