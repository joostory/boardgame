import type {
  BowTier,
  ChampionUpgradeDef,
  ChampionUpgradeKey,
  EnemyDefinition,
  EnemyTypeId,
  Point2D,
  StageConfig,
  TowerDefinition,
  TowerSlot,
  TowerTypeId,
} from "./types"

export const CANVAS_WIDTH = 920
export const CANVAS_HEIGHT = 580
export const ROAD_WIDTH = 44

export function distSq(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1
  const dy = y2 - y1
  return dx * dx + dy * dy
}

export function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1)
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/**
 * S-curve road waypoints from left-top Spawn Portal to right-bottom Core Citadel.
 */
export const MAP_WAYPOINTS: Point2D[] = [
  { x: 42, y: 110 },
  { x: 250, y: 110 },
  { x: 250, y: 450 },
  { x: 500, y: 450 },
  { x: 500, y: 130 },
  { x: 750, y: 130 },
  { x: 750, y: 460 },
  { x: 868, y: 460 },
]

/**
 * Twelve strategic build pads positioned alongside bends in the road.
 */
export const TOWER_SLOTS: TowerSlot[] = [
  { id: 0, x: 155, y: 185 },
  { id: 1, x: 155, y: 340 },
  { id: 2, x: 325, y: 195 },
  { id: 3, x: 375, y: 370 },
  { id: 4, x: 425, y: 265 },
  { id: 5, x: 375, y: 525 },
  { id: 6, x: 575, y: 210 },
  { id: 7, x: 625, y: 375 },
  { id: 8, x: 675, y: 280 },
  { id: 9, x: 625, y: 60 },
  { id: 10, x: 830, y: 235 },
  { id: 11, x: 830, y: 380 },
]

/**
 * Five defense buildings unlocked progressively by stage.
 * Each tower has 5 weapon upgrade tiers with distinct names, stats, and perks.
 */
export const TOWER_TYPES: Record<TowerTypeId, TowerDefinition> = {
  crossbow: {
    id: "crossbow",
    key: "1",
    name: "감시자 석궁탑",
    role: "빠른 단일·관통 사격",
    unlockStage: 1,
    cost: 60,
    color: "#38bdf8",
    accent: "#bae6fd",
    description:
      "빠른 연사 속도로 단일 적을 요격하며 3레벨부터 화살이 적을 관통합니다.",
    levels: [
      {
        weaponName: "목제 감시 석궁",
        damage: 22,
        range: 155,
        fireRate: 1.45,
        pierce: 1,
        upgradeCost: 55,
      },
      {
        weaponName: "강철 쇠뇌 포대",
        damage: 34,
        range: 170,
        fireRate: 1.75,
        pierce: 1,
        upgradeCost: 85,
      },
      {
        weaponName: "룬 각인 관통 석궁",
        damage: 50,
        range: 185,
        fireRate: 2.05,
        pierce: 2,
        upgradeCost: 125,
      },
      {
        weaponName: "폭풍 연발 석궁",
        damage: 72,
        range: 200,
        fireRate: 2.45,
        pierce: 2,
        upgradeCost: 175,
      },
      {
        weaponName: "신성 관통 대쇠뇌",
        damage: 105,
        range: 220,
        fireRate: 2.9,
        pierce: 3,
        upgradeCost: null,
      },
    ],
  },
  cannon: {
    id: "cannon",
    key: "2",
    name: "화염 포격탑",
    role: "광역 폭발 · 화상 피해",
    unlockStage: 2,
    cost: 110,
    color: "#fb923c",
    accent: "#fed7aa",
    description:
      "강력한 곡사 포탄으로 몰려드는 적 무리에 광역 폭발과 지속 화상 피해를 입힙니다.",
    levels: [
      {
        weaponName: "청동 화염 박격포",
        damage: 46,
        range: 150,
        fireRate: 0.65,
        splashRadius: 58,
        burnDps: 0,
        upgradeCost: 85,
      },
      {
        weaponName: "강화 작열 포대",
        damage: 68,
        range: 165,
        fireRate: 0.75,
        splashRadius: 68,
        burnDps: 8,
        upgradeCost: 120,
      },
      {
        weaponName: "유황 소이 포격기",
        damage: 96,
        range: 180,
        fireRate: 0.85,
        splashRadius: 78,
        burnDps: 16,
        upgradeCost: 165,
      },
      {
        weaponName: "용암 파쇄 대포",
        damage: 135,
        range: 195,
        fireRate: 0.98,
        splashRadius: 88,
        burnDps: 26,
        upgradeCost: 220,
      },
      {
        weaponName: "지옥불 공성포",
        damage: 190,
        range: 210,
        fireRate: 1.15,
        splashRadius: 102,
        burnDps: 40,
        upgradeCost: null,
      },
    ],
  },
  frost: {
    id: "frost",
    key: "3",
    name: "빙결 마법탑",
    role: "이동 둔화 · 다중 냉기",
    unlockStage: 3,
    cost: 140,
    color: "#67e8f9",
    accent: "#ecfeff",
    description:
      "냉기 수정 파동으로 적의 이동 속도를 크게 늦추고 다수의 적을 동시에 얼립니다.",
    levels: [
      {
        weaponName: "서리 수정 첨탑",
        damage: 16,
        range: 145,
        fireRate: 0.9,
        slowFactor: 0.35,
        slowDuration: 2.2,
        multiTargets: 1,
        upgradeCost: 95,
      },
      {
        weaponName: "빙하 마력탑",
        damage: 24,
        range: 160,
        fireRate: 1.05,
        slowFactor: 0.42,
        slowDuration: 2.6,
        multiTargets: 2,
        upgradeCost: 135,
      },
      {
        weaponName: "한파 파동 오벨리스크",
        damage: 34,
        range: 175,
        fireRate: 1.2,
        slowFactor: 0.48,
        slowDuration: 3.0,
        multiTargets: 2,
        upgradeCost: 185,
      },
      {
        weaponName: "절대영도 냉기탑",
        damage: 48,
        range: 190,
        fireRate: 1.35,
        slowFactor: 0.54,
        slowDuration: 3.4,
        multiTargets: 3,
        upgradeCost: 240,
      },
      {
        weaponName: "만년설 대마법탑",
        damage: 66,
        range: 210,
        fireRate: 1.55,
        slowFactor: 0.6,
        slowDuration: 4.0,
        multiTargets: 4,
        upgradeCost: null,
      },
    ],
  },
  tesla: {
    id: "tesla",
    key: "4",
    name: "뇌전 아크탑",
    role: "연쇄 번개 감전",
    unlockStage: 4,
    cost: 190,
    color: "#c084fc",
    accent: "#f3e8ff",
    description:
      "적들 사이를 연쇄적으로 튕기는 전격 번개를 발사해 대규모 무리를 제압합니다.",
    levels: [
      {
        weaponName: "방전 아크 코일",
        damage: 38,
        range: 165,
        fireRate: 1.0,
        chainCount: 3,
        chainRange: 105,
        upgradeCost: 120,
      },
      {
        weaponName: "고압 뇌전 첨탑",
        damage: 55,
        range: 178,
        fireRate: 1.15,
        chainCount: 4,
        chainRange: 118,
        upgradeCost: 165,
      },
      {
        weaponName: "폭풍 연쇄 발전기",
        damage: 78,
        range: 190,
        fireRate: 1.3,
        chainCount: 4,
        chainRange: 130,
        upgradeCost: 215,
      },
      {
        weaponName: "플라즈마 벼락탑",
        damage: 110,
        range: 205,
        fireRate: 1.48,
        chainCount: 5,
        chainRange: 145,
        upgradeCost: 280,
      },
      {
        weaponName: "천둥신 아크 성탑",
        damage: 155,
        range: 225,
        fireRate: 1.7,
        chainCount: 6,
        chainRange: 160,
        upgradeCost: null,
      },
    ],
  },
  sunburst: {
    id: "sunburst",
    key: "5",
    name: "태양신 성소",
    role: "초고화력 광선 · 공속 버프",
    unlockStage: 5,
    cost: 280,
    color: "#facc15",
    accent: "#fef9c3",
    description:
      "치명적인 태양 광선으로 보스와 중갑병을 녹이고 주변 건물의 공격 속도를 높입니다.",
    levels: [
      {
        weaponName: "여명의 태양 수정",
        damage: 85,
        range: 195,
        fireRate: 1.3,
        auraRange: 150,
        auraBuff: 0.08,
        upgradeCost: 170,
      },
      {
        weaponName: "집광 열선 성소",
        damage: 125,
        range: 210,
        fireRate: 1.48,
        auraRange: 165,
        auraBuff: 0.12,
        upgradeCost: 225,
      },
      {
        weaponName: "광휘의 오라 성소",
        damage: 175,
        range: 225,
        fireRate: 1.65,
        auraRange: 180,
        auraBuff: 0.16,
        upgradeCost: 290,
      },
      {
        weaponName: "항성 폭발 제단",
        damage: 245,
        range: 240,
        fireRate: 1.85,
        auraRange: 195,
        auraBuff: 0.21,
        upgradeCost: 370,
      },
      {
        weaponName: "태양신 심판 성소",
        damage: 340,
        range: 260,
        fireRate: 2.1,
        auraRange: 215,
        auraBuff: 0.28,
        upgradeCost: null,
      },
    ],
  },
}

export const TOWER_ORDER: TowerTypeId[] = [
  "crossbow",
  "cannon",
  "frost",
  "tesla",
  "sunburst",
]

/**
 * Champion bow visual & name progression tied to Bow Damage level.
 */
export const BOW_TIERS: BowTier[] = [
  {
    minLevel: 1,
    name: "사냥꾼의 나무활",
    bowColor: "#d97706",
    arrowColor: "#fde68a",
    trailColor: "rgba(253, 230, 138, 0.45)",
  },
  {
    minLevel: 2,
    name: "정예 강철궁",
    bowColor: "#94a3b8",
    arrowColor: "#e2e8f0",
    trailColor: "rgba(226, 232, 240, 0.55)",
  },
  {
    minLevel: 3,
    name: "비전 룬석궁",
    bowColor: "#38bdf8",
    arrowColor: "#7dd3fc",
    trailColor: "rgba(56, 189, 248, 0.6)",
  },
  {
    minLevel: 4,
    name: "천상의 신성궁",
    bowColor: "#c084fc",
    arrowColor: "#f0abfc",
    trailColor: "rgba(192, 132, 252, 0.65)",
  },
  {
    minLevel: 5,
    name: "불멸의 태양신궁",
    bowColor: "#facc15",
    arrowColor: "#fef08a",
    trailColor: "rgba(250, 204, 21, 0.75)",
  },
]

/**
 * Four champion weapon & utility upgrade paths.
 */
export const CHAMPION_UPGRADES: Record<ChampionUpgradeKey, ChampionUpgradeDef> =
  {
    damage: {
      id: "damage",
      name: "활 공격력 제련",
      shortDesc: "기본 피해 · 치명타 확률 증가 + 활 진화",
      maxLevel: 8,
      baseCost: 45,
      costScale: 1.55,
      getEffectText(level: number) {
        const dmg = 24 + (level - 1) * 14
        const crit = Math.min(45, 5 + (level - 1) * 5)
        return `공격력 ${dmg} · 치명타 ${crit}%`
      },
    },
    fireRate: {
      id: "fireRate",
      name: "속사 & 명궁 시위",
      shortDesc: "공격 속도 및 활 사거리 대폭 증가",
      maxLevel: 7,
      baseCost: 40,
      costScale: 1.5,
      getEffectText(level: number) {
        const rate = (1.6 + (level - 1) * 0.35).toFixed(2)
        const range = 185 + (level - 1) * 18
        return `공속 ${rate}/s · 사거리 ${range}`
      },
    },
    multishot: {
      id: "multishot",
      name: "다중 화살 & 관통",
      shortDesc: "동시 발사 화살 수와 적 관통력 증가",
      maxLevel: 5,
      baseCost: 85,
      costScale: 1.75,
      getEffectText(level: number) {
        const arrows = level
        const pierce = level >= 5 ? 3 : level >= 3 ? 2 : 1
        return `${arrows}발 부채꼴 · 관통 ${pierce}명`
      },
    },
    magnet: {
      id: "magnet",
      name: "황금 자석 & 신속화",
      shortDesc: "드롭 골드 흡수 반경 및 이동 속도 증가",
      maxLevel: 6,
      baseCost: 35,
      costScale: 1.45,
      getEffectText(level: number) {
        const pickup = 68 + (level - 1) * 26
        const speed = 195 + (level - 1) * 16
        return `자석 ${pickup}px · 이속 ${speed}`
      },
    },
  }

export const CHAMPION_UPGRADE_ORDER: ChampionUpgradeKey[] = [
  "damage",
  "fireRate",
  "multishot",
  "magnet",
]

/**
 * Six enemy archetypes (+ split mini slime) unlocked across stages.
 */
export const ENEMY_TYPES: Record<EnemyTypeId, EnemyDefinition> = {
  goblin: {
    id: "goblin",
    name: "고블린 정찰병",
    unlockStage: 1,
    hp: 58,
    speed: 68,
    armor: 0,
    gold: 10,
    coreDamage: 1,
    radius: 12,
    color: "#4ade80",
    stroke: "#166534",
    trait: "무리를 지어 빠르게 전진하는 기본 약탈자",
  },
  wolf: {
    id: "wolf",
    name: "늑대 기수",
    unlockStage: 2,
    hp: 76,
    speed: 112,
    armor: 0,
    gold: 14,
    coreDamage: 1,
    radius: 13,
    color: "#f87171",
    stroke: "#991b1b",
    trait: "높은 이동 속도로 방어선을 돌파하는 돌격병",
  },
  orc: {
    id: "orc",
    name: "오크 중갑병",
    unlockStage: 3,
    hp: 210,
    speed: 48,
    armor: 6,
    gold: 24,
    coreDamage: 2,
    radius: 16,
    color: "#94a3b8",
    stroke: "#334155",
    trait: "방어력(피해 경감)과 높은 체력을 지닌 전열 탱커",
  },
  shaman: {
    id: "shaman",
    name: "암흑 주술사",
    unlockStage: 4,
    hp: 155,
    speed: 58,
    armor: 2,
    gold: 28,
    coreDamage: 2,
    radius: 14,
    color: "#a855f7",
    stroke: "#581c87",
    healRadius: 95,
    healPerSec: 12,
    trait: "주변 적들의 체력을 지속적으로 회복시키는 지원형 적",
  },
  slime: {
    id: "slime",
    name: "분열 슬라임",
    unlockStage: 4,
    hp: 165,
    speed: 54,
    armor: 0,
    gold: 20,
    coreDamage: 2,
    radius: 16,
    color: "#2dd4bf",
    stroke: "#115e59",
    splitCount: 2,
    trait: "처치 시 작은 분열 슬라임 2마리로 나뉘어 진격",
  },
  miniSlime: {
    id: "miniSlime",
    name: "분열체 슬라임",
    unlockStage: 4,
    hp: 58,
    speed: 86,
    armor: 0,
    gold: 7,
    coreDamage: 1,
    radius: 10,
    color: "#5eead4",
    stroke: "#0f766e",
    trait: "분열 슬라임에서 튀어나온 소형 개체",
  },
  golem: {
    id: "golem",
    name: "심연의 공성 골렘",
    unlockStage: 5,
    hp: 760,
    speed: 34,
    armor: 10,
    gold: 95,
    coreDamage: 5,
    radius: 22,
    isBoss: true,
    color: "#f59e0b",
    stroke: "#78350f",
    trait: "거대한 보스 몬스터. 처치 시 대량의 골드 코인을 쏟아냅니다.",
  },
}

export const GUIDE_ENEMY_ORDER: EnemyTypeId[] = [
  "goblin",
  "wolf",
  "orc",
  "shaman",
  "slime",
  "golem",
]

export function getUpgradeCost(
  upgradeDef: ChampionUpgradeDef,
  currentLevel: number,
): number | null {
  if (currentLevel >= upgradeDef.maxLevel) return null
  return Math.round(
    upgradeDef.baseCost * upgradeDef.costScale ** (currentLevel - 1),
  )
}

export function getBowTier(damageLevel: number): BowTier {
  let tier = BOW_TIERS[0]
  for (const candidate of BOW_TIERS) {
    if (damageLevel >= candidate.minLevel) tier = candidate
  }
  return tier
}

/**
 * Generates stage composition, enemy scaling, spawn interval, and stage clear bonus.
 */
export function getStageConfig(stage: number): StageConfig {
  const hpScale =
    1.22 ** (stage - 1) * (stage >= 6 ? 1 + (stage - 5) * 0.14 : 1)
  const spawnInterval = Math.max(0.32, 1.05 - (stage - 1) * 0.08)
  const totalCount = 12 + stage * 5 + Math.floor(stage ** 1.35)

  const queue: EnemyTypeId[] = []
  for (let i = 0; i < totalCount; i++) {
    let type: EnemyTypeId = "goblin"

    if (stage === 1) {
      type = "goblin"
    } else if (stage === 2) {
      type = i % 3 === 2 ? "wolf" : "goblin"
    } else if (stage === 3) {
      if (i % 5 === 4) type = "orc"
      else if (i % 3 === 1) type = "wolf"
      else type = "goblin"
    } else if (stage === 4) {
      if (i % 7 === 6) type = "shaman"
      else if (i % 5 === 4) type = "slime"
      else if (i % 4 === 2) type = "orc"
      else if (i % 3 === 1) type = "wolf"
      else type = "goblin"
    } else {
      const bossFrequency = Math.max(8, 16 - Math.floor((stage - 5) / 2))
      if (
        i > 0 &&
        (i === totalCount - 1 || i % bossFrequency === bossFrequency - 1)
      ) {
        type = "golem"
      } else if (i % 7 === 5) {
        type = "shaman"
      } else if (i % 6 === 4) {
        type = "slime"
      } else if (i % 4 === 2) {
        type = "orc"
      } else if (i % 3 === 1) {
        type = "wolf"
      } else {
        type = "goblin"
      }
    }

    queue.push(type)
  }

  return {
    stage,
    queue,
    hpScale,
    spawnInterval,
    clearBonus: 35 + stage * 15,
  }
}
