// 3x3 큐브 시뮬레이터 핵심 물리/수학 엔진 (Supercube / 방향성 스티커 완벽 지원)

export type FaceId = "U" | "D" | "F" | "B" | "L" | "R"

export type BasicMove =
  | "U"
  | "U'"
  | "U2"
  | "D"
  | "D'"
  | "D2"
  | "F"
  | "F'"
  | "F2"
  | "B"
  | "B'"
  | "B2"
  | "L"
  | "L'"
  | "L2"
  | "R"
  | "R'"
  | "R2"

export type Vec3 = [number, number, number]
// 3x3 정수 회전 행렬 (row-major: 9개 원소)
export type Mat3 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]

export interface CubieState {
  id: string // 초기 좌표 키 예: "1,-1,1"
  initPos: Vec3 // 초기 위치 (x, y, z) in {-1, 0, 1}^3
  pos: Vec3 // 현재 위치 (x, y, z) in {-1, 0, 1}^3
  matrix: Mat3 // 누적 3D 회전 행렬
}

export interface StickerInfo {
  origFace: FaceId
  origRow: number // 0..2
  origCol: number // 0..2
  origIndex: number // 1..9 (origRow * 3 + origCol + 1)
  rotation: 0 | 90 | 180 | 270 // 현재 면 기준 시계방향 회전 각도
  cubieId: string
}

export interface FaceBasis {
  id: FaceId
  nameKo: string
  normal: Vec3
  right: Vec3
  up: Vec3
}

export const FACE_BASIS: Record<FaceId, FaceBasis> = {
  U: {
    id: "U",
    nameKo: "윗면 (U)",
    normal: [0, 1, 0],
    right: [1, 0, 0],
    up: [0, 0, -1],
  },
  D: {
    id: "D",
    nameKo: "아랫면 (D)",
    normal: [0, -1, 0],
    right: [1, 0, 0],
    up: [0, 0, 1],
  },
  F: {
    id: "F",
    nameKo: "앞면 (F)",
    normal: [0, 0, 1],
    right: [1, 0, 0],
    up: [0, 1, 0],
  },
  B: {
    id: "B",
    nameKo: "뒷면 (B)",
    normal: [0, 0, -1],
    right: [-1, 0, 0],
    up: [0, 1, 0],
  },
  L: {
    id: "L",
    nameKo: "왼쪽면 (L)",
    normal: [-1, 0, 0],
    right: [0, 0, 1],
    up: [0, 1, 0],
  },
  R: {
    id: "R",
    nameKo: "오른쪽면 (R)",
    normal: [1, 0, 0],
    right: [0, 0, -1],
    up: [0, 1, 0],
  },
}

export const ALL_FACES: FaceId[] = ["U", "D", "F", "B", "L", "R"]

export const IDENTITY_MAT3: Mat3 = [1, 0, 0, 0, 1, 0, 0, 0, 1]

export function dotVec3(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

export function mulMat3Vec3(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ]
}

export function mulMat3(a: Mat3, b: Mat3): Mat3 {
  return [
    a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
    a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
    a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

    a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
    a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
    a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

    a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
    a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
    a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
  ]
}

export function transposeMat3(m: Mat3): Mat3 {
  return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]]
}

// 각 면을 외부에서 바라보았을 때 시계방향 90도 회전 행렬
// U (y = +1): (x, y, z) -> (-z, y, x)
// D (y = -1): (x, y, z) -> (z, y, -x)
// F (z = +1): (x, y, z) -> (y, -x, z)
// B (z = -1): (x, y, z) -> (-y, x, z)
// L (x = -1): (x, y, z) -> (x, -z, y)
// R (x = +1): (x, y, z) -> (x, z, -y)
const CW_MATRICES: Record<FaceId, Mat3> = {
  U: [0, 0, -1, 0, 1, 0, 1, 0, 0],
  D: [0, 0, 1, 0, 1, 0, -1, 0, 0],
  F: [0, 1, 0, -1, 0, 0, 0, 0, 1],
  B: [0, -1, 0, 1, 0, 0, 0, 0, 1],
  L: [1, 0, 0, 0, 0, -1, 0, 1, 0],
  R: [1, 0, 0, 0, 0, 1, 0, -1, 0],
}

export function getMoveMatrix(move: BasicMove): {
  face: FaceId
  mat: Mat3
  axis: "x" | "y" | "z"
  layerVal: -1 | 1
  angleDeg: number // CSS 3D 또는 오른손 좌표계 회전 각도 참고용
} {
  const face = move[0] as FaceId
  const modifier = move.slice(1) // "", "'", "2"
  const cw = CW_MATRICES[face]
  let mat: Mat3 = cw
  if (modifier === "'") {
    mat = transposeMat3(cw)
  } else if (modifier === "2") {
    mat = mulMat3(cw, cw)
  }

  const axisMap: Record<FaceId, { axis: "x" | "y" | "z"; layerVal: -1 | 1 }> = {
    U: { axis: "y", layerVal: 1 },
    D: { axis: "y", layerVal: -1 },
    F: { axis: "z", layerVal: 1 },
    B: { axis: "z", layerVal: -1 },
    L: { axis: "x", layerVal: -1 },
    R: { axis: "x", layerVal: 1 },
  }

  // 오른손 법칙 기준 각 축의 양의 방향 회전 각도 (참고용)
  // U(+y): 시계방향은 -90도, D(-y): 시계방향은 +90도
  // F(+z): 시계방향은 -90도, B(-z): 시계방향은 +90도
  // R(+x): 시계방향은 -90도, L(-x): 시계방향은 +90도
  const baseDegMap: Record<FaceId, number> = {
    U: -90,
    D: 90,
    F: -90,
    B: 90,
    R: -90,
    L: 90,
  }
  const mult = modifier === "'" ? -1 : modifier === "2" ? 2 : 1

  return {
    face,
    mat,
    axis: axisMap[face].axis,
    layerVal: axisMap[face].layerVal,
    angleDeg: baseDegMap[face] * mult,
  }
}

export function createSolvedCube(): CubieState[] {
  const cubies: CubieState[] = []
  for (const x of [-1, 0, 1]) {
    for (const y of [-1, 0, 1]) {
      for (const z of [-1, 0, 1]) {
        cubies.push({
          id: `${x},${y},${z}`,
          initPos: [x, y, z],
          pos: [x, y, z],
          matrix: [...IDENTITY_MAT3] as Mat3,
        })
      }
    }
  }
  return cubies
}

export function cloneCube(cubies: CubieState[]): CubieState[] {
  return cubies.map((c) => ({
    id: c.id,
    initPos: [...c.initPos] as Vec3,
    pos: [...c.pos] as Vec3,
    matrix: [...c.matrix] as Mat3,
  }))
}

export function applyMove(cubies: CubieState[], move: BasicMove): CubieState[] {
  const { face, mat } = getMoveMatrix(move)
  const normal = FACE_BASIS[face].normal
  return cubies.map((c) => {
    if (dotVec3(c.pos, normal) === 1) {
      return {
        ...c,
        pos: mulMat3Vec3(mat, c.pos),
        matrix: mulMat3(mat, c.matrix),
      }
    }
    return c
  })
}

export function applyMoves(
  cubies: CubieState[],
  moves: BasicMove[] | string,
): CubieState[] {
  const list: BasicMove[] =
    typeof moves === "string" ? parseMoveNotation(moves) : moves
  let state = cubies
  for (const m of list) {
    state = applyMove(state, m)
  }
  return state
}

export function parseMoveNotation(notation: string): BasicMove[] {
  if (!notation.trim()) return []
  const tokens = notation.trim().split(/\s+/)
  const validMoves: BasicMove[] = []
  for (const t of tokens) {
    if (/^[UDFBLR][2']?$/.test(t)) {
      validMoves.push(t as BasicMove)
    }
  }
  return validMoves
}

export function invertMove(move: BasicMove): BasicMove {
  const face = move[0]
  const mod = move.slice(1)
  if (mod === "") return `${face}'` as BasicMove
  if (mod === "'") return face as BasicMove
  return move // "2"
}

export function invertMoves(moves: BasicMove[]): BasicMove[] {
  return [...moves].reverse().map(invertMove)
}

// 특정 면(face)의 3x3 스티커 배열 [row 0..2][col 0..2] 추출
export function getFaceStickers(
  cubies: CubieState[],
  face: FaceId,
): StickerInfo[][] {
  const basis = FACE_BASIS[face]
  const grid: (StickerInfo | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]

  for (const c of cubies) {
    if (dotVec3(c.pos, basis.normal) !== 1) continue

    const col = dotVec3(c.pos, basis.right) + 1
    const row = 1 - dotVec3(c.pos, basis.up)

    // 현재 면의 법선 방향으로 향하고 있는 원래 면(origFace) 찾기
    const invM = transposeMat3(c.matrix)
    const localNormal = mulMat3Vec3(invM, basis.normal)

    let origFace: FaceId = "U"
    for (const fId of ALL_FACES) {
      const fNorm = FACE_BASIS[fId].normal
      if (
        fNorm[0] === localNormal[0] &&
        fNorm[1] === localNormal[1] &&
        fNorm[2] === localNormal[2]
      ) {
        origFace = fId
        break
      }
    }

    const origBasis = FACE_BASIS[origFace]
    const origCol = dotVec3(c.initPos, origBasis.right) + 1
    const origRow = 1 - dotVec3(c.initPos, origBasis.up)

    // 스티커의 원래 상단 벡터(origBasis.up)가 현재 월드에서 어디를 가리키는지 계산
    const worldStickerUp = mulMat3Vec3(c.matrix, origBasis.up)
    let rotation: 0 | 90 | 180 | 270 = 0
    if (dotVec3(worldStickerUp, basis.up) === 1) {
      rotation = 0
    } else if (dotVec3(worldStickerUp, basis.right) === 1) {
      rotation = 90
    } else if (dotVec3(worldStickerUp, basis.up) === -1) {
      rotation = 180
    } else if (dotVec3(worldStickerUp, basis.right) === -1) {
      rotation = 270
    }

    grid[row][col] = {
      origFace,
      origRow,
      origCol,
      origIndex: origRow * 3 + origCol + 1,
      rotation,
      cubieId: c.id,
    }
  }

  return grid as StickerInfo[][]
}

// 큐브가 맞춰졌는지 확인
// checkOrientation이 true이면 그림/방향 큐브(Supercube)로서 모든 스티커/센터의 방향(0도)까지 일치해야 함
export function isCubeSolved(
  cubies: CubieState[],
  checkOrientation = false,
): boolean {
  for (const c of cubies) {
    // 1. 코너/모서리 조각 위치는 항상 초기 위치와 같아야 함 (센터도 기본 위치 고정)
    if (
      c.pos[0] !== c.initPos[0] ||
      c.pos[1] !== c.initPos[1] ||
      c.pos[2] !== c.initPos[2]
    ) {
      return false
    }

    const numNonZero =
      (c.initPos[0] !== 0 ? 1 : 0) +
      (c.initPos[1] !== 0 ? 1 : 0) +
      (c.initPos[2] !== 0 ? 1 : 0)

    if (numNonZero === 0) continue // 코어 조각

    if (checkOrientation || numNonZero >= 2) {
      // 코너/모서리 조각은 항상 회전행렬이 단위행렬이어야 하며,
      // 방향 큐브(checkOrientation=true)일 때는 센터 조각(numNonZero===1)도 단위행렬이어야 함!
      for (let i = 0; i < 9; i++) {
        if (c.matrix[i] !== IDENTITY_MAT3[i]) return false
      }
    }
  }
  return true
}

// 센터 조각 6개의 회전 상태만 확인 (0, 90, 180, 270)
export function getCenterRotations(
  cubies: CubieState[],
): Record<FaceId, 0 | 90 | 180 | 270> {
  const result = {} as Record<FaceId, 0 | 90 | 180 | 270>
  for (const f of ALL_FACES) {
    const stickers = getFaceStickers(cubies, f)
    result[f] = stickers[1][1].rotation
  }
  return result
}

// 연속된 같은 면의 회전 시퀀스를 간소화 (예: ["R", "R"] -> ["R2"], ["U", "U'"] -> [])
export function simplifyMoves(moves: BasicMove[]): BasicMove[] {
  const stack: { face: FaceId; quarterTurns: number }[] = []
  for (const m of moves) {
    const face = m[0] as FaceId
    const mod = m.slice(1)
    const qt = mod === "'" ? 3 : mod === "2" ? 2 : 1
    if (stack.length > 0 && stack[stack.length - 1].face === face) {
      stack[stack.length - 1].quarterTurns =
        (stack[stack.length - 1].quarterTurns + qt) % 4
      if (stack[stack.length - 1].quarterTurns === 0) {
        stack.pop()
      }
    } else {
      stack.push({ face, quarterTurns: qt })
    }
  }
  return stack.map(({ face, quarterTurns }) => {
    if (quarterTurns === 1) return face as BasicMove
    if (quarterTurns === 2) return `${face}2` as BasicMove
    return `${face}'` as BasicMove
  })
}

// 무작위 섞기 시퀀스 생성 (연속 같은 면 또는 반대 면 중복 방지)
export function generateScramble(length = 20): BasicMove[] {
  const faces: FaceId[] = ["U", "D", "F", "B", "L", "R"]
  const opposite: Record<FaceId, FaceId> = {
    U: "D",
    D: "U",
    F: "B",
    B: "F",
    L: "R",
    R: "L",
  }
  const modifiers = ["", "'", "2"]
  const moves: BasicMove[] = []
  let prevFace: FaceId | null = null
  let secondPrevFace: FaceId | null = null

  for (let i = 0; i < length; i++) {
    const candidates = faces.filter((f) => {
      if (f === prevFace) return false
      if (prevFace && f === opposite[prevFace] && f === secondPrevFace) {
        return false
      }
      return true
    })
    const face = candidates[Math.floor(Math.random() * candidates.length)]
    const mod = modifiers[Math.floor(Math.random() * modifiers.length)]
    moves.push(`${face}${mod}` as BasicMove)
    secondPrevFace = prevFace
    prevFace = face
  }
  return moves
}
