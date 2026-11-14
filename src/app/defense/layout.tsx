import type { Metadata } from "next"
import "@/components/defense/defense.css"

export const metadata: Metadata = {
  title: "Bow & Bastion - 보드게임 도우미",
  description:
    "궁수 챔피언을 직접 조종하고 다양한 방어 타워를 건설해 끝없는 적의 공세를 막아내는 3D 타워 디펜스 게임입니다.",
  openGraph: {
    title: "Bow & Bastion - 보드게임 도우미",
    description:
      "궁수 챔피언을 직접 조종하고 다양한 방어 타워를 건설해 끝없는 적의 공세를 막아내는 3D 타워 디펜스 게임입니다.",
    images: [
      {
        url: "/defense/icon.png",
        width: 200,
        height: 200,
        alt: "Bow & Bastion 디펜스 게임 아이콘",
      },
    ],
    type: "website",
  },
}

export default function DefenseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
