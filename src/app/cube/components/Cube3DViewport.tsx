"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ALL_FACES,
  type BasicMove,
  type CubieState,
  dotVec3,
  FACE_BASIS,
  type FaceId,
  getFaceStickers,
  type StickerInfo,
  type Vec3,
} from "../utils/cubeEngine"
import { type CubeStyleType, StickerGraphic } from "./StickerGraphic"

export interface ActiveMoveAnimation {
  move: BasicMove
  progress: number // 0 to 1
}

interface Cube3DViewportProps {
  cubies: CubieState[]
  cubeStyle: CubeStyleType
  cameraPitch: number // X축 회전 (기본 -24도)
  cameraYaw: number // Y축 회전 (기본 -36도)
  onCameraChange: (pitch: number, yaw: number) => void
  onRequestMove: (move: BasicMove) => void
  activeMove: BasicMove | null
  highlightedCubieIds?: string[]
  isLocked?: boolean
}

// 각 이동(BasicMove)에 대한 CSS 3D 회전축 및 목표 각도
function getCssSliceTransform(move: BasicMove): {
  face: FaceId
  zeroTransform: string
  targetTransform: string
} {
  const face = move[0] as FaceId
  const mod = move.slice(1)
  const mult = mod === "'" ? -1 : mod === "2" ? 2 : 1

  // CSS 3D 좌표계 (+X 오른쪽, +Y 아래쪽, +Z 앞쪽)
  const map: Record<FaceId, { axis: "X" | "Y" | "Z"; baseDeg: number }> = {
    F: { axis: "Z", baseDeg: 90 },
    B: { axis: "Z", baseDeg: -90 },
    U: { axis: "Y", baseDeg: -90 },
    D: { axis: "Y", baseDeg: 90 },
    R: { axis: "X", baseDeg: 90 },
    L: { axis: "X", baseDeg: -90 },
  }

  const { axis, baseDeg } = map[face]
  const deg = baseDeg * mult
  return {
    face,
    zeroTransform: `rotate${axis}(0deg)`,
    targetTransform: `rotate${axis}(${deg}deg)`,
  }
}

function crossVec3(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

// 월드 벡터(오른손 좌표계: +X 오른쪽, +Y 위쪽, +Z 앞쪽)를 현재 카메라(pitch, yaw) 기준 2D 화면 벡터(dx, dy)로 투영
function projectWorldDirToScreen(
  worldDir: Vec3,
  pitchDeg: number,
  yawDeg: number,
): [number, number] {
  // 월드 -> CSS 3D 변환: cssX = x, cssY = -y, cssZ = z
  const x0 = worldDir[0]
  const y0 = -worldDir[1]
  const z0 = worldDir[2]

  // 1) rotateY(yawDeg): CSS rotateY는 +Z를 +X 방향으로 회전
  const yawRad = (yawDeg * Math.PI) / 180
  const cosY = Math.cos(yawRad)
  const sinY = Math.sin(yawRad)
  const x1 = x0 * cosY + z0 * sinY
  const y1 = y0
  const z1 = -x0 * sinY + z0 * cosY

  // 2) rotateX(pitchDeg): CSS rotateX는 -Y를 -Z 방향(+Z를 -Y 방향)으로 회전
  const pitchRad = (pitchDeg * Math.PI) / 180
  const cosP = Math.cos(pitchRad)
  const sinP = Math.sin(pitchRad)
  const x2 = x1
  const y2 = y1 * cosP - z1 * sinP

  return [x2, y2]
}

export function Cube3DViewport({
  cubies,
  cubeStyle,
  cameraPitch,
  cameraYaw,
  onCameraChange,
  onRequestMove,
  activeMove,
  highlightedCubieIds = [],
  isLocked = false,
}: Cube3DViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 드래그 상태 관리 (배경 드래그 = 시점 회전, 스티커 드래그 = 슬라이스 회전)
  const dragStateRef = useRef<{
    type: "orbit" | "sticker"
    startX: number
    startY: number
    startPitch: number
    startYaw: number
    face?: FaceId
    cubiePos?: Vec3
    triggered?: boolean
  } | null>(null)

  const [isOrbiting, setIsOrbiting] = useState(false)

  // 모든 6개 면의 스티커 정보를 미리 계산하고, 각 현재 위치(pos)별 외곽 면 스티커 맵 생성
  const cubieStickersByPos = useMemo(() => {
    const map = new Map<string, Partial<Record<FaceId, StickerInfo>>>()
    for (const c of cubies) {
      map.set(c.pos.join(","), {})
    }
    for (const face of ALL_FACES) {
      const grid = getFaceStickers(cubies, face)
      const basis = FACE_BASIS[face]
      for (let r = 0; r < 3; r++) {
        for (let col = 0; col < 3; col++) {
          const st = grid[r][col]
          // 해당(face, r, col)의 월드 좌표 역산: pos = normal + (col - 1)*right + (1 - r)*up
          const px =
            basis.normal[0] + (col - 1) * basis.right[0] + (1 - r) * basis.up[0]
          const py =
            basis.normal[1] + (col - 1) * basis.right[1] + (1 - r) * basis.up[1]
          const pz =
            basis.normal[2] + (col - 1) * basis.right[2] + (1 - r) * basis.up[2]
          const key = `${px},${py},${pz}`
          const entry = map.get(key)
          if (entry) {
            entry[face] = st
          }
        }
      }
    }
    return map
  }, [cubies])

  const handleBackgroundPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.button !== 2) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStateRef.current = {
      type: "orbit",
      startX: e.clientX,
      startY: e.clientY,
      startPitch: cameraPitch,
      startYaw: cameraYaw,
    }
    setIsOrbiting(true)
  }

  const handleStickerPointerDown = (
    e: React.PointerEvent,
    face: FaceId,
    pos: Vec3,
  ) => {
    e.stopPropagation()
    if (isLocked || activeMove) return

    // 우클릭이거나 센터 조각(외곽 좌표 합이 1인 중심 조각)을 드래그하면 시점 회전으로 동작하게 할 수도 있으나,
    // 우클릭은 시점 회전, 좌클릭 스티커 드래그는 큐브 면 회전으로 처리 (단, 센터 조각 드래그는 시점 회전!)
    const isCenterCubie =
      Math.abs(pos[0]) + Math.abs(pos[1]) + Math.abs(pos[2]) === 1
    if (e.button === 2 || isCenterCubie) {
      containerRef.current?.setPointerCapture(e.pointerId)
      dragStateRef.current = {
        type: "orbit",
        startX: e.clientX,
        startY: e.clientY,
        startPitch: cameraPitch,
        startYaw: cameraYaw,
      }
      setIsOrbiting(true)
      return
    }

    containerRef.current?.setPointerCapture(e.pointerId)
    dragStateRef.current = {
      type: "sticker",
      startX: e.clientX,
      startY: e.clientY,
      startPitch: cameraPitch,
      startYaw: cameraYaw,
      face,
      cubiePos: pos,
      triggered: false,
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const state = dragStateRef.current
    if (!state) return

    const dx = e.clientX - state.startX
    const dy = e.clientY - state.startY

    if (state.type === "orbit") {
      const nextYaw = state.startYaw + dx * 0.55
      const nextPitch = Math.max(
        -80,
        Math.min(80, state.startPitch - dy * 0.55),
      )
      onCameraChange(nextPitch, nextYaw)
      return
    }

    if (
      state.type === "sticker" &&
      !state.triggered &&
      state.face &&
      state.cubiePos
    ) {
      const dist = Math.hypot(dx, dy)
      if (dist < 22) return

      const basis = FACE_BASIS[state.face]
      const candidates: Vec3[] = [
        basis.right,
        [-basis.right[0], -basis.right[1], -basis.right[2]],
        basis.up,
        [-basis.up[0], -basis.up[1], -basis.up[2]],
      ]

      // 화면 드래그 벡터 (dx, dy)와 가장 내적이 큰 접선 방향 d 선택
      let bestDir: Vec3 = basis.right
      let bestScore = -Infinity
      for (const cand of candidates) {
        const [sx, sy] = projectWorldDirToScreen(cand, cameraPitch, cameraYaw)
        const len = Math.hypot(sx, sy) || 1
        const score = (dx * sx + dy * sy) / len
        if (score > bestScore) {
          bestScore = score
          bestDir = cand
        }
      }

      // 토크 회전축 omega = n_face x bestDir
      const omega = crossVec3(basis.normal, bestDir)
      const absAxis: Vec3 = [
        Math.abs(omega[0]),
        Math.abs(omega[1]),
        Math.abs(omega[2]),
      ]
      const layerCoord = dotVec3(state.cubiePos, absAxis)

      let targetMove: BasicMove | null = null

      if (layerCoord === 1 || layerCoord === -1) {
        const targetNormal: Vec3 = [
          omega[0] !== 0 ? layerCoord : 0,
          omega[1] !== 0 ? layerCoord : 0,
          omega[2] !== 0 ? layerCoord : 0,
        ]
        const targetFace = ALL_FACES.find((f) => {
          const n = FACE_BASIS[f].normal
          return (
            n[0] === targetNormal[0] &&
            n[1] === targetNormal[1] &&
            n[2] === targetNormal[2]
          )
        })
        if (targetFace) {
          const isCCW = dotVec3(omega, targetNormal) === 1
          targetMove = (isCCW ? `${targetFace}'` : targetFace) as BasicMove
        }
      } else {
        // 중간줄 모서리에서 면 테두리 방향으로 드래그한 경우 해당 면(state.face) 자체를 회전
        const relPos: Vec3 = [
          state.cubiePos[0] - basis.normal[0],
          state.cubiePos[1] - basis.normal[1],
          state.cubiePos[2] - basis.normal[2],
        ]
        const faceTorque = crossVec3(relPos, bestDir)
        const dotFace = dotVec3(faceTorque, basis.normal)
        if (dotFace !== 0) {
          targetMove = (
            dotFace > 0 ? `${state.face}'` : state.face
          ) as BasicMove
        }
      }

      if (targetMove) {
        state.triggered = true
        onRequestMove(targetMove)
      }
    }
  }

  const handlePointerUp = () => {
    dragStateRef.current = null
    setIsOrbiting(false)
  }

  // 큐비 1개의 크기(px) 및 간격
  const CUBIE_SIZE = 66
  const HALF = CUBIE_SIZE / 2

  const activeSliceInfo = activeMove ? getCssSliceTransform(activeMove) : null
  const activeNormal = activeSliceInfo
    ? FACE_BASIS[activeSliceInfo.face].normal
    : null

  const renderCubie = (c: CubieState) => {
    const [x, y, z] = c.pos
    const cssX = x * CUBIE_SIZE
    const cssY = -y * CUBIE_SIZE
    const cssZ = z * CUBIE_SIZE
    const posKey = `${x},${y},${z}`
    const stickers = cubieStickersByPos.get(posKey) || {}
    const isHighlighted = highlightedCubieIds.includes(c.id)

    const faceConfigs: {
      face: FaceId
      transform: string
    }[] = [
      { face: "F", transform: `translateZ(${HALF}px)` },
      { face: "B", transform: `rotateY(180deg) translateZ(${HALF}px)` },
      { face: "R", transform: `rotateY(90deg) translateZ(${HALF}px)` },
      { face: "L", transform: `rotateY(-90deg) translateZ(${HALF}px)` },
      { face: "U", transform: `rotateX(90deg) translateZ(${HALF}px)` },
      { face: "D", transform: `rotateX(-90deg) translateZ(${HALF}px)` },
    ]

    return (
      <div
        key={c.id}
        style={{
          width: `${CUBIE_SIZE}px`,
          height: `${CUBIE_SIZE}px`,
          transformStyle: "preserve-3d",
          transform: `translate3d(${cssX}px, ${cssY}px, ${cssZ}px)`,
        }}
        className="absolute top-1/2 left-1/2 -ml-[33px] -mt-[33px]"
      >
        {faceConfigs.map(({ face, transform }) => {
          const st = stickers[face]
          return (
            <div
              key={face}
              onPointerDown={
                st ? (e) => handleStickerPointerDown(e, face, c.pos) : undefined
              }
              style={{
                width: `${CUBIE_SIZE}px`,
                height: `${CUBIE_SIZE}px`,
                transform,
                backfaceVisibility: "hidden",
              }}
              className={`absolute inset-0 p-[3.5px] rounded-[10px] bg-neutral-950 border border-neutral-800/80 transition-shadow ${
                st ? "cursor-grab active:cursor-grabbing" : ""
              } ${
                isHighlighted && st
                  ? "ring-2 ring-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.85)]"
                  : ""
              }`}
            >
              {st ? (
                <StickerGraphic sticker={st} cubeStyle={cubeStyle} />
              ) : (
                <div className="w-full h-full rounded-[8px] bg-neutral-900" />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const [animStarted, setAnimStarted] = useState(false)

  useEffect(() => {
    if (!activeMove) {
      setAnimStarted(false)
      return
    }
    setAnimStarted(false)
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setAnimStarted(true)
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [activeMove])

  const staticCubies = cubies.filter(
    (c) => !activeNormal || dotVec3(c.pos, activeNormal) !== 1,
  )
  const rotatingCubies = cubies.filter(
    (c) => activeNormal && dotVec3(c.pos, activeNormal) === 1,
  )

  return (
    <div
      ref={containerRef}
      onPointerDown={handleBackgroundPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative w-full h-[360px] sm:h-[420px] flex items-center justify-center select-none touch-none overflow-hidden rounded-2xl ${
        isOrbiting ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        perspective: "950px",
        background:
          "radial-gradient(circle at 50% 45%, rgba(38, 38, 38, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)",
      }}
    >
      {/* 상단/좌측 면 방향 가이드 라벨 */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 pointer-events-none z-10">
        <span className="text-[11px] bg-neutral-900/80 border border-neutral-700/70 text-neutral-300 px-2.5 py-1 rounded-full backdrop-blur-xs">
          🖱️ 빈 공간·중심 드래그: 시점 360° 회전
        </span>
        <span className="text-[11px] bg-neutral-900/80 border border-neutral-700/70 text-amber-300/90 px-2.5 py-1 rounded-full backdrop-blur-xs">
          👆 큐브 조각 드래그: 해당 줄 회전
        </span>
      </div>

      {/* 현재 실행 중인 회전 기호 배지 */}
      {activeMove && (
        <div className="absolute bottom-3 right-3 bg-amber-500 text-neutral-950 font-black text-base px-3.5 py-1 rounded-xl shadow-lg pointer-events-none z-10 animate-in fade-in zoom-in duration-100">
          회전: {activeMove}
        </div>
      )}

      {/* 3D 씬 루트 */}
      <div
        style={{
          width: "0px",
          height: "0px",
          transformStyle: "preserve-3d",
          transform: `rotateX(${cameraPitch}deg) rotateY(${cameraYaw}deg)`,
          transition: isOrbiting ? "none" : "transform 180ms ease-out",
        }}
        className="relative"
      >
        {/* 고정된 큐비들 */}
        {staticCubies.map(renderCubie)}

        {/* 현재 회전 애니메이션 중인 슬라이스 그룹 */}
        <div
          style={{
            width: "0px",
            height: "0px",
            transformStyle: "preserve-3d",
            transform: activeSliceInfo
              ? animStarted
                ? activeSliceInfo.targetTransform
                : activeSliceInfo.zeroTransform
              : "rotateX(0deg)",
            transition:
              activeSliceInfo && animStarted
                ? "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
          }}
          className="absolute top-0 left-0"
        >
          {rotatingCubies.map(renderCubie)}
        </div>
      </div>
    </div>
  )
}
