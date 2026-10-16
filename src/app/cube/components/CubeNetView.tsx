"use client"

import {
  type BasicMove,
  type CubieState,
  type FaceId,
  getFaceStickers,
} from "../utils/cubeEngine"
import { type CubeStyleType, StickerGraphic } from "./StickerGraphic"

interface CubeNetViewProps {
  cubies: CubieState[]
  cubeStyle: CubeStyleType
  highlightedCubieIds?: string[]
  onRequestMove?: (move: BasicMove) => void
}

const NET_LAYOUT: (FaceId | null)[][] = [
  [null, "U", null, null],
  ["L", "F", "R", "B"],
  [null, "D", null, null],
]

const FACE_LABELS: Record<FaceId, string> = {
  U: "U (위)",
  D: "D (아래)",
  F: "F (앞)",
  B: "B (뒤)",
  L: "L (왼)",
  R: "R (오른)",
}

export function CubeNetView({
  cubies,
  cubeStyle,
  highlightedCubieIds = [],
  onRequestMove,
}: CubeNetViewProps) {
  const renderFaceGrid = (face: FaceId) => {
    const grid = getFaceStickers(cubies, face)
    const centerRot = grid[1][1].rotation

    return (
      <div
        key={face}
        className="flex flex-col items-center gap-0.5 bg-neutral-900/90 p-1.5 rounded-xl border border-neutral-800 shadow-inner"
      >
        <div className="w-full flex items-center justify-between px-0.5 mb-0.5">
          <span className="text-[10px] font-bold text-neutral-400">
            {FACE_LABELS[face]}
          </span>
          {centerRot !== 0 && (
            <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 px-1 rounded">
              {centerRot}°
            </span>
          )}
        </div>
        <div
          onClick={() => onRequestMove?.(face as BasicMove)}
          onContextMenu={(e) => {
            e.preventDefault()
            onRequestMove?.(`${face}'` as BasicMove)
          }}
          title={`${FACE_LABELS[face]} — 클릭: 시계방향(${face}), 우클릭: 반시계(${face}')`}
          className="grid grid-cols-3 gap-[2px] w-[66px] h-[66px] sm:w-[72px] sm:h-[72px] bg-neutral-950 p-1 rounded-lg cursor-pointer hover:ring-1 hover:ring-amber-400/60 transition-all"
        >
          {grid.flatMap((row, rIdx) =>
            row.map((st, cIdx) => {
              const isHighlighted = highlightedCubieIds.includes(st.cubieId)
              return (
                <div
                  key={`${face}-${rIdx}-${cIdx}`}
                  className={`w-full h-full ${
                    isHighlighted
                      ? "ring-2 ring-amber-400 z-10 rounded-[3px]"
                      : ""
                  }`}
                >
                  <StickerGraphic sticker={st} cubeStyle={cubeStyle} />
                </div>
              )
            }),
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      {NET_LAYOUT.map((row, rIdx) => (
        <div key={rIdx} className="grid grid-cols-4 gap-1.5">
          {row.map((face, cIdx) =>
            face ? (
              renderFaceGrid(face)
            ) : (
              <div
                key={`empty-${rIdx}-${cIdx}`}
                className="w-[78px] sm:w-[84px]"
              />
            ),
          )}
        </div>
      ))}
      <p className="text-[11px] text-neutral-500 mt-1 text-center">
        💡 전개도의 각 면을 클릭하면 시계방향, 우클릭하면 반시계방향으로
        회전합니다.
      </p>
    </div>
  )
}
