import {
  ALL_FACES,
  applyMove,
  applyMoves,
  type BasicMove,
  type CubieState,
  cloneCube,
  createSolvedCube,
  FACE_BASIS,
  type FaceId,
  getCenterRotations,
  IDENTITY_MAT3,
  isCubeSolved,
  mulMat3Vec3,
  parseMoveNotation,
  simplifyMoves,
  type Vec3,
} from "./cubeEngine"

export interface SolutionSubStep {
  title: string
  description: string
  formulaName?: string
  moves: BasicMove[]
  targetCubieIds?: string[]
}

export interface SolutionStage {
  stageNumber: number
  stageId: string
  title: string
  summary: string
  subSteps: SolutionSubStep[]
  totalMoves: BasicMove[]
}

export interface FullSolution {
  isAlreadySolved: boolean
  stages: SolutionStage[]
  allMoves: BasicMove[]
}

function isSameVec3(a: Vec3, b: Vec3): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}

function isIdentityMat(m: number[]): boolean {
  for (let i = 0; i < 9; i++) {
    if (m[i] !== IDENTITY_MAT3[i]) return false
  }
  return true
}

function isCubieSolved(cubies: CubieState[], id: string): boolean {
  const c = cubies.find((x) => x.id === id)
  if (!c) return false
  return isSameVec3(c.pos, c.initPos) && isIdentityMat(c.matrix)
}

function isCubieInHomePosition(cubies: CubieState[], id: string): boolean {
  const c = cubies.find((x) => x.id === id)
  if (!c) return false
  return isSameVec3(c.pos, c.initPos)
}

// 특정 큐비의 원래 U(또는 D) 스티커가 현재 어느 월드 방향을 바라보는지 반환
function getCubieStickerWorldNormal(cubie: CubieState, origFace: FaceId): Vec3 {
  return mulMat3Vec3(cubie.matrix, FACE_BASIS[origFace].normal)
}

// 1단계: 바닥면(D) 십자가 모서리 1개씩 BFS 탐색 (D면을 돌리지 않고 U, F, R, B, L만 사용)
const CROSS_MOVES: BasicMove[] = [
  "U",
  "U'",
  "U2",
  "F",
  "F'",
  "F2",
  "R",
  "R'",
  "R2",
  "B",
  "B'",
  "B2",
  "L",
  "L'",
  "L2",
]

function solveCrossEdgeBFS(
  startCube: CubieState[],
  targetIds: string[],
): BasicMove[] {
  if (targetIds.every((id) => isCubieSolved(startCube, id))) {
    return []
  }

  // 상태 인코딩: targetIds 큐비들의 (pos, matrix) 문자열
  const encode = (cube: CubieState[]) =>
    targetIds
      .map((id) => {
        const c = cube.find((x) => x.id === id)!
        return `${c.pos.join(",")}:${c.matrix.join(",")}`
      })
      .join("|")

  const queue: { cube: CubieState[]; moves: BasicMove[] }[] = [
    { cube: startCube, moves: [] },
  ]
  const visited = new Set<string>([encode(startCube)])

  while (queue.length > 0) {
    const { cube, moves } = queue.shift()!
    if (moves.length >= 7) continue

    const lastFace = moves.length > 0 ? moves[moves.length - 1][0] : null

    for (const m of CROSS_MOVES) {
      if (m[0] === lastFace) continue
      const nextCube = applyMove(cube, m)
      if (targetIds.every((id) => isCubieSolved(nextCube, id))) {
        return [...moves, m]
      }
      const key = encode(nextCube)
      if (!visited.has(key)) {
        visited.add(key)
        queue.push({ cube: nextCube, moves: [...moves, m] })
      }
    }
  }

  return []
}

// 십자가를 유지하면서 특정 옆면(F, R, B, L) 센터만 +90도 또는 -90도 회전시키는 공식 생성
function getSideCenterQuarterTurnMoves(
  face: "F" | "R" | "B" | "L",
  dir: 90 | 270,
): BasicMove[] {
  // F 기준 +90도: "F L' U' L U2 F L' U' L F'"
  // F 기준 -90도(270도): 역순 "F L' U L U2 L' U L F'"
  const cycleOrder: ("F" | "R" | "B" | "L")[] = ["F", "R", "B", "L"]
  const idx = cycleOrder.indexOf(face)
  const leftFace = cycleOrder[(idx + 3) % 4]

  if (dir === 90) {
    return parseMoveNotation(
      `${face} ${leftFace}' U' ${leftFace} U2 ${face} ${leftFace}' U' ${leftFace} ${face}'`,
    )
  }
  return parseMoveNotation(
    `${face} ${leftFace}' U ${leftFace} ${face}' U2 ${leftFace}' U ${leftFace} ${face}'`,
  )
}

// 전체 큐브에서 특정 면(face)의 센터만 180도 회전시키는 공식: (adj face adj' face) * 5
export function getCenter180Formula(face: FaceId): {
  moves: BasicMove[]
  formulaDisplay: string
} {
  const adjMap: Record<FaceId, FaceId> = {
    U: "R",
    D: "R",
    F: "U",
    B: "U",
    L: "U",
    R: "U",
  }
  const adj = adjMap[face]
  const unit = `${adj} ${face} ${adj}' ${face}`
  const full = Array(5).fill(unit).join(" ")
  return {
    moves: parseMoveNotation(full),
    formulaDisplay: `(${unit}) × 5`,
  }
}

export function solveCubeLayerByLayer(
  initialCubies: CubieState[],
  checkOrientation = false,
): FullSolution {
  if (isCubeSolved(initialCubies, checkOrientation)) {
    return {
      isAlreadySolved: true,
      stages: [],
      allMoves: [],
    }
  }

  let cube = cloneCube(initialCubies)
  const stages: SolutionStage[] = []

  // 만약 색상만 먼저 다 맞춰져 있고 방향 큐브에서 센터만 90/270도 돌아가 있는 특수 상태인지 확인
  const initialCenters = getCenterRotations(cube)
  const hasOddSideOrBottomCenter = (["D", "F", "R", "B", "L"] as FaceId[]).some(
    (f) => initialCenters[f] === 90 || initialCenters[f] === 270,
  )

  // =========================================================================
  // 1단계: 1층(아랫면 D) 하얀색 십자가 맞추기
  // =========================================================================
  const stage1SubSteps: SolutionSubStep[] = []

  // 방향 큐브인 경우 바닥면(D) 센터를 먼저 0도로 맞춤
  if (checkOrientation && initialCenters.D !== 0) {
    const dMove: BasicMove =
      initialCenters.D === 90 ? "D'" : initialCenters.D === 180 ? "D2" : "D"
    cube = applyMove(cube, dMove)
    stage1SubSteps.push({
      title: "바닥면(D) 중심 방향 정렬",
      description:
        "방향이 있는 큐브이므로 먼저 기준이 되는 바닥면(D) 중심 조각의 방향을 정방향(0°)으로 맞춥니다.",
      formulaName: dMove,
      moves: [dMove],
      targetCubieIds: ["0,-1,0"],
    })
  }

  const crossEdges: { id: string; name: string }[] = [
    { id: "0,-1,1", name: "앞-아래(DF) 모서리" },
    { id: "1,-1,0", name: "오른쪽-아래(DR) 모서리" },
    { id: "0,-1,-1", name: "뒤-아래(DB) 모서리" },
    { id: "-1,-1,0", name: "왼쪽-아래(DL) 모서리" },
  ]

  const solvedCrossIds: string[] = []
  for (const edge of crossEdges) {
    solvedCrossIds.push(edge.id)
    if (!isCubieSolved(cube, edge.id) || hasOddSideOrBottomCenter) {
      const moves = solveCrossEdgeBFS(cube, solvedCrossIds)
      if (moves.length > 0) {
        cube = applyMoves(cube, moves)
        stage1SubSteps.push({
          title: `${edge.name} 맞추기`,
          description: `1층 바닥면과 옆면 중심 색상에 맞춰 ${edge.name} 조각을 제자리에 배치합니다.`,
          moves,
          targetCubieIds: [edge.id],
        })
      }
    }
  }

  // 방향 큐브인 경우 옆면(F, R, B, L) 센터의 홀수(90°/270°) 회전을 십자가 유지 공식으로 미리 교정
  if (checkOrientation) {
    const sideFaces: ("F" | "R" | "B" | "L")[] = ["F", "R", "B", "L"]
    for (const sf of sideFaces) {
      const rot = getCenterRotations(cube)[sf]
      if (rot === 90 || rot === 270) {
        // 90도 돌아가 있으면 270도(-90도) 회전 필요, 270도면 90도(+90도) 회전 필요
        const needed: 90 | 270 = rot === 270 ? 90 : 270
        const fixMoves = getSideCenterQuarterTurnMoves(sf, needed)
        cube = applyMoves(cube, fixMoves)
        stage1SubSteps.push({
          title: `${FACE_BASIS[sf].nameKo} 중심 90° 홀수 회전 교정`,
          description: `십자가를 유지하면서 ${FACE_BASIS[sf].nameKo} 중심 조각의 90° 방향 틀어짐을 바로잡습니다.`,
          formulaName: fixMoves.join(" "),
          moves: fixMoves,
          targetCubieIds: [
            `${FACE_BASIS[sf].normal[0]},${FACE_BASIS[sf].normal[1]},${FACE_BASIS[sf].normal[2]}`,
          ],
        })
      }
    }
  }

  if (stage1SubSteps.length > 0) {
    stages.push({
      stageNumber: 1,
      stageId: "cross",
      title: "1단계: 1층(바닥면) 십자가 맞추기",
      summary:
        "바닥면(D) 중심 색상과 옆면 중심 색상이 동시에 일치하도록 4개의 모서리 조각으로 십자가를 만듭니다.",
      subSteps: stage1SubSteps,
      totalMoves: stage1SubSteps.flatMap((s) => s.moves),
    })
  }

  // =========================================================================
  // 2단계: 1층 코너 조각 4개 맞추기
  // =========================================================================
  const stage2SubSteps: SolutionSubStep[] = []
  const corners1st: {
    id: string
    name: string
    cx: number
    cz: number
    trigger: string
    rightFace: FaceId
    frontFace: FaceId
  }[] = [
    {
      id: "1,-1,1",
      name: "앞-오른쪽-아래(DFR) 코너",
      cx: 1,
      cz: 1,
      trigger: "R U R' U'",
      rightFace: "R",
      frontFace: "F",
    },
    {
      id: "1,-1,-1",
      name: "오른쪽-뒤-아래(DRB) 코너",
      cx: 1,
      cz: -1,
      trigger: "B U B' U'",
      rightFace: "B",
      frontFace: "R",
    },
    {
      id: "-1,-1,-1",
      name: "뒤-왼쪽-아래(DBL) 코너",
      cx: -1,
      cz: -1,
      trigger: "L U L' U'",
      rightFace: "L",
      frontFace: "B",
    },
    {
      id: "-1,-1,1",
      name: "왼쪽-앞-아래(DLF) 코너",
      cx: -1,
      cz: 1,
      trigger: "F U F' U'",
      rightFace: "F",
      frontFace: "L",
    },
  ]

  for (const corner of corners1st) {
    if (isCubieSolved(cube, corner.id)) continue

    const stepMoves: BasicMove[] = []
    let current = cube.find((c) => c.id === corner.id)!

    // 만약 1층(y === -1) 다른 슬롯이나 제자리에 잘못 들어가 있다면 3층(y === 1)으로 꺼냄
    if (current.pos[1] === -1) {
      const slotCorner = corners1st.find(
        (s) => s.cx === current.pos[0] && s.cz === current.pos[2],
      )!
      const popMoves = parseMoveNotation(slotCorner.trigger)
      cube = applyMoves(cube, popMoves)
      stepMoves.push(...popMoves)
      current = cube.find((c) => c.id === corner.id)!
    }

    // 이제 y === 1 (3층)에 있으므로 목표 슬롯 바로 위(cx, 1, cz)로 U 회전
    const uChoices: BasicMove[][] = [[], ["U"], ["U'"], ["U2"]]
    for (const uSeq of uChoices) {
      const testCube = applyMoves(cube, uSeq)
      const cAfter = testCube.find((c) => c.id === corner.id)!
      if (cAfter.pos[0] === corner.cx && cAfter.pos[2] === corner.cz) {
        cube = testCube
        stepMoves.push(...uSeq)
        break
      }
    }

    // 목표 슬롯 위(cx, 1, cz)에서 트위스트(R U R' U') 반복으로 삽입
    const trigMoves = parseMoveNotation(corner.trigger)
    let repeatCount = 0
    while (!isCubieSolved(cube, corner.id) && repeatCount < 6) {
      cube = applyMoves(cube, trigMoves)
      stepMoves.push(...trigMoves)
      repeatCount++
    }

    const simplified = simplifyMoves(stepMoves)
    stage2SubSteps.push({
      title: `${corner.name} 맞추기`,
      description: `코너 조각을 목표 위치 바로 위(3층)로 옮긴 뒤 기본 트위스트 공식(${corner.trigger})을 반복해 1층 코너에 끼워 넣습니다.`,
      formulaName:
        repeatCount > 1
          ? `(${corner.trigger}) × ${repeatCount}`
          : corner.trigger,
      moves: simplified,
      targetCubieIds: [corner.id],
    })
  }

  // упрощ(simplify) 시 stepMoves와 실제 적용을 일치시키기 위해 주의:
  // 위에서는 cube에 stepMoves 원본을 적용했으므로, subStep.moves에는 stepMoves 원본(또는 U회전만 합친 것)을 넣어야 정확히 일치함!
  // 다시 정리: stage2SubSteps의 moves가 simplifyMoves를 거치면 센터 회전이나 중간 스텝 수는 같지만, 재생기에서 1수씩 재생할 때 완벽히 일치하도록 simplifyMoves를 subStep 생성 시점에 재계산
  if (stage2SubSteps.length > 0) {
    stages.push({
      stageNumber: 2,
      stageId: "first-corners",
      title: "2단계: 1층 코너 맞추기 (1층 완성)",
      summary:
        "바닥면의 네 모서리 코너 조각을 트위스트 공식(R U R' U')으로 제자리에 넣어 1층을 완성합니다.",
      subSteps: stage2SubSteps,
      totalMoves: stage2SubSteps.flatMap((s) => s.moves),
    })
  }

  // =========================================================================
  // 3단계: 2층(중간층) 모서리 4개 맞추기
  // =========================================================================
  const stage3SubSteps: SolutionSubStep[] = []
  const middleEdges: {
    id: string
    name: string
    ex: number
    ez: number
    front: FaceId
    right: FaceId
  }[] = [
    {
      id: "1,0,1",
      name: "앞-오른쪽(FR) 2층 모서리",
      ex: 1,
      ez: 1,
      front: "F",
      right: "R",
    },
    {
      id: "1,0,-1",
      name: "오른쪽-뒤(RB) 2층 모서리",
      ex: 1,
      ez: -1,
      front: "R",
      right: "B",
    },
    {
      id: "-1,0,-1",
      name: "뒤-왼쪽(BL) 2층 모서리",
      ex: -1,
      ez: -1,
      front: "B",
      right: "L",
    },
    {
      id: "-1,0,1",
      name: "왼쪽-앞(LF) 2층 모서리",
      ex: -1,
      ez: 1,
      front: "L",
      right: "F",
    },
  ]

  const getRightInsert = (f: FaceId, r: FaceId) =>
    parseMoveNotation(`U ${r} U' ${r}' U' ${f}' U ${f}`)
  const getLeftInsert = (f: FaceId, r: FaceId) =>
    parseMoveNotation(`U' ${f}' U ${f} U ${r} U' ${r}'`)

  for (const edge of middleEdges) {
    if (isCubieSolved(cube, edge.id)) continue

    let current = cube.find((c) => c.id === edge.id)!

    // 만약 2층(y === 0)에 잘못 들어가 있다면 오른쪽 넣기 공식으로 3층(y === 1)으로 꺼냄
    if (current.pos[1] === 0) {
      const slot = middleEdges.find(
        (s) => s.ex === current.pos[0] && s.ez === current.pos[2],
      )!
      const popSeq = getRightInsert(slot.front, slot.right)
      cube = applyMoves(cube, popSeq)
      stage3SubSteps.push({
        title: `${edge.name} 3층으로 꺼내기`,
        description: `2층 다른 자리에 끼어 있는 ${edge.name} 조각을 3층(윗면)으로 먼저 꺼냅니다.`,
        formulaName: popSeq.join(" "),
        moves: popSeq,
        targetCubieIds: [edge.id],
      })
      current = cube.find((c) => c.id === edge.id)!
    }

    // 이제 3층(y === 1)에 있는 조각을 알맞은 U 회전 + 오른쪽/왼쪽 넣기 공식으로 삽입
    const uChoices: BasicMove[][] = [[], ["U"], ["U'"], ["U2"]]
    const rightFormula = getRightInsert(edge.front, edge.right)
    const leftFormula = getLeftInsert(edge.front, edge.right)

    let found = false
    for (const uSeq of uChoices) {
      // 오른쪽 넣기 테스트
      const testR = applyMoves(applyMoves(cube, uSeq), rightFormula)
      if (isCubieSolved(testR, edge.id)) {
        const combined = [...uSeq, ...rightFormula]
        cube = testR
        stage3SubSteps.push({
          title: `${edge.name} 오른쪽 넣기`,
          description: `윗면(U)을 돌려 옆면 중심 색과 맞춘 뒤, 2층 오른쪽 넣기 공식으로 ${edge.name} 조각을 끼워 넣습니다.`,
          formulaName: rightFormula.join(" "),
          moves: combined,
          targetCubieIds: [edge.id],
        })
        found = true
        break
      }
      // 왼쪽 넣기 테스트
      const testL = applyMoves(applyMoves(cube, uSeq), leftFormula)
      if (isCubieSolved(testL, edge.id)) {
        const combined = [...uSeq, ...leftFormula]
        cube = testL
        stage3SubSteps.push({
          title: `${edge.name} 왼쪽 넣기`,
          description: `윗면(U)을 돌려 옆면 중심 색과 맞춘 뒤, 2층 왼쪽 넣기 공식으로 ${edge.name} 조각을 끼워 넣습니다.`,
          formulaName: leftFormula.join(" "),
          moves: combined,
          targetCubieIds: [edge.id],
        })
        found = true
        break
      }
    }

    if (!found) {
      throw new Error(`Failed to solve middle edge ${edge.id}`)
    }
  }

  if (stage3SubSteps.length > 0) {
    stages.push({
      stageNumber: 3,
      stageId: "middle-edges",
      title: "3단계: 2층 모서리 맞추기 (2층 완성)",
      summary:
        "3층에 있는 모서리 조각을 왼쪽/오른쪽 넣기 공식(U R U' R' U' F' U F)을 사용해 2층 네 자리에 넣습니다.",
      subSteps: stage3SubSteps,
      totalMoves: stage3SubSteps.flatMap((s) => s.moves),
    })
  }

  // =========================================================================
  // 4단계: 3층(윗면 U) 십자가 만들기 (F R U R' U' F')
  // =========================================================================
  const stage4SubSteps: SolutionSubStep[] = []
  const uEdgeIds = ["0,1,1", "1,1,0", "0,1,-1", "-1,1,0"]
  const ollCrossAlg = parseMoveNotation("F R U R' U' F'")

  const getOrientedUEdgePositions = (cState: CubieState[]) => {
    const res: Vec3[] = []
    for (const id of uEdgeIds) {
      const c = cState.find((x) => x.id === id)!
      const uNorm = getCubieStickerWorldNormal(c, "U")
      if (uNorm[1] === 1) {
        res.push(c.pos)
      }
    }
    return res
  }

  let ollSafety = 0
  while (getOrientedUEdgePositions(cube).length < 4 && ollSafety < 4) {
    ollSafety++
    const orientedPos = getOrientedUEdgePositions(cube)

    if (orientedPos.length === 0) {
      // 점(Dot) 상태 -> 바로 F R U R' U' F' 적용하면 ㄴ자 상태가 됨
      cube = applyMoves(cube, ollCrossAlg)
      stage4SubSteps.push({
        title: "점 모양 → ㄴ자 모양 만들기",
        description:
          "윗면에 맞춰진 모서리가 없을 때 공식(F R U R' U' F')을 한 번 적용해 'ㄴ자' 모양을 만듭니다.",
        formulaName: "F R U R' U' F'",
        moves: ollCrossAlg,
        targetCubieIds: uEdgeIds,
      })
    } else if (orientedPos.length === 2) {
      // 일자(Line)인지 ㄴ자(L-shape)인지 판별
      const [p1, p2] = orientedPos
      const isLine = p1[0] + p2[0] === 0 && p1[2] + p2[2] === 0

      if (isLine) {
        // 가로 일자(x = -1, x = 1 즉 UL, UR)로 맞춘 뒤 F R U R' U' F'
        const needU = p1[0] === 0 // 현재 세로(UF, UB)인 경우 U 회전 1번
        const moves: BasicMove[] = needU
          ? (["U", ...ollCrossAlg] as BasicMove[])
          : ollCrossAlg
        cube = applyMoves(cube, moves)
        stage4SubSteps.push({
          title: "ㅡ자(일자) 모양 → 윗면 십자가 완성",
          description:
            "일자 모양을 가로 방향(왼쪽-오른쪽)으로 둔 뒤 공식(F R U R' U' F')을 적용해 윗면 십자가를 완성합니다.",
          formulaName: "F R U R' U' F'",
          moves,
          targetCubieIds: uEdgeIds,
        })
      } else {
        // ㄴ자 모양: 뒤(UB: 0,1,-1)와 왼쪽(UL: -1,1,0)에 오도록 U 회전 (9시~12시 방향)
        const uChoices: BasicMove[][] = [[], ["U"], ["U'"], ["U2"]]
        for (const uSeq of uChoices) {
          const test = applyMoves(cube, uSeq)
          const posAfter = getOrientedUEdgePositions(test)
          const hasBack = posAfter.some((p) => p[0] === 0 && p[2] === -1)
          const hasLeft = posAfter.some((p) => p[0] === -1 && p[2] === 0)
          if (hasBack && hasLeft) {
            const moves = [...uSeq, ...ollCrossAlg]
            cube = applyMoves(cube, moves)
            stage4SubSteps.push({
              title: "ㄴ자 모양 → ㅡ자(일자) 모양 만들기",
              description:
                "ㄴ자 모양을 9시(왼쪽)와 12시(뒤쪽) 방향으로 놓은 뒤 공식(F R U R' U' F')을 적용합니다.",
              formulaName: "F R U R' U' F'",
              moves,
              targetCubieIds: uEdgeIds,
            })
            break
          }
        }
      }
    }
  }

  if (stage4SubSteps.length > 0) {
    stages.push({
      stageNumber: 4,
      stageId: "top-cross",
      title: "4단계: 3층(윗면) 십자가 만들기",
      summary:
        "F R U R' U' F' 공식을 사용해 점 → ㄴ자 → ㅡ자 → 십자가 순서로 윗면 십자가를 완성합니다.",
      subSteps: stage4SubSteps,
      totalMoves: stage4SubSteps.flatMap((s) => s.moves),
    })
  }

  // =========================================================================
  // 5단계: 3층 십자가 옆면 색 맞추기 (R U R' U R U2 R')
  // =========================================================================
  const stage5SubSteps: SolutionSubStep[] = []
  const suneAlg = parseMoveNotation("R U R' U R U2 R'")
  const isAllUEdgesSolved = (cState: CubieState[]) =>
    uEdgeIds.every((id) => isCubieSolved(cState, id))

  if (!isAllUEdgesSolved(cube)) {
    const uChoices: BasicMove[][] = [[], ["U"], ["U'"], ["U2"]]
    let solvedByU = false

    // 1) U 회전만으로 4개 모서리가 모두 맞춰지는지 확인
    for (const uSeq of uChoices) {
      const test = applyMoves(cube, uSeq)
      if (isAllUEdgesSolved(test)) {
        if (uSeq.length > 0) {
          cube = test
          stage5SubSteps.push({
            title: "윗면 회전으로 십자가 옆면 정렬",
            description:
              "윗면(U)을 회전하여 4개의 모서리 옆면 색상을 중심 색과 모두 일치시킵니다.",
            formulaName: uSeq.join(" "),
            moves: uSeq,
            targetCubieIds: uEdgeIds,
          })
        }
        solvedByU = true
        break
      }
    }

    // 2) Sune 공식 1회 또는 2회 탐색
    if (!solvedByU) {
      let found1 = false
      for (const u1 of uChoices) {
        for (const u2 of uChoices) {
          const seq = [...u1, ...suneAlg, ...u2]
          const test = applyMoves(cube, seq)
          if (isAllUEdgesSolved(test)) {
            cube = test
            stage5SubSteps.push({
              title: "십자가 옆면 맞추기 공식 (Sune)",
              description:
                "맞는 모서리를 뒤쪽과 오른쪽에 두고 공식(R U R' U R U2 R')을 적용해 3층 십자가 옆면을 모두 맞춥니다.",
              formulaName: "R U R' U R U2 R'",
              moves: simplifyMoves(seq),
              targetCubieIds: uEdgeIds,
            })
            found1 = true
            break
          }
        }
        if (found1) break
      }

      if (!found1) {
        // 마주보는 2개만 맞은 경우 Sune 2회
        let found2 = false
        for (const u1 of uChoices) {
          for (const u2 of uChoices) {
            for (const u3 of uChoices) {
              const seq1 = [...u1, ...suneAlg]
              const seq2 = [...u2, ...suneAlg, ...u3]
              const test = applyMoves(applyMoves(cube, seq1), seq2)
              if (isAllUEdgesSolved(test)) {
                cube = test
                stage5SubSteps.push({
                  title: "마주보는 모서리 → 이웃한 모서리로 변환",
                  description:
                    "마주보는 두 모서리만 맞은 상태이므로 공식(R U R' U R U2 R')을 한 번 적용해 이웃한 두 모서리가 맞는 상태로 만듭니다.",
                  formulaName: "R U R' U R U2 R'",
                  moves: simplifyMoves(seq1),
                  targetCubieIds: uEdgeIds,
                })
                stage5SubSteps.push({
                  title: "십자가 옆면 최종 정렬",
                  description:
                    "이웃한 두 모서리를 뒤쪽과 오른쪽에 두고 공식(R U R' U R U2 R')을 다시 적용해 4개 옆면을 모두 맞춥니다.",
                  formulaName: "R U R' U R U2 R'",
                  moves: simplifyMoves(seq2),
                  targetCubieIds: uEdgeIds,
                })
                found2 = true
                break
              }
            }
            if (found2) break
          }
          if (found2) break
        }
      }
    }
  }

  if (stage5SubSteps.length > 0) {
    stages.push({
      stageNumber: 5,
      stageId: "top-edges",
      title: "5단계: 3층 십자가 옆면 색 맞추기",
      summary:
        "R U R' U R U2 R' 공식을 사용해 윗면 십자가 모서리 4개의 옆면 색상을 각 면의 중심 색상과 일치시킵니다.",
      subSteps: stage5SubSteps,
      totalMoves: stage5SubSteps.flatMap((s) => s.moves),
    })
  }

  // =========================================================================
  // 6단계: 3층 코너 위치 맞추기 (U R U' L' U R' U' L)
  // =========================================================================
  const stage6SubSteps: SolutionSubStep[] = []
  const uCornerIds = ["1,1,1", "1,1,-1", "-1,1,-1", "-1,1,1"]
  const isAllUCornersInPosition = (cState: CubieState[]) =>
    uCornerIds.every((id) => isCubieInHomePosition(cState, id))

  // 4방향 Niklas 공식 (센터 회전 변화 0, 십자가 모서리 변화 0)
  const niklasVariants: { name: string; moves: BasicMove[] }[] = [
    {
      name: "U R U' L' U R' U' L",
      moves: parseMoveNotation("U R U' L' U R' U' L"),
    },
    {
      name: "U B U' F' U B' U' F",
      moves: parseMoveNotation("U B U' F' U B' U' F"),
    },
    {
      name: "U L U' R' U L' U' R",
      moves: parseMoveNotation("U L U' R' U L' U' R"),
    },
    {
      name: "U F U' B' U F' U' B",
      moves: parseMoveNotation("U F U' B' U F' U' B"),
    },
  ]

  let cornerPosSafety = 0
  while (!isAllUCornersInPosition(cube) && cornerPosSafety < 4) {
    cornerPosSafety++
    // 1회로 모든 코너가 제자리에 가는지 먼저 확인
    let applied = false
    for (const v of niklasVariants) {
      const test = applyMoves(cube, v.moves)
      if (isAllUCornersInPosition(test)) {
        cube = test
        stage6SubSteps.push({
          title: "3층 코너 위치 정렬 (Niklas 공식)",
          description: `제자리에 있는 코너를 기준 삼아 공식(${v.name})으로 나머지 세 코너의 위치를 맞춥니다.`,
          formulaName: v.name,
          moves: v.moves,
          targetCubieIds: uCornerIds,
        })
        applied = true
        break
      }
    }

    if (!applied) {
      // 2회 조합으로 제자리에 가는 방향 탐색
      for (const v1 of niklasVariants) {
        for (const v2 of niklasVariants) {
          const test = applyMoves(applyMoves(cube, v1.moves), v2.moves)
          if (isAllUCornersInPosition(test)) {
            cube = applyMoves(cube, v1.moves)
            stage6SubSteps.push({
              title: "3층 코너 위치 이동 (1차)",
              description: `공식(${v1.name})을 적용해 최소 한 개의 코너를 자기 자리로 보냅니다.`,
              formulaName: v1.name,
              moves: v1.moves,
              targetCubieIds: uCornerIds,
            })
            cube = applyMoves(cube, v2.moves)
            stage6SubSteps.push({
              title: "3층 코너 위치 최종 정렬 (2차)",
              description: `공식(${v2.name})을 한 번 더 적용해 4개 코너를 모두 자기 위치에 배치합니다.`,
              formulaName: v2.name,
              moves: v2.moves,
              targetCubieIds: uCornerIds,
            })
            applied = true
            break
          }
        }
        if (applied) break
      }
    }
  }

  if (stage6SubSteps.length > 0) {
    stages.push({
      stageNumber: 6,
      stageId: "top-corner-pos",
      title: "6단계: 3층 코너 위치 맞추기",
      summary:
        "U R U' L' U R' U' L 공식을 사용해 윗면의 네 코너 조각을 각자 들어가야 할 자기 자리로 이동시킵니다.",
      subSteps: stage6SubSteps,
      totalMoves: stage6SubSteps.flatMap((s) => s.moves),
    })
  }

  // =========================================================================
  // 7단계: 3층 코너 방향 맞추기 (R' D' R D 엘리베이터 공식)
  // =========================================================================
  const stage7SubSteps: SolutionSubStep[] = []
  const isAllUCornersSolved = (cState: CubieState[]) =>
    uCornerIds.every((id) => isCubieSolved(cState, id))

  if (!isAllUCornersSolved(cube)) {
    const elevatorAlg = parseMoveNotation("R' D' R D")
    let _uTurnsDone = 0

    for (let slotIdx = 0; slotIdx < 4; slotIdx++) {
      // 현재 UFR(1, 1, 1) 위치에 있는 큐비 확인
      const ufrCubie = cube.find(
        (c) => c.pos[0] === 1 && c.pos[1] === 1 && c.pos[2] === 1,
      )!
      const uNormal = getCubieStickerWorldNormal(ufrCubie, "U")

      if (uNormal[1] !== 1) {
        const subMoves: BasicMove[] = []
        let reps = 0
        while (reps < 6) {
          cube = applyMoves(cube, elevatorAlg)
          subMoves.push(...elevatorAlg)
          reps++
          const updated = cube.find((c) => c.id === ufrCubie.id)!
          const norm = getCubieStickerWorldNormal(updated, "U")
          if (norm[1] === 1) break
        }
        stage7SubSteps.push({
          title: `코너 방향 회전 (${ufrCubie.id} 조각)`,
          description: `앞-오른쪽-위(UFR) 자리에서 윗면 색상이 위를 향할 때까지 엘리베이터 공식(R' D' R D)을 ${reps}회 반복합니다.`,
          formulaName: `(R' D' R D) × ${reps}`,
          moves: subMoves,
          targetCubieIds: [ufrCubie.id],
        })
      }

      // 아직 맞춰야 할 다른 코너가 남아 있거나 마지막 원위치 복귀를 위해 U 회전
      cube = applyMove(cube, "U")
      _uTurnsDone++
      stage7SubSteps.push({
        title: "윗면(U) 돌려 다음 코너 가져오기",
        description:
          slotIdx < 3
            ? "큐브 전체는 그대로 두고 윗면(U)만 시계방향으로 돌려 다음 코너를 앞-오른쪽-위(UFR) 자리로 가져옵니다."
            : "윗면(U)을 마지막으로 한 번 돌려 3층을 제자리에 맞춥니다.",
        formulaName: "U",
        moves: ["U"],
        targetCubieIds: uCornerIds,
      })
    }

    // 연속된 U 회전만 있는 스텝들을 깔끔하게 병합
    const mergedStage7: SolutionSubStep[] = []
    for (const step of stage7SubSteps) {
      if (
        mergedStage7.length > 0 &&
        step.moves.length === 1 &&
        step.moves[0] === "U" &&
        mergedStage7[mergedStage7.length - 1].moves.every((m) =>
          m.startsWith("U"),
        )
      ) {
        const prev = mergedStage7[mergedStage7.length - 1]
        prev.moves = simplifyMoves([...prev.moves, "U"])
        prev.formulaName = prev.moves.join(" ")
      } else {
        mergedStage7.push(step)
      }
    }

    const filteredStage7 = mergedStage7.filter((s) => s.moves.length > 0)
    if (filteredStage7.length > 0) {
      stages.push({
        stageNumber: 7,
        stageId: "top-corner-orient",
        title: "7단계: 3층 코너 방향 맞추기 (색상 큐브 완성!)",
        summary:
          "앞-오른쪽-위(UFR) 자리에 코너를 차례대로 가져오며 R' D' R D 공식을 반복해 모든 코너의 방향을 맞춥니다.",
        subSteps: filteredStage7,
        totalMoves: filteredStage7.flatMap((s) => s.moves),
      })
    }
  }

  // =========================================================================
  // 8단계: 그림/방향 큐브 전용 센터 조각 180° 방향 정렬
  // =========================================================================
  if (checkOrientation && !isCubeSolved(cube, true)) {
    const stage8SubSteps: SolutionSubStep[] = []
    const centers = getCenterRotations(cube)

    for (const face of ALL_FACES) {
      if (centers[face] === 180) {
        const { moves, formulaDisplay } = getCenter180Formula(face)
        cube = applyMoves(cube, moves)
        const n = FACE_BASIS[face].normal
        stage8SubSteps.push({
          title: `${FACE_BASIS[face].nameKo} 중심 조각 180° 회전`,
          description: `나머지 모든 조각은 그대로 유지하면서 ${FACE_BASIS[face].nameKo} 중심 그림/화살표만 180° 뒤집는 슈퍼큐브 공식입니다.`,
          formulaName: formulaDisplay,
          moves,
          targetCubieIds: [`${n[0]},${n[1]},${n[2]}`],
        })
      }
    }

    if (stage8SubSteps.length > 0) {
      stages.push({
        stageNumber: 8,
        stageId: "supercube-centers",
        title: "8단계: 중심 조각 방향 맞추기 (그림/방향 큐브 완성!)",
        summary:
          "색상은 모두 맞았지만 180° 뒤집혀 있는 중심(센터) 조각의 그림/화살표 방향을 (R U R' U) × 5 공식으로 정방향 정렬합니다.",
        subSteps: stage8SubSteps,
        totalMoves: stage8SubSteps.flatMap((s) => s.moves),
      })
    }
  }

  return {
    isAlreadySolved: false,
    stages,
    allMoves: stages.flatMap((st) => st.totalMoves),
  }
}

export interface StageGuideInfo {
  stageNumber: number
  title: string
  shortTitle: string
  goal: string
  keyFormula: string
  formulaMoves: BasicMove[]
  tips: string[]
}

export const STAGE_GUIDES: StageGuideInfo[] = [
  {
    stageNumber: 1,
    title: "1단계: 1층(바닥면) 하얀색 십자가",
    shortTitle: "1. 바닥 십자가",
    goal: "바닥면(D, 하양)에 십자가를 만들되, 연결된 옆면(F/R/B/L)의 모서리 색상이 각 옆면의 중심 조각 색상과 일치해야 합니다.",
    keyFormula: "F2 / R' F R / F' U' R' U R F",
    formulaMoves: ["F2"],
    tips: [
      "조각을 일단 3층(윗면 U)으로 올린 뒤, 옆면 중심 색과 맞추고 180도(F2 등) 돌리면 쉽게 내려갑니다.",
      "방향이 있는 그림/화살표 큐브는 이 단계에서 바닥과 옆면 중심 조각의 방향(0°)도 함께 맞춰두면 이후 단계가 매우 편해집니다.",
    ],
  },
  {
    stageNumber: 2,
    title: "2단계: 1층 코너 맞추기 (1층 완성)",
    shortTitle: "2. 1층 코너",
    goal: "바닥면의 네 귀퉁이 코너 조각을 제자리에 넣어 1층 전체와 옆면 1층 테두리를 완성합니다.",
    keyFormula: "R U R' U'",
    formulaMoves: ["R", "U", "R'", "U'"],
    tips: [
      "넣고 싶은 코너 조각을 목표 위치 바로 위(3층)에 놓으세요.",
      "오른손 기본 트위스트 공식(R U R' U')을 1~5회 반복하면 어떤 방향의 코너든 제자리에 정확히 들어갑니다.",
    ],
  },
  {
    stageNumber: 3,
    title: "3단계: 2층 모서리 맞추기 (2층 완성)",
    shortTitle: "3. 2층 모서리",
    goal: "윗면(노란색) 색상이 포함되지 않은 4개의 모서리 조각을 찾아 2층(중간층) 네 자리에 끼워 넣습니다.",
    keyFormula: "U R U' R' U' F' U F",
    formulaMoves: ["U", "R", "U'", "R'", "U'", "F'", "U", "F"],
    tips: [
      "3층 모서리의 앞면 색상을 옆면 중심 색상과 일치시켜 'ㅜ' 자 모양을 만듭니다.",
      "오른쪽 2층으로 넣을 땐 'U R U' R' U' F' U F', 왼쪽 2층으로 넣을 땐 대칭인 'U' L' U L U F U' F''를 사용합니다.",
    ],
  },
  {
    stageNumber: 4,
    title: "4단계: 3층(윗면) 십자가 만들기",
    shortTitle: "4. 3층 십자가",
    goal: "윗면(U, 노랑)에 노란색 십자가 모양을 만듭니다. (옆면 색상은 아직 맞지 않아도 됩니다)",
    keyFormula: "F R U R' U' F'",
    formulaMoves: ["F", "R", "U", "R'", "U'", "F'"],
    tips: [
      "윗면 노란 모서리 상태는 '점' → 'ㄴ자(9시·12시 방향)' → 'ㅡ자(가로 일자)' → '십자가' 순서로 변합니다.",
      "ㄴ자 모양일 때는 반드시 9시와 12시 방향에 두고, ㅡ자 모양일 때는 가로로 두고 F R U R' U' F'를 쓰세요.",
    ],
  },
  {
    stageNumber: 5,
    title: "5단계: 3층 십자가 옆면 색 맞추기",
    shortTitle: "5. 십자가 옆면",
    goal: "3층 십자가 모서리 4개의 옆면 색상을 각 옆면(F, R, B, L) 중심 색상과 모두 일치시킵니다.",
    keyFormula: "R U R' U R U2 R'",
    formulaMoves: ["R", "U", "R'", "U", "R", "U2", "R'"],
    tips: [
      "윗면(U)을 돌려보며 옆면 색상이 맞는 모서리를 2개 찾습니다.",
      "이웃한 2개가 맞으면 '뒤쪽(B)'과 '오른쪽(R)'에 두고 공식을 쓰고, 마주보는 2개가 맞으면 아무 방향에서나 한 번 써서 이웃하게 만듭니다.",
    ],
  },
  {
    stageNumber: 6,
    title: "6단계: 3층 코너 위치 맞추기",
    shortTitle: "6. 3층 코너 위치",
    goal: "3층의 네 코너 조각을 각자 들어가야 할 자기 위치로 이동시킵니다. (색 방향은 뒤집혀 있어도 위치만 맞으면 성공!)",
    keyFormula: "U R U' L' U R' U' L",
    formulaMoves: ["U", "R", "U'", "L'", "U", "R'", "U'", "L"],
    tips: [
      "네 코너 중 이미 자기 자리에 있는 코너 1개를 찾아 앞-오른쪽-위(UFR)에 두고 공식을 1~2회 사용합니다.",
      "만약 자기 자리에 있는 코너가 하나도 없다면, 아무 방향에서나 공식을 한 번 적용하면 1개가 제자리를 찾습니다.",
    ],
  },
  {
    stageNumber: 7,
    title: "7단계: 3층 코너 방향 맞추기 (색상 완성)",
    shortTitle: "7. 3층 코너 방향",
    goal: "제자리에 위치한 3층 코너들을 회전시켜 윗면 색상을 모두 위로 향하게 하여 큐브를 완성합니다.",
    keyFormula: "R' D' R D",
    formulaMoves: ["R'", "D'", "R", "D"],
    tips: [
      "방향이 안 맞은 코너를 앞-오른쪽-위(UFR)에 두고, 윗면 색상이 위를 향할 때까지 'R' D' R D'를 2번 또는 4번 반복합니다.",
      "⚠️ 가장 중요한 주의점: 한 코너가 맞으면 큐브 전체를 돌리지 말고, 오직 윗면(U)만 돌려서 다음 안 맞은 코너를 앞-오른쪽-위(UFR)로 가져와야 합니다!",
    ],
  },
  {
    stageNumber: 8,
    title: "8단계: 중심 조각 방향 정렬 (방향/그림 큐브)",
    shortTitle: "8. 센터 방향(슈퍼큐브)",
    goal: "그림 큐브나 화살표 큐브에서 180° 뒤집혀 있는 중심(센터) 조각을 다른 조각의 흐트러짐 없이 정방향(0°)으로 맞춥니다.",
    keyFormula: "(R U R' U) × 5",
    formulaMoves: parseMoveNotation(
      "R U R' U R U R' U R U R' U R U R' U R U R' U",
    ),
    tips: [
      "색상만 있는 일반 큐브에서는 중심 조각이 돌아가도 티가 나지 않지만, 그림이나 화살표가 있는 큐브에서는 중심 방향까지 맞아야 완성됩니다.",
      "윗면(U) 중심을 180° 돌릴 때는 'R U R' U'를 정확히 5번 반복하면 나머지 모든 조각은 원래 자리로 돌아오고 윗면 중심만 180° 회전합니다!",
    ],
  },
]

// 특정 단계를 바로 연습해볼 수 있도록 해당 단계 직전 상태를 생성하는 함수
export function createStagePracticeCube(stageNumber: number): {
  cubies: CubieState[]
  description: string
} {
  let cube = createSolvedCube()

  switch (stageNumber) {
    case 1: {
      const scramble = parseMoveNotation("F R' D2 L F2 U' B R2 U F' L2 U2")
      cube = applyMoves(cube, scramble)
      return {
        cubies: cube,
        description:
          "1단계 연습: 바닥면(D)에 하얀색 십자가를 만들고 옆면 중심 색과 일치시켜 보세요.",
      }
    }
    case 2: {
      // 1층 십자가는 완성된 상태에서 1층 코너와 2·3층만 섞음
      const seq = parseMoveNotation(
        "R U R' U' L' U' L U F U R U' R' F' U R U2 R'",
      )
      cube = applyMoves(cube, seq)
      return {
        cubies: cube,
        description:
          "2단계 연습: 바닥 십자가가 이미 맞춰져 있습니다. R U R' U' 트위스트로 1층 네 코너를 맞춰보세요!",
      }
    }
    case 3: {
      // 1층은 완성된 상태에서 2층 모서리들이 3층에 나와 있는 상태
      const seq = parseMoveNotation(
        "U R U' R' U' F' U F U2 B U' B' U' R' U R U'",
      )
      cube = applyMoves(cube, seq)
      return {
        cubies: cube,
        description:
          "3단계 연습: 1층이 완성되어 있습니다. 3층의 모서리를 2층 오른쪽/왼쪽 넣기 공식으로 끼워 넣어 보세요!",
      }
    }
    case 4: {
      // 1, 2층 완성 + 3층이 ㄴ자 또는 일자 상태 (F R U R' U' F' 역공식 적용)
      const seq = parseMoveNotation("F U R U' R' F'")
      cube = applyMoves(cube, seq)
      return {
        cubies: cube,
        description:
          "4단계 연습: 2층까지 완성된 'ㄴ자' 상태입니다. 9시·12시 방향으로 두고 F R U R' U' F'를 적용해 십자가를 완성해보세요!",
      }
    }
    case 5: {
      // 3층 십자가 완성, 옆면 색상이 안 맞는 상태 (Sune 1회로 해결되는 상태)
      const seq = parseMoveNotation("R U2 R' U' R U' R'")
      cube = applyMoves(cube, seq)
      return {
        cubies: cube,
        description:
          "5단계 연습: 윗면 십자가는 완성되었지만 옆면 색상이 어긋나 있습니다. R U R' U R U2 R' 공식으로 정렬해보세요!",
      }
    }
    case 6: {
      // 3층 코너 3개의 위치가 순환된 상태 (Niklas 역공식)
      const seq = parseMoveNotation("L' U R U' L U R' U'")
      cube = applyMoves(cube, seq)
      return {
        cubies: cube,
        description:
          "6단계 연습: 앞-오른쪽-위(UFR) 코너만 자기 자리에 있습니다. U R U' L' U R' U' L 공식으로 나머지 코너 위치를 맞춰보세요!",
      }
    }
    case 7: {
      // 코너 2개의 방향만 비틀린 상태
      const seq = parseMoveNotation(
        "D' R' D R D' R' D R U' D' R' D R D' R' D R D' R' D R D' R' D R U",
      )
      cube = applyMoves(cube, seq)
      return {
        cubies: cube,
        description:
          "7단계 연습: 앞쪽 두 코너의 방향만 비틀려 있습니다. R' D' R D 공식과 U 회전으로 큐브를 완성해보세요!",
      }
    }
    default: {
      // 윗면(U) 중심 조각만 180도 뒤집힌 상태
      const { moves } = getCenter180Formula("U")
      cube = applyMoves(cube, moves)
      return {
        cubies: cube,
        description:
          "8단계 연습(방향 큐브): 모든 색상은 맞았지만 윗면(U) 중심 조각이 180° 뒤집혀 있습니다. (R U R' U) × 5 공식으로 중심 방향을 바로잡아 보세요!",
      }
    }
  }
}
