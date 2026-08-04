/**
 * 하나의 튜브가 완성 상태인지 확인합니다.
 * (가득 차 있고 모든 블록의 색상이 동일한 경우)
 */
function isTubeComplete(tube: string[], capacity: number): boolean {
  if (tube.length === 0) return true
  if (tube.length !== capacity) return false
  const firstColor = tube[0]
  return tube.every((color) => color === firstColor)
}

/**
 * 전체 게임판이 클리어 상태인지 확인합니다.
 * (모든 튜브가 비어있거나 완성 상태인 경우)
 */
function isGameComplete(tubes: string[][], capacity: number): boolean {
  return tubes.every(
    (tube) => tube.length === 0 || isTubeComplete(tube, capacity),
  )
}

/**
 * 튜브 상태를 해시 문자열로 변환합니다.
 * 튜브의 물리적 순서는 중요하지 않으므로 정렬 후 해싱하여 중복 상태를 극적으로 줄입니다.
 */
function hashState(tubes: string[][]): string {
  return tubes
    .map((tube) => tube.join(","))
    .sort()
    .join("|")
}

/**
 * 주어진 튜브 배치 상태가 풀이 가능한지 BFS로 판별합니다.
 * @param initialTubes 초기 튜브 상태 (각 튜브는 아래에서 위로 블록 색상 문자열 배열)
 * @param capacity 각 튜브의 최대 수용량 (N)
 * @param maxStates 탐색할 최대 상태 수 (성능 및 오버헤드 방지용)
 * @returns 풀이 가능 여부 (boolean)
 */
export function isSolvable(
  initialTubes: string[][],
  capacity: number,
  maxStates: number = 3000,
): boolean {
  // 처음부터 완성된 상태인 경우
  if (isGameComplete(initialTubes, capacity)) {
    return true
  }

  const queue: string[][][] = [initialTubes]
  const visited = new Set<string>()
  visited.add(hashState(initialTubes))

  let statesExplored = 0

  while (queue.length > 0) {
    const current = queue.shift()!
    statesExplored++

    if (statesExplored > maxStates) {
      // 지정한 탐색 한도를 초과하면 안전하게 false 반환 (너무 어려운 맵 배제 효과도 있음)
      return false
    }

    // 현재 상태에서 가능한 모든 이동을 생성
    const numTubes = current.length

    // 빈 튜브로의 이동은 대칭적이므로, 탐색 시 여러 빈 튜브 중 첫 번째 빈 튜브로만 이동하여 중복 분기를 방지합니다.
    let foundEmptyTarget = false

    for (let src = 0; src < numTubes; src++) {
      const srcTube = current[src]
      if (srcTube.length === 0) continue // 보낼 블록이 없음

      // 이미 완성된 튜브는 건드리지 않음
      if (isTubeComplete(srcTube, capacity)) continue

      const topColor = srcTube[srcTube.length - 1]

      for (let dest = 0; dest < numTubes; dest++) {
        if (src === dest) continue

        const destTube = current[dest]

        // 튜브가 가득 찬 경우 이동 불가
        if (destTube.length >= capacity) continue

        const isDestEmpty = destTube.length === 0

        // 이미 빈 튜브로 이동을 시도한 적이 있다면, 다른 빈 튜브로 이동하는 것은 동일하므로 스킵
        if (isDestEmpty) {
          if (foundEmptyTarget) continue
          foundEmptyTarget = true
        }

        // 이동 조건: 대상 튜브가 비어있거나, 맨 위 블록이 소스 튜브의 맨 위 블록과 같은 색인 경우
        if (isDestEmpty || destTube[destTube.length - 1] === topColor) {
          // 이동 수행
          const nextState = current.map((tube, idx) => {
            if (idx === src) {
              return tube.slice(0, -1)
            }
            if (idx === dest) {
              return [...tube, topColor]
            }
            return tube
          })

          // 클리어 조건 달성 시 즉시 true 반환
          if (isGameComplete(nextState, capacity)) {
            return true
          }

          const stateHash = hashState(nextState)
          if (!visited.has(stateHash)) {
            visited.add(stateHash)
            queue.push(nextState)
          }
        }
      }
    }
  }

  return false
}
