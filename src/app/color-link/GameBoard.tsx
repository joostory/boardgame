"use client"

import type React from "react"
import { useRef, useState } from "react"
import type { Dot, Level, Point } from "./levels"

interface GameBoardProps {
  level: Level
  paths: Record<string, Point[]>
  setPaths: React.Dispatch<React.SetStateAction<Record<string, Point[]>>>
  completedColors: string[]
  setCompletedColors: React.Dispatch<React.SetStateAction<string[]>>
  onMove: () => void
  onCrash: () => void // 충돌 즉시 탈락(Game Over) 콜백
}

const VIEW_SIZE = 500
const DOT_RADIUS = 22 // 점의 반경 (지름 44px)

export default function GameBoard({
  level,
  paths,
  setPaths,
  completedColors,
  setCompletedColors,
  onMove,
  onCrash,
}: GameBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragColor, setDragColor] = useState<string | null>(null)
  const [activePath, setActivePath] = useState<Point[]>([])

  const { dots } = level

  // 두 지점 사이의 기하학적 거리 계산
  const getDistance = (p1: Point, p2: Point) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }

  // CCW (Counter-Clockwise) 알고리즘을 이용한 방향 판별 함수
  const ccw = (a: Point, b: Point, c: Point) => {
    const op =
      a.x * b.y + b.x * c.y + c.x * a.y - (a.y * b.x + b.y * c.x + c.y * a.x)
    if (op > 0) return 1
    if (op < 0) return -1
    return 0
  }

  // 두 선분 p1-p2 와 p3-p4가 교차하는지 검사 (CCW 알고리즘)
  const isSegmentIntersecting = (
    p1: Point,
    p2: Point,
    p3: Point,
    p4: Point,
  ): boolean => {
    const ab = ccw(p1, p2, p3) * ccw(p1, p2, p4)
    const cd = ccw(p3, p4, p1) * ccw(p3, p4, p2)

    if (ab === 0 && cd === 0) {
      // 네 점이 일직선상에 있는 경우 범위가 겹치는지 체크
      const minX12 = Math.min(p1.x, p2.x)
      const maxX12 = Math.max(p1.x, p2.x)
      const minX34 = Math.min(p3.x, p4.x)
      const maxX34 = Math.max(p3.x, p4.x)

      const minY12 = Math.min(p1.y, p2.y)
      const maxY12 = Math.max(p1.y, p2.y)
      const minY34 = Math.min(p3.y, p4.y)
      const maxY34 = Math.max(p3.y, p4.y)

      return (
        minX12 <= maxX34 &&
        minX34 <= maxX12 &&
        minY12 <= maxY34 &&
        minY34 <= maxY12
      )
    }

    return ab <= 0 && cd <= 0
  }

  // 마우스/터치 좌표를 500x500 상대 좌표로 변환
  const getRelativeCoords = (
    e: React.PointerEvent<HTMLDivElement>,
  ): Point | null => {
    if (!boardRef.current) return null
    const rect = boardRef.current.getBoundingClientRect()
    const clientX = e.clientX
    const clientY = e.clientY

    const x = ((clientX - rect.left) / rect.width) * VIEW_SIZE
    const y = ((clientY - rect.top) / rect.height) * VIEW_SIZE

    return {
      x: Math.max(0, Math.min(VIEW_SIZE, x)),
      y: Math.max(0, Math.min(VIEW_SIZE, y)),
    }
  }

  // 특정 좌표가 어떤 점(Dot)에 속해있는지 확인
  const getDotAt = (p: Point): { dot: Dot; isP1: boolean } | null => {
    for (const dot of dots) {
      if (getDistance(p, dot.p1) <= DOT_RADIUS) {
        return { dot, isP1: true }
      }
      if (getDistance(p, dot.p2) <= DOT_RADIUS) {
        return { dot, isP1: false }
      }
    }
    return null
  }

  // 강제 드래그 중단 및 상태 초기화 (충돌 시 호출)
  const forceStopDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false)
    setDragColor(null)
    setActivePath([])
    if (boardRef.current) {
      boardRef.current.releasePointerCapture(e.pointerId)
    }
  }

  // 드래그 시작
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const coords = getRelativeCoords(e)
    if (!coords || !boardRef.current) return

    const hit = getDotAt(coords)

    if (hit) {
      const { dot, isP1 } = hit
      boardRef.current.setPointerCapture(e.pointerId)
      setIsDragging(true)
      setDragColor(dot.color)

      const startPoint = isP1 ? dot.p1 : dot.p2
      setActivePath([startPoint])
      onMove()

      // 기존 경로 및 완료 상태 리셋
      setPaths((prev) => {
        const next = { ...prev }
        delete next[dot.color]
        return next
      })
      setCompletedColors((prev) => prev.filter((c) => c !== dot.color))
    }
  }

  // 드래그 중 (교차 충돌 및 점 겹침 방지 -> 감지 시 즉시 탈락)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      !isDragging ||
      !dragColor ||
      activePath.length === 0 ||
      !boardRef.current
    )
      return

    const coords = getRelativeCoords(e)
    if (!coords) return

    const lastPoint = activePath[activePath.length - 1]

    // 포인트 과밀 적재 방지 (최소 4px 이상 이동했을 때만 계산)
    if (getDistance(lastPoint, coords) < 4) return

    // --- 0. 되돌아가기(Backtrack) 검사 ---
    // 왔던 길로 드래그 궤적을 꺾어 뒤로 가져가는 경우, 그 지점까지 선을 지우면서 단축(pop) 처리합니다.
    const BACKTRACK_THRESHOLD = 14
    if (activePath.length >= 2) {
      // 최근 2~5개 이전의 점들을 역순 검사
      const maxBacktrackCheck = Math.max(0, activePath.length - 5)
      for (let i = activePath.length - 2; i >= maxBacktrackCheck; i--) {
        if (getDistance(coords, activePath[i]) <= BACKTRACK_THRESHOLD) {
          // 되돌아가기 감지: 해당 포인트 이후의 궤적을 잘라내고 즉시 리턴
          setActivePath(activePath.slice(0, i + 1))
          return
        }
      }
    }

    const targetDot = dots.find((d) => d.color === dragColor)
    if (!targetDot) return

    const isStartP1 = getDistance(activePath[0], targetDot.p1) < 5
    const targetPartner = isStartP1 ? targetDot.p2 : targetDot.p1

    // --- 1. 다른 색상 점(Dot) 침범 방지 검사 ---
    for (const dot of dots) {
      if (dot.color === dragColor) continue

      // 다른 색상 점들의 반경 내로 진입하면 즉시 탈락(onCrash) 처리!
      if (
        getDistance(coords, dot.p1) <= DOT_RADIUS ||
        getDistance(coords, dot.p2) <= DOT_RADIUS
      ) {
        forceStopDrag(e)
        onCrash()
        return
      }
    }

    // --- 2. 선분 교차(Intersection) 검사 ---
    const newSegment = { p1: lastPoint, p2: coords }

    // 2-a) 자기 자신의 이전 선분들과 교차하는지 검사
    // 되돌아가기(Backtrack) 처리가 최근 3개 포인트까지 커버하므로, 오탐지 방지를 위해 4개 이전 선분부터 검사합니다.
    if (activePath.length >= 5) {
      for (let i = 0; i < activePath.length - 4; i++) {
        if (
          isSegmentIntersecting(
            newSegment.p1,
            newSegment.p2,
            activePath[i],
            activePath[i + 1],
          )
        ) {
          forceStopDrag(e)
          onCrash() // 충돌 탈락!
          return
        }
      }
    }

    // 2-b) 완성되거나 그려진 다른 색상 선분들과 교차하는지 검사
    let intersectWithOther = false
    Object.entries(paths).forEach(([color, path]) => {
      if (color === dragColor || path.length < 2) return

      for (let i = 0; i < path.length - 1; i++) {
        if (
          isSegmentIntersecting(
            newSegment.p1,
            newSegment.p2,
            path[i],
            path[i + 1],
          )
        ) {
          intersectWithOther = true
        }
      }
    })

    if (intersectWithOther) {
      forceStopDrag(e)
      onCrash() // 충돌 탈락!
      return
    }

    // 모든 충돌 검사를 통과한 경우에만 경로에 포인트 추가
    const nextPath = [...activePath, coords]
    setActivePath(nextPath)

    // 짝꿍 점에 도달했는지 확인
    if (getDistance(coords, targetPartner) <= DOT_RADIUS) {
      const finalPath = [...activePath, targetPartner]
      setPaths((prev) => ({ ...prev, [dragColor]: finalPath }))
      setCompletedColors((prev) => {
        if (!prev.includes(dragColor)) {
          return [...prev, dragColor]
        }
        return prev
      })

      // 연결 완성 즉시 드래그 해제
      setIsDragging(false)
      setDragColor(null)
      setActivePath([])
      boardRef.current.releasePointerCapture(e.pointerId)
    }
  }

  // 드래그 끝
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    if (dragColor && activePath.length > 1) {
      setPaths((prev) => ({ ...prev, [dragColor]: activePath }))
    }

    setIsDragging(false)
    setDragColor(null)
    setActivePath([])

    if (boardRef.current) {
      boardRef.current.releasePointerCapture(e.pointerId)
    }
  }

  // SVG 자유 곡선 렌더링
  const renderPath = (
    points: Point[],
    color: string,
    isDraggingThis = false,
  ) => {
    if (points.length < 2) return null

    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`
    }

    return (
      <path
        key={color}
        d={d}
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          filter: `drop-shadow(0 0 4px ${color}aa)`,
          opacity: isDraggingThis ? 0.8 : 1,
          transition: "stroke 0.15s ease",
        }}
      />
    )
  }

  // 네온 광원 이펙트 배경선
  const renderPathBackground = (points: Point[], color: string) => {
    if (points.length < 2) return null

    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`
    }

    return (
      <path
        key={`bg-${color}`}
        d={d}
        stroke={color}
        strokeWidth={32}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          opacity: 0.08,
          filter: "blur(3px)",
        }}
      />
    )
  }

  return (
    <div className="relative w-full max-w-[480px] mx-auto aspect-square select-none">
      <div
        ref={boardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-full bg-zinc-950 border-4 border-zinc-800 rounded-2xl relative overflow-hidden shadow-2xl touch-none cursor-pointer"
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 가이드 격자 무늬 */}
          <defs>
            <pattern
              id="grid-pattern"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#27272a"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                style={{ opacity: 0.5 }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />

          {/* 광원 후광 선 */}
          {Object.entries(paths).map(([color, path]) => {
            if (isDragging && color === dragColor) return null
            return renderPathBackground(path, color)
          })}
          {isDragging &&
            dragColor &&
            renderPathBackground(activePath, dragColor)}

          {/* 실제 연결선 */}
          {Object.entries(paths).map(([color, path]) => {
            if (isDragging && color === dragColor) return null
            return renderPath(path, color)
          })}
          {isDragging && dragColor && renderPath(activePath, dragColor, true)}

          {/* 점(Dot) 레이아웃 */}
          {dots.map((dot, index) => {
            const isCompleted = completedColors.includes(dot.color)

            return (
              <g key={`dots-group-${index}`}>
                {/* 시작점 p1 */}
                <circle
                  cx={dot.p1.x}
                  cy={dot.p1.y}
                  r={DOT_RADIUS}
                  fill={dot.color}
                  style={{
                    filter: `drop-shadow(0 0 10px ${dot.color})`,
                    transform: isCompleted ? "scale(0.88)" : "scale(1)",
                    transformOrigin: `${dot.p1.x}px ${dot.p1.y}px`,
                    opacity: isCompleted ? 0.75 : 1,
                    transition: "all 0.3s ease",
                  }}
                />
                <text
                  x={dot.p1.x}
                  y={dot.p1.y + 5}
                  textAnchor="middle"
                  fill="#000000"
                  fontWeight="bold"
                  fontSize="16"
                  style={{
                    opacity: isCompleted ? 0.75 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {dot.label}
                </text>

                {/* 끝점 p2 */}
                <circle
                  cx={dot.p2.x}
                  cy={dot.p2.y}
                  r={DOT_RADIUS}
                  fill={dot.color}
                  style={{
                    filter: `drop-shadow(0 0 10px ${dot.color})`,
                    transform: isCompleted ? "scale(0.88)" : "scale(1)",
                    transformOrigin: `${dot.p2.x}px ${dot.p2.y}px`,
                    opacity: isCompleted ? 0.75 : 1,
                    transition: "all 0.3s ease",
                  }}
                />
                <text
                  x={dot.p2.x}
                  y={dot.p2.y + 5}
                  textAnchor="middle"
                  fill="#000000"
                  fontWeight="bold"
                  fontSize="16"
                  style={{
                    opacity: isCompleted ? 0.75 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {dot.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
