export interface Point {
  x: number // 0 ~ 500 사이의 가상 X 좌표
  y: number // 0 ~ 500 사이의 가상 Y 좌표
}

export interface Dot {
  color: string // 화면에 그릴 색상 코드
  label: string // 알파벳 레이블
  p1: Point // 시작점 좌표
  p2: Point // 끝점 좌표
}

export interface Level {
  id: number
  difficulty: "Easy" | "Medium" | "Hard"
  dotsCount: number // 점의 쌍 개수
  dots: Dot[]
}

export const LEVELS: Level[] = [
  // ==================== EASY (점 3쌍) ====================
  {
    id: 1,
    difficulty: "Easy",
    dotsCount: 3,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 80 },
        p2: { x: 420, y: 420 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 80 },
        p2: { x: 80, y: 420 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 250, y: 165 },
        p2: { x: 250, y: 335 },
      },
    ],
  },
  {
    id: 2,
    difficulty: "Easy",
    dotsCount: 3,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 165 },
        p2: { x: 420, y: 335 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 165 },
        p2: { x: 80, y: 335 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 250, y: 80 },
        p2: { x: 250, y: 420 },
      },
    ],
  },
  {
    id: 3,
    difficulty: "Easy",
    dotsCount: 3,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 80 },
        p2: { x: 335, y: 335 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 80 },
        p2: { x: 165, y: 420 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 250, y: 80 },
        p2: { x: 250, y: 420 },
      },
    ],
  },

  // ==================== MEDIUM (점 4쌍) ====================
  {
    id: 4,
    difficulty: "Medium",
    dotsCount: 4,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 80 },
        p2: { x: 335, y: 335 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 80 },
        p2: { x: 165, y: 420 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 250, y: 80 },
        p2: { x: 250, y: 420 },
      },
      {
        color: "#F59E0B",
        label: "D",
        p1: { x: 80, y: 250 },
        p2: { x: 420, y: 250 },
      },
    ],
  },
  {
    id: 5,
    difficulty: "Medium",
    dotsCount: 4,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 80 },
        p2: { x: 250, y: 165 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 80 },
        p2: { x: 250, y: 335 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 80, y: 420 },
        p2: { x: 420, y: 420 },
      },
      {
        color: "#EC4899",
        label: "D",
        p1: { x: 250, y: 80 },
        p2: { x: 250, y: 420 },
      },
    ],
  },
  {
    id: 6,
    difficulty: "Medium",
    dotsCount: 4,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 80 },
        p2: { x: 420, y: 420 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 80 },
        p2: { x: 80, y: 420 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 250, y: 80 },
        p2: { x: 420, y: 250 },
      },
      {
        color: "#F59E0B",
        label: "D",
        p1: { x: 80, y: 250 },
        p2: { x: 250, y: 420 },
      },
    ],
  },

  // ==================== HARD (점 5~6쌍) ====================
  {
    id: 7,
    difficulty: "Hard",
    dotsCount: 5,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 80 },
        p2: { x: 420, y: 420 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 80 },
        p2: { x: 80, y: 420 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 250, y: 80 },
        p2: { x: 250, y: 420 },
      },
      {
        color: "#F59E0B",
        label: "D",
        p1: { x: 80, y: 250 },
        p2: { x: 420, y: 250 },
      },
      {
        color: "#8B5CF6",
        label: "E",
        p1: { x: 165, y: 165 },
        p2: { x: 335, y: 335 },
      },
    ],
  },
  {
    id: 8,
    difficulty: "Hard",
    dotsCount: 5,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 165, y: 80 },
        p2: { x: 165, y: 420 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 335, y: 80 },
        p2: { x: 335, y: 420 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 80, y: 165 },
        p2: { x: 420, y: 165 },
      },
      {
        color: "#F59E0B",
        label: "D",
        p1: { x: 80, y: 335 },
        p2: { x: 420, y: 335 },
      },
      {
        color: "#8B5CF6",
        label: "E",
        p1: { x: 250, y: 250 },
        p2: { x: 250, y: 80 },
      },
    ],
  },
  {
    id: 9,
    difficulty: "Hard",
    dotsCount: 6,
    dots: [
      {
        color: "#EF4444",
        label: "A",
        p1: { x: 80, y: 80 },
        p2: { x: 420, y: 420 },
      },
      {
        color: "#3B82F6",
        label: "B",
        p1: { x: 420, y: 80 },
        p2: { x: 80, y: 420 },
      },
      {
        color: "#10B981",
        label: "C",
        p1: { x: 250, y: 80 },
        p2: { x: 250, y: 420 },
      },
      {
        color: "#F59E0B",
        label: "D",
        p1: { x: 80, y: 250 },
        p2: { x: 420, y: 250 },
      },
      {
        color: "#8B5CF6",
        label: "E",
        p1: { x: 165, y: 165 },
        p2: { x: 335, y: 165 },
      },
      {
        color: "#06B6D4",
        label: "F",
        p1: { x: 165, y: 335 },
        p2: { x: 335, y: 335 },
      },
    ],
  },
]
