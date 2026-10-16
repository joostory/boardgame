import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "3×3 큐브 시뮬레이터 - 보드게임 도우미",
  description:
    "클래식 컬러 큐브부터 방향이 있는 일러스트 그림 큐브, 화살표 슈퍼큐브까지! 섞기부터 단계별 해법 분석 및 공식 연습을 제공하는 3D 큐브 시뮬레이터입니다.",
  openGraph: {
    title: "3×3 큐브 시뮬레이터 - 보드게임 도우미",
    description:
      "클래식 컬러 큐브부터 방향이 있는 일러스트 그림 큐브, 화살표 슈퍼큐브까지! 섞기부터 단계별 해법 분석 및 공식 연습을 제공하는 3D 큐브 시뮬레이터입니다.",
    images: [
      {
        url: "/cube/icon.png",
        width: 500,
        height: 500,
        alt: "3×3 큐브 시뮬레이터 아이콘",
      },
    ],
    type: "website",
  },
}

export default function CubeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
