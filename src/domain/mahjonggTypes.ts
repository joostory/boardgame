export type TileGroup = 'character' | 'bamboo' | 'circle' | 'wind' | 'dragon' | 'flower' | 'season';

export interface TileType {
  group: TileGroup;
  value: string; // "1"~"9", 바람("E", "S", "W", "N"), 삼원("W", "G", "R"), 꽃("plum", "orchid", "chrysanthemum", "bamboo"), 계절("spring", "summer", "autumn", "winter")
  symbol: string; // Unicode character
  name: string; // 한글 이름 (예: "일만", "동풍", "봄")
}

export interface TileInstance {
  id: string;
  type: TileType;
  x: number;
  y: number;
  z: number;
  isRemoved: boolean;
}

// 마작 패 유니코드 기호 및 이름 정보 정의
export const TILE_DEFINITIONS: TileType[] = [
  // 만수패 (Character/Wan) 1~9
  { group: 'character', value: '1', symbol: '🀇', name: '일만' },
  { group: 'character', value: '2', symbol: '🀈', name: '이만' },
  { group: 'character', value: '3', symbol: '🀉', name: '삼만' },
  { group: 'character', value: '4', symbol: '🀊', name: '사만' },
  { group: 'character', value: '5', symbol: '🀋', name: '오만' },
  { group: 'character', value: '6', symbol: '🀌', name: '육만' },
  { group: 'character', value: '7', symbol: '🀍', name: '칠만' },
  { group: 'character', value: '8', symbol: '🀎', name: '팔만' },
  { group: 'character', value: '9', symbol: '🀏', name: '구만' },

  // 삭수패 (Bamboo/Suo) 1~9
  { group: 'bamboo', value: '1', symbol: '🀐', name: '일삭' },
  { group: 'bamboo', value: '2', symbol: '🀑', name: '이삭' },
  { group: 'bamboo', value: '3', symbol: '🀒', name: '삼삭' },
  { group: 'bamboo', value: '4', symbol: '🀓', name: '사삭' },
  { group: 'bamboo', value: '5', symbol: '🀔', name: '오삭' },
  { group: 'bamboo', value: '6', symbol: '🀕', name: '육삭' },
  { group: 'bamboo', value: '7', symbol: '🀖', name: '칠삭' },
  { group: 'bamboo', value: '8', symbol: '🀗', name: '팔삭' },
  { group: 'bamboo', value: '9', symbol: '🀘', name: '구삭' },

  // 통수패 (Circle/Pin) 1~9
  { group: 'circle', value: '1', symbol: '🀙', name: '일통' },
  { group: 'circle', value: '2', symbol: '🀚', name: '이통' },
  { group: 'circle', value: '3', symbol: '🀛', name: '삼통' },
  { group: 'circle', value: '4', symbol: '🀜', name: '사통' },
  { group: 'circle', value: '5', symbol: '🀝', name: '오통' },
  { group: 'circle', value: '6', symbol: '🀞', name: '육통' },
  { group: 'circle', value: '7', symbol: '🀟', name: '칠통' },
  { group: 'circle', value: '8', symbol: '🀠', name: '팔통' },
  { group: 'circle', value: '9', symbol: '🀡', name: '구통' },

  // 바람패 (Wind) 동남서북
  { group: 'wind', value: 'E', symbol: '🀀', name: '동풍' },
  { group: 'wind', value: 'S', symbol: '🀁', name: '남풍' },
  { group: 'wind', value: 'W', symbol: '🀂', name: '서풍' },
  { group: 'wind', value: 'N', symbol: '🀃', name: '북풍' },

  // 삼원패 (Dragon) 백발중
  { group: 'dragon', value: 'W', symbol: '🀆', name: '백판' },
  { group: 'dragon', value: 'G', symbol: '🀅', name: '녹발' },
  { group: 'dragon', value: 'R', symbol: '🀄', name: '홍중' },

  // 꽃패 (Flower) 매난국죽
  { group: 'flower', value: 'plum', symbol: '🀢', name: '매화' },
  { group: 'flower', value: 'orchid', symbol: '🀣', name: '난초' },
  { group: 'flower', value: 'chrysanthemum', symbol: '🀤', name: '국화' },
  { group: 'flower', value: 'bamboo', symbol: '🀥', name: '대나무' },

  // 계절패 (Season) 봄여름가을겨울
  { group: 'season', value: 'spring', symbol: '🀦', name: '봄' },
  { group: 'season', value: 'summer', symbol: '🀧', name: '여름' },
  { group: 'season', value: 'autumn', symbol: '🀨', name: '가을' },
  { group: 'season', value: 'winter', symbol: '🀩', name: '겨울' },
];

/**
 * 두 마작 패가 서로 매치될 수 있는지 여부를 판단합니다.
 * - 수패/자패는 그룹과 값이 모두 같아야 합니다.
 * - 꽃패는 그룹이 꽃패면 값에 상관없이 서로 매치할 수 있습니다.
 * - 계절패는 그룹이 계절패면 값에 상관없이 서로 매치할 수 있습니다.
 */
export function isMatchable(a: TileType, b: TileType): boolean {
  if (a.group !== b.group) return false;
  if (a.group === 'flower' || a.group === 'season') return true;
  return a.value === b.value;
}

/**
 * 2D 평면상에서 두 타일이 겹치는지 판단합니다.
 * 타일의 크기는 *2 좌표계 상에서 가로 2, 세로 2 입니다.
 */
export function isOverlapping2D(x1: number, y1: number, x2: number, y2: number): boolean {
  return Math.abs(x1 - x2) < 2 && Math.abs(y1 - y2) < 2;
}

/**
 * 타일이 자유로운 상태(Open - 클릭하여 선택 가능한 상태)인지 확인합니다.
 * 1. 타일 위에 다른 타일이 얹혀있지 않아야 합니다. (z = tile.z + 1 레이어에서 겹치는 타일이 없어야 함)
 * 2. 타일의 왼쪽 또는 오른쪽 중 한 곳이 비어 있어야 합니다.
 *    - 왼쪽 인접 겹침: Z가 같고, x2 = x1 - 2 이고, |y2 - y1| < 2 인 타일
 *    - 오른쪽 인접 겹침: Z가 같고, x2 = x1 + 2 이고, |y2 - y1| < 2 인 타일
 */
export function isOpenTile(tile: TileInstance, allTiles: TileInstance[]): boolean {
  if (tile.isRemoved) return false;

  const activeTiles = allTiles.filter(t => !t.isRemoved && t.id !== tile.id);

  // 1. 위에 얹혀있는 타일이 있는지 확인 (z > tile.z)
  const hasTileAbove = activeTiles.some(t => t.z > tile.z && isOverlapping2D(tile.x, tile.y, t.x, t.y));
  if (hasTileAbove) return false;

  // 2. 왼쪽과 오른쪽에 인접하여 겹치는 타일이 있는지 확인 (동일 Z 평면상)
  let hasLeftNeighbor = false;
  let hasRightNeighbor = false;

  for (const t of activeTiles) {
    if (t.z === tile.z && Math.abs(t.y - tile.y) < 2) {
      if (t.x === tile.x - 2) {
        hasLeftNeighbor = true;
      }
      if (t.x === tile.x + 2) {
        hasRightNeighbor = true;
      }
    }
  }

  // 왼쪽 또는 오른쪽 중 적어도 하나가 비어 있어야 함 (양쪽 다 막혀있으면 Locked)
  return !hasLeftNeighbor || !hasRightNeighbor;
}

/**
 * 보드에 사용할 수 있는 마작 패 리스트를 무작위로 생성합니다.
 * - 전체 필요한 패 수 N은 항상 짝수여야 합니다.
 * - 생성된 패는 무작위 순서로 반환됩니다.
 */
export function generateTilePool(count: number): TileType[] {
  if (count % 2 !== 0) {
    throw new Error('Tile pool count must be even');
  }

  // 기본 마작 패 세트 구성
  // 1. 만수/통수/삭수 1~9 (각 4장씩, 총 108장)
  // 2. 바람 동남서북 (각 4장씩, 총 16장)
  // 3. 삼원 백발중 (각 4장씩, 총 12장)
  // 4. 꽃 매난국죽 (각 1장씩, 총 4장)
  // 5. 계절 봄여름가을겨울 (각 1장씩, 총 4장)
  // 합계: 144장
  const fullPool: TileType[] = [];

  // 1. 일반 패 (4장씩 추가)
  const regularTiles = TILE_DEFINITIONS.filter(t => t.group !== 'flower' && t.group !== 'season');
  for (const tile of regularTiles) {
    for (let i = 0; i < 4; i++) {
      fullPool.push({ ...tile });
    }
  }

  // 2. 꽃패/계절패 (각 1장씩 추가)
  const specialTiles = TILE_DEFINITIONS.filter(t => t.group === 'flower' || t.group === 'season');
  for (const tile of specialTiles) {
    fullPool.push({ ...tile });
  }

  // 셔플 함수
  const shuffle = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // 만약 144개 통째로 필요하다면 그냥 셔플해서 반환
  if (count === 144) {
    return shuffle(fullPool);
  }

  // 144개보다 적은 양이 필요한 경우 (예: Turtle 88개)
  // 쌍(Pair) 단위로 무작위 추출하여 채웁니다.
  // 1. 꽃패나 계절패는 짝수 짝으로만 그룹으로 들어가야 합니다.
  // 안전하게 쌍을 만들기 위해, 일반 패 및 스페셜 패를 쌍(Pair)들의 목록으로 변환
  const pairs: TileType[][] = [];

  // 일반 패는 2쌍씩 만들 수 있으므로 총 2*54 = 108장 -> 54쌍
  for (const tile of regularTiles) {
    pairs.push([tile, tile]);
    pairs.push([tile, tile]);
  }

  // 꽃패는 총 4장이므로 무작위로 2쌍 구성 가능 (꽃패끼리는 다 매칭되므로)
  const flowers = TILE_DEFINITIONS.filter(t => t.group === 'flower');
  pairs.push([flowers[0], flowers[1]]);
  pairs.push([flowers[2], flowers[3]]);

  // 계절패도 무작위 2쌍 구성
  const seasons = TILE_DEFINITIONS.filter(t => t.group === 'season');
  pairs.push([seasons[0], seasons[1]]);
  pairs.push([seasons[2], seasons[3]]);

  // 쌍 리스트를 셔플
  const shuffledPairs = shuffle(pairs);

  // 필요한 수만큼 쌍을 꺼냄
  const neededPairsCount = count / 2;
  const selectedTiles: TileType[] = [];

  for (let i = 0; i < neededPairsCount; i++) {
    const pair = shuffledPairs[i % shuffledPairs.length];
    selectedTiles.push(pair[0], pair[1]);
  }

  // 최종 배치 시 섞이도록 한 번 더 셔플
  return shuffle(selectedTiles);
}

/**
 * 맵의 슬롯 배열을 받아 셔플된 타일 인스턴스 보드를 생성합니다.
 */
export function createBoard(slots: { x: number; y: number; z: number }[]): TileInstance[] {
  const tilePool = generateTilePool(slots.length);
  
  return slots.map((slot, idx) => ({
    id: `tile-${idx}-${slot.x}-${slot.y}-${slot.z}`,
    type: tilePool[idx],
    x: slot.x,
    y: slot.y,
    z: slot.z,
    isRemoved: false,
  }));
}

/**
 * 현재 보드에서 매치 가능한 모든 쌍을 검색하여 반환합니다.
 * 힌트 제공 및 게임 오버(Deadlock) 감지에 사용됩니다.
 */
export function findAvailableMatches(tiles: TileInstance[]): [TileInstance, TileInstance][] {
  const matches: [TileInstance, TileInstance][] = [];
  const openTiles = tiles.filter(t => isOpenTile(t, tiles));

  for (let i = 0; i < openTiles.length; i++) {
    for (let j = i + 1; j < openTiles.length; j++) {
      if (isMatchable(openTiles[i].type, openTiles[j].type)) {
        matches.push([openTiles[i], openTiles[j]]);
      }
    }
  }

  return matches;
}
