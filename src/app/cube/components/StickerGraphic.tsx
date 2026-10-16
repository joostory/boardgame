"use client"

import type React from "react"
import type { FaceId, StickerInfo } from "../utils/cubeEngine"

export type CubeStyleType =
  | "classic"
  | "picture"
  | "supercube"
  | "numbers"
  | "pastel"

export interface CubeStyleConfig {
  id: CubeStyleType
  name: string
  shortName: string
  badge: string
  hasOrientation: boolean
  description: string
}

export const CUBE_STYLES: CubeStyleConfig[] = [
  {
    id: "classic",
    name: "클래식 컬러 큐브",
    shortName: "클래식 색상",
    badge: "색상 전용",
    hasOrientation: false,
    description:
      "가장 기본이 되는 6색 정통 루빅스 큐브입니다. 면의 색상만 일치하면 완성됩니다.",
  },
  {
    id: "picture",
    name: "일러스트 그림 큐브",
    shortName: "일러스트 그림",
    badge: "방향 있음",
    hasOrientation: true,
    description:
      "6개의 면마다 고양이, 로켓, 바다, 숲 등 3×3로 이어지는 그림이 그려져 있습니다. 중심 조각의 그림 방향까지 똑바로 맞춰야 완성됩니다!",
  },
  {
    id: "supercube",
    name: "슈퍼큐브 (화살표 방향)",
    shortName: "화살표 슈퍼큐브",
    badge: "방향 있음",
    hasOrientation: true,
    description:
      "모든 조각에 위쪽(▲)을 가리키는 화살표와 나침반이 표시되어 있어 공식 적용 시 조각과 센터의 회전 방향을 한눈에 학습할 수 있습니다.",
  },
  {
    id: "numbers",
    name: "숫자 매트릭스 큐브 (1~9)",
    shortName: "숫자 1~9",
    badge: "방향 있음",
    hasOrientation: true,
    description:
      "각 면이 1번부터 9번까지의 숫자 타일로 이루어져 있어 각 조각의 원래 위치(1~9)와 상하 방향을 직관적으로 파악할 수 있습니다.",
  },
  {
    id: "pastel",
    name: "파스텔 마카롱 큐브",
    shortName: "파스텔 컬러",
    badge: "색상 전용",
    hasOrientation: false,
    description:
      "눈이 편안한 파스텔 톤 배색의 감성 컬러 큐브입니다. 방향 제약 없이 색상만 맞추면 완성됩니다.",
  },
]

export const FACE_COLORS: Record<
  "classic" | "pastel",
  Record<FaceId, { bg: string; border: string; text: string; nameKo: string }>
> = {
  classic: {
    U: {
      bg: "#facc15",
      border: "#ca8a04",
      text: "#1c1917",
      nameKo: "노랑(위)",
    },
    D: {
      bg: "#f8fafc",
      border: "#94a3b8",
      text: "#0f172a",
      nameKo: "하양(아래)",
    },
    F: {
      bg: "#ef4444",
      border: "#b91c1c",
      text: "#ffffff",
      nameKo: "빨강(앞)",
    },
    B: {
      bg: "#f97316",
      border: "#c2410c",
      text: "#ffffff",
      nameKo: "주황(뒤)",
    },
    L: {
      bg: "#22c55e",
      border: "#15803d",
      text: "#ffffff",
      nameKo: "초록(왼)",
    },
    R: {
      bg: "#3b82f6",
      border: "#1d4ed8",
      text: "#ffffff",
      nameKo: "파랑(오른)",
    },
  },
  pastel: {
    U: {
      bg: "#fde68a",
      border: "#f59e0b",
      text: "#451a03",
      nameKo: "크림옐로(위)",
    },
    D: {
      bg: "#f1f5f9",
      border: "#94a3b8",
      text: "#1e293b",
      nameKo: "밀크화이트(아래)",
    },
    F: {
      bg: "#fda4af",
      border: "#f43f5e",
      text: "#4c0519",
      nameKo: "코랄핑크(앞)",
    },
    B: {
      bg: "#fdba74",
      border: "#ea580c",
      text: "#431407",
      nameKo: "피치오렌지(뒤)",
    },
    L: {
      bg: "#86efac",
      border: "#16a34a",
      text: "#052e16",
      nameKo: "민트그린(왼)",
    },
    R: {
      bg: "#93c5fd",
      border: "#2563eb",
      text: "#172554",
      nameKo: "스카이블루(오른)",
    },
  },
}

// 6개 면의 300x300 전체 일러스트 SVG 렌더링 (각 타일은 viewBox로 자신의 100x100 영역만 표시)
function renderFaceArtwork(face: FaceId): React.ReactNode {
  switch (face) {
    case "U": // 노랑: 빛나는 태양과 무지개 구름
      return (
        <g>
          <rect width="300" height="300" fill="#fef08a" />
          {/* 무지개 아치 */}
          <circle
            cx="150"
            cy="260"
            r="150"
            fill="none"
            stroke="#f87171"
            strokeWidth="16"
            opacity="0.7"
          />
          <circle
            cx="150"
            cy="260"
            r="134"
            fill="none"
            stroke="#fb923c"
            strokeWidth="16"
            opacity="0.7"
          />
          <circle
            cx="150"
            cy="260"
            r="118"
            fill="none"
            stroke="#4ade80"
            strokeWidth="16"
            opacity="0.7"
          />
          <circle
            cx="150"
            cy="260"
            r="102"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="16"
            opacity="0.7"
          />
          {/* 태양 광선 */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (deg) => (
              <line
                key={deg}
                x1="150"
                y1="135"
                x2={150 + 95 * Math.cos((deg * Math.PI) / 180)}
                y2={135 + 95 * Math.sin((deg * Math.PI) / 180)}
                stroke="#f59e0b"
                strokeWidth="10"
                strokeLinecap="round"
              />
            ),
          )}
          {/* 태양 본체 & 표정 */}
          <circle
            cx="150"
            cy="135"
            r="62"
            fill="#facc15"
            stroke="#ea580c"
            strokeWidth="6"
          />
          <circle cx="130" cy="122" r="7" fill="#7c2d12" />
          <circle cx="170" cy="122" r="7" fill="#7c2d12" />
          <path
            d="M 128 145 Q 150 165 172 145"
            fill="none"
            stroke="#7c2d12"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* 하단 구름 */}
          <path
            d="M 45 255 Q 45 220 80 220 Q 100 195 135 210 Q 165 190 195 215 Q 235 210 245 245 Q 260 270 230 275 L 65 275 Q 40 275 45 255 Z"
            fill="#ffffff"
            stroke="#eab308"
            strokeWidth="5"
          />
          <text
            x="150"
            y="42"
            textAnchor="middle"
            fontSize="24"
            fontWeight="900"
            fill="#b45309"
          >
            ▲ TOP SUN
          </text>
        </g>
      )

    case "F": // 빨강: 귀여운 복고양이 얼굴
      return (
        <g>
          <rect width="300" height="300" fill="#fee2e2" />
          {/* 배경 방사형 패턴 */}
          <circle cx="150" cy="150" r="135" fill="#fecaca" />
          {/* 고양이 귀 */}
          <polygon
            points="55,125 45,35 125,80"
            fill="#ef4444"
            stroke="#7f1d1d"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <polygon points="65,110 60,55 110,85" fill="#fda4af" />
          <polygon
            points="245,125 255,35 175,80"
            fill="#ef4444"
            stroke="#7f1d1d"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <polygon points="235,110 240,55 190,85" fill="#fda4af" />
          {/* 고양이 얼굴 본체 */}
          <ellipse
            cx="150"
            cy="165"
            rx="105"
            ry="92"
            fill="#ef4444"
            stroke="#7f1d1d"
            strokeWidth="6"
          />
          {/* 이마 줄무늬 */}
          <path
            d="M 150 78 L 150 110 M 128 84 L 134 108 M 172 84 L 166 108"
            stroke="#7f1d1d"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* 눈 */}
          <circle cx="108" cy="150" r="18" fill="#ffffff" />
          <circle cx="110" cy="150" r="10" fill="#1c1917" />
          <circle cx="105" cy="145" r="4" fill="#ffffff" />
          <circle cx="192" cy="150" r="18" fill="#ffffff" />
          <circle cx="190" cy="150" r="10" fill="#1c1917" />
          <circle cx="185" cy="145" r="4" fill="#ffffff" />
          {/* 코와 입 */}
          <polygon points="150,178 138,165 162,165" fill="#fde047" />
          <path
            d="M 150 178 Q 135 200 118 190 M 150 178 Q 165 200 182 190"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* 수염 */}
          <path
            d="M 30 160 L 82 170 M 25 182 L 80 182 M 32 204 L 84 194"
            stroke="#7f1d1d"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 270 160 L 218 170 M 275 182 L 220 182 M 268 204 L 216 194"
            stroke="#7f1d1d"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* 목걸이 & 방울 */}
          <path
            d="M 85 238 Q 150 265 215 238"
            fill="none"
            stroke="#22c55e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle
            cx="150"
            cy="255"
            r="16"
            fill="#facc15"
            stroke="#854d0e"
            strokeWidth="4"
          />
        </g>
      )

    case "R": // 파랑: 바다 위 요트와 고래
      return (
        <g>
          <rect width="300" height="300" fill="#dbeafe" />
          {/* 상단 갈매기 & 태양 */}
          <circle cx="65" cy="60" r="24" fill="#fde047" />
          <path
            d="M 185 55 Q 200 40 215 55 Q 230 40 245 55"
            fill="none"
            stroke="#1e40af"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* 요트 돛 (위쪽 방향성 명확) */}
          <polygon
            points="150,35 150,175 70,175"
            fill="#3b82f6"
            stroke="#1e3a8a"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <polygon
            points="160,55 160,175 230,175"
            fill="#60a5fa"
            stroke="#1e3a8a"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* 깃발 */}
          <polygon points="150,35 185,45 150,55" fill="#ef4444" />
          {/* 선체 */}
          <polygon
            points="55,182 245,182 215,222 85,222"
            fill="#1d4ed8"
            stroke="#172554"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* 바다 물결 */}
          <path
            d="M 0 220 Q 37 200 75 220 T 150 220 T 225 220 T 300 220 L 300 300 L 0 300 Z"
            fill="#2563eb"
          />
          <path
            d="M 0 255 Q 37 235 75 255 T 150 255 T 225 255 T 300 255 L 300 300 L 0 300 Z"
            fill="#1e40af"
          />
          <text
            x="150"
            y="282"
            textAnchor="middle"
            fontSize="22"
            fontWeight="900"
            fill="#bfdbfe"
          >
            OCEAN SAIL
          </text>
        </g>
      )

    case "L": // 초록: 푸른 산봉우리와 큰 소나무
      return (
        <g>
          <rect width="300" height="300" fill="#dcfce7" />
          {/* 뒷산 */}
          <polygon points="0,240 95,95 200,240" fill="#86efac" />
          <polygon points="100,240 215,85 300,240" fill="#4ade80" />
          {/* 산꼭대기 만년설 */}
          <polygon points="215,85 185,130 245,130" fill="#ffffff" />
          {/* 중앙 큰 침엽수 (3단 삼각형) */}
          <rect
            x="134"
            y="215"
            width="32"
            height="65"
            fill="#78350f"
            stroke="#451a03"
            strokeWidth="4"
          />
          <polygon
            points="150,115 60,225 240,225"
            fill="#15803d"
            stroke="#052e16"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <polygon
            points="150,72 75,172 225,172"
            fill="#16a34a"
            stroke="#052e16"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <polygon
            points="150,30 92,120 208,120"
            fill="#22c55e"
            stroke="#052e16"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* 꼭대기 별 */}
          <circle
            cx="150"
            cy="30"
            r="10"
            fill="#facc15"
            stroke="#b45309"
            strokeWidth="3"
          />
          {/* 잔디 바닥 */}
          <rect x="0" y="268" width="300" height="32" fill="#14532d" />
        </g>
      )

    case "B": // 주황: 우주를 나는 로켓
      return (
        <g>
          <rect width="300" height="300" fill="#ffedd5" />
          <circle cx="150" cy="150" r="130" fill="#fed7aa" />
          {/* 별 장식 */}
          <circle cx="55" cy="65" r="8" fill="#f97316" />
          <circle cx="245" cy="75" r="10" fill="#ea580c" />
          <circle cx="60" cy="215" r="7" fill="#ea580c" />
          <circle cx="240" cy="205" r="9" fill="#f97316" />
          {/* 로켓 날개 */}
          <polygon
            points="105,165 55,225 115,215"
            fill="#c2410c"
            stroke="#7c2d12"
            strokeWidth="5"
          />
          <polygon
            points="195,165 245,225 185,215"
            fill="#c2410c"
            stroke="#7c2d12"
            strokeWidth="5"
          />
          {/* 로켓 분사 불꽃 (아래쪽) */}
          <polygon
            points="120,215 150,285 180,215"
            fill="#ef4444"
            stroke="#991b1b"
            strokeWidth="4"
          />
          <polygon points="132,215 150,262 168,215" fill="#facc15" />
          {/* 로켓 몸체 (위쪽을 향함) */}
          <path
            d="M 150 28 Q 205 95 195 215 L 105 215 Q 95 95 150 28 Z"
            fill="#f97316"
            stroke="#7c2d12"
            strokeWidth="6"
          />
          {/* 로켓 노즈콘 */}
          <path
            d="M 150 28 Q 178 65 184 95 L 116 95 Q 122 65 150 28 Z"
            fill="#dc2626"
          />
          {/* 로켓 창문 */}
          <circle
            cx="150"
            cy="145"
            r="26"
            fill="#bae6fd"
            stroke="#7c2d12"
            strokeWidth="6"
          />
        </g>
      )
    default:
      return (
        <g>
          <rect width="300" height="300" fill="#f1f5f9" />
          <circle cx="150" cy="155" r="132" fill="#e2e8f0" />
          {/* 눈사람 아래 몸통 */}
          <circle
            cx="150"
            cy="210"
            r="68"
            fill="#ffffff"
            stroke="#475569"
            strokeWidth="6"
          />
          {/* 단추 */}
          <circle cx="150" cy="188" r="7" fill="#ef4444" />
          <circle cx="150" cy="212" r="7" fill="#3b82f6" />
          <circle cx="150" cy="236" r="7" fill="#22c55e" />
          {/* 눈사람 머리 */}
          <circle
            cx="150"
            cy="115"
            r="48"
            fill="#ffffff"
            stroke="#475569"
            strokeWidth="6"
          />
          {/* 빨간 목도리 */}
          <path
            d="M 110 152 Q 150 168 190 152"
            fill="none"
            stroke="#ef4444"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 172 156 L 182 202"
            stroke="#ef4444"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* 눈 & 당근 코 */}
          <circle cx="133" cy="102" r="6" fill="#0f172a" />
          <circle cx="167" cy="102" r="6" fill="#0f172a" />
          <polygon points="150,110 192,118 150,124" fill="#f97316" />
          {/* 실크햇 모자 (위쪽 구분) */}
          <rect x="105" y="62" width="90" height="12" rx="5" fill="#1e293b" />
          <rect x="120" y="24" width="60" height="42" rx="4" fill="#1e293b" />
          <rect x="120" y="52" width="60" height="8" fill="#ef4444" />
        </g>
      )
  }
}

interface StickerGraphicProps {
  sticker: StickerInfo
  cubeStyle: CubeStyleType
  className?: string
}

export function StickerGraphic({
  sticker,
  cubeStyle,
  className = "",
}: StickerGraphicProps) {
  const palette =
    cubeStyle === "pastel" ? FACE_COLORS.pastel : FACE_COLORS.classic
  const colorInfo = palette[sticker.origFace]
  const isCenter = sticker.origRow === 1 && sticker.origCol === 1

  if (cubeStyle === "classic" || cubeStyle === "pastel") {
    return (
      <div
        className={`w-full h-full rounded-[14%] relative overflow-hidden select-none ${className}`}
        style={{
          backgroundColor: colorInfo.bg,
          boxShadow:
            "inset 0 2px 5px rgba(255,255,255,0.45), inset 0 -2px 5px rgba(0,0,0,0.25)",
          border: `1.5px solid ${colorInfo.border}`,
        }}
      >
        {isCenter && (
          <div className="w-full h-full flex items-center justify-center opacity-35">
            <span
              className="text-[10px] font-black tracking-tighter"
              style={{ color: colorInfo.text }}
            >
              {sticker.origFace}
            </span>
          </div>
        )}
      </div>
    )
  }

  if (cubeStyle === "picture") {
    return (
      <div
        className={`w-full h-full rounded-[14%] relative overflow-hidden select-none ${className}`}
        style={{
          backgroundColor: colorInfo.bg,
          border: `1.5px solid ${colorInfo.border}`,
          transform: `rotate(${sticker.rotation}deg)`,
        }}
      >
        <svg
          viewBox={`${sticker.origCol * 100} ${sticker.origRow * 100} 100 100`}
          className="w-full h-full block"
          preserveAspectRatio="xMidYMid slice"
        >
          {renderFaceArtwork(sticker.origFace)}
        </svg>
        {/* 센터 조각에 현재 회전 각도가 0도가 아닐 때 작은 배지 표시 */}
        {isCenter && sticker.rotation !== 0 && (
          <div className="absolute bottom-0.5 right-0.5 bg-black/75 text-amber-300 text-[8px] font-extrabold px-1 rounded leading-tight">
            {sticker.rotation}°
          </div>
        )}
      </div>
    )
  }

  if (cubeStyle === "supercube") {
    return (
      <div
        className={`w-full h-full rounded-[14%] relative overflow-hidden select-none flex items-center justify-center ${className}`}
        style={{
          backgroundColor: colorInfo.bg,
          border: `1.5px solid ${colorInfo.border}`,
          boxShadow:
            "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.25)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ transform: `rotate(${sticker.rotation}deg)` }}
        >
          {isCenter ? (
            <g>
              {/* 센터 나침반 링 & 큰 방향 화살표 */}
              <circle
                cx="50"
                cy="54"
                r="34"
                fill="none"
                stroke={colorInfo.text}
                strokeWidth="5"
                strokeDasharray="10 6"
                opacity="0.7"
              />
              <polygon
                points="50,8 78,52 60,52 60,84 40,84 40,52 22,52"
                fill={colorInfo.text}
              />
              <text
                x="50"
                y="76"
                textAnchor="middle"
                fontSize="22"
                fontWeight="900"
                fill={colorInfo.bg}
              >
                {sticker.origFace}
              </text>
            </g>
          ) : (
            <g>
              {/* 일반 조각 화살표 + 원래 면/번호 표시 */}
              <polygon
                points="50,12 74,44 58,44 58,82 42,82 42,44 26,44"
                fill={colorInfo.text}
                opacity="0.88"
              />
              <text
                x="50"
                y="74"
                textAnchor="middle"
                fontSize="20"
                fontWeight="900"
                fill={colorInfo.bg}
              >
                {sticker.origIndex}
              </text>
            </g>
          )}
        </svg>
      </div>
    )
  }

  // numbers: 숫자 1~9 매트릭스 큐브
  return (
    <div
      className={`w-full h-full rounded-[14%] relative overflow-hidden select-none ${className}`}
      style={{
        backgroundColor: colorInfo.bg,
        border: `1.5px solid ${colorInfo.border}`,
        boxShadow:
          "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.25)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: `rotate(${sticker.rotation}deg)` }}
      >
        {/* 상단 방향 표시 삼각 탭 */}
        <polygon
          points="50,6 64,20 36,20"
          fill={colorInfo.text}
          opacity="0.85"
        />
        {/* 중앙 큰 숫자 (1~9) */}
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fontSize="48"
          fontWeight="900"
          fill={colorInfo.text}
        >
          {sticker.origIndex}
        </text>
        {/* 하단 밑줄 (6과 9 등 상하 구분용) */}
        <rect
          x="30"
          y="78"
          width="40"
          height="6"
          rx="3"
          fill={colorInfo.text}
          opacity="0.8"
        />
        {/* 좌상단 면 기호 */}
        <text
          x="18"
          y="26"
          fontSize="16"
          fontWeight="800"
          fill={colorInfo.text}
          opacity="0.75"
        >
          {sticker.origFace}
        </text>
      </svg>
    </div>
  )
}
