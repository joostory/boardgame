import type {
  BowTier,
  ChampionUpgradeDef,
  ChampionUpgradeKey,
  ChampionWeaponDef,
  ChampionWeaponId,
  EnemyDefinition,
  EnemyTypeId,
  MapDefinition,
  MapId,
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

export const CAMPAIGN_STAGES_PER_MAP = 3

export const MAPS: Record<MapId, MapDefinition> = {
  bastion: {
    id: "bastion",
    name: "고대 숲의 S자 요새",
    subtitle: "균형 잡힌 굽이길과 12개 요충지가 있는 기본 전장",
    difficulty: "기본",
    waypoints: MAP_WAYPOINTS,
    slots: TOWER_SLOTS,
    championSpawn: { x: 470, y: 295 },
    theme: {
      turfColors: ["#132a2c", "#112233", "#0d1b2a"],
      borderColor: "rgba(56, 189, 248, 0.32)",
      roadColor: "#475569",
      curbColor: "#334155",
      propStyle: "forest",
    },
  },
  spiral: {
    id: "spiral",
    name: "서리빛 나선 회랑",
    subtitle: "외곽에서 안쪽으로 말려드는 긴 루프형 설원 전장",
    difficulty: "보통",
    waypoints: [
      { x: 52, y: 75 },
      { x: 855, y: 75 },
      { x: 855, y: 505 },
      { x: 85, y: 505 },
      { x: 85, y: 180 },
      { x: 740, y: 180 },
      { x: 740, y: 395 },
      { x: 240, y: 395 },
      { x: 240, y: 285 },
      { x: 560, y: 285 },
    ],
    slots: [
      { id: 0, x: 185, y: 128 },
      { id: 1, x: 410, y: 128 },
      { id: 2, x: 640, y: 128 },
      { id: 3, x: 798, y: 155 },
      { id: 4, x: 798, y: 340 },
      { id: 5, x: 640, y: 450 },
      { id: 6, x: 410, y: 450 },
      { id: 7, x: 185, y: 450 },
      { id: 8, x: 158, y: 295 },
      { id: 9, x: 350, y: 232 },
      { id: 10, x: 550, y: 232 },
      { id: 11, x: 380, y: 340 },
      { id: 12, x: 605, y: 340 },
    ],
    championSpawn: { x: 460, y: 235 },
    theme: {
      turfColors: ["#172a3a", "#1e3a5f", "#0f172a"],
      borderColor: "rgba(125, 211, 252, 0.45)",
      roadColor: "#64748b",
      curbColor: "#475569",
      propStyle: "frost",
    },
  },
  canyon: {
    id: "canyon",
    name: "붉은 협곡의 미로",
    subtitle: "촘촘한 지그재그 굴곡으로 광역·지속 피해가 빛나는 미로",
    difficulty: "도전",
    waypoints: [
      { x: 46, y: 90 },
      { x: 180, y: 90 },
      { x: 180, y: 490 },
      { x: 340, y: 490 },
      { x: 340, y: 90 },
      { x: 500, y: 90 },
      { x: 500, y: 490 },
      { x: 660, y: 490 },
      { x: 660, y: 90 },
      { x: 865, y: 90 },
    ],
    slots: [
      { id: 0, x: 105, y: 180 },
      { id: 1, x: 105, y: 380 },
      { id: 2, x: 260, y: 170 },
      { id: 3, x: 260, y: 300 },
      { id: 4, x: 260, y: 425 },
      { id: 5, x: 420, y: 170 },
      { id: 6, x: 420, y: 300 },
      { id: 7, x: 420, y: 425 },
      { id: 8, x: 580, y: 170 },
      { id: 9, x: 580, y: 300 },
      { id: 10, x: 580, y: 425 },
      { id: 11, x: 755, y: 180 },
      { id: 12, x: 755, y: 350 },
    ],
    championSpawn: { x: 420, y: 295 },
    theme: {
      turfColors: ["#3b1f18", "#2d1612", "#1c0e0b"],
      borderColor: "rgba(251, 146, 60, 0.38)",
      roadColor: "#574137",
      curbColor: "#3f2e26",
      propStyle: "canyon",
    },
  },
  citadel: {
    id: "citadel",
    name: "화산 심연의 중앙 성채",
    subtitle: "사방 외곽을 휘감아 정중앙 성채로 몰려드는 최종 결전장",
    difficulty: "최상",
    waypoints: [
      { x: 50, y: 70 },
      { x: 860, y: 70 },
      { x: 860, y: 510 },
      { x: 70, y: 510 },
      { x: 70, y: 175 },
      { x: 745, y: 175 },
      { x: 745, y: 405 },
      { x: 205, y: 405 },
      { x: 205, y: 290 },
      { x: 460, y: 290 },
    ],
    slots: [
      { id: 0, x: 240, y: 122 },
      { id: 1, x: 460, y: 122 },
      { id: 2, x: 680, y: 122 },
      { id: 3, x: 802, y: 240 },
      { id: 4, x: 802, y: 390 },
      { id: 5, x: 680, y: 458 },
      { id: 6, x: 460, y: 458 },
      { id: 7, x: 240, y: 458 },
      { id: 8, x: 138, y: 340 },
      { id: 9, x: 350, y: 230 },
      { id: 10, x: 570, y: 230 },
      { id: 11, x: 350, y: 348 },
      { id: 12, x: 570, y: 348 },
    ],
    championSpawn: { x: 460, y: 225 },
    theme: {
      turfColors: ["#2b1215", "#1f0f1a", "#12090f"],
      borderColor: "rgba(244, 63, 94, 0.42)",
      roadColor: "#3f333a",
      curbColor: "#291f25",
      propStyle: "lava",
    },
  },
}

export const MAP_ORDER: MapId[] = ["bastion", "spiral", "canyon", "citadel"]

export function getMapById(mapId: MapId): MapDefinition {
  return MAPS[mapId] ?? MAPS.bastion
}

export function getCampaignMapIndex(stage: number): number {
  return Math.min(
    MAP_ORDER.length - 1,
    Math.floor((Math.max(1, stage) - 1) / CAMPAIGN_STAGES_PER_MAP),
  )
}

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
  poison: {
    id: "poison",
    key: "6",
    name: "맹독 연금술탑",
    role: "광역 중독 · 지속 피해",
    unlockStage: 3,
    cost: 120,
    color: "#22c55e",
    accent: "#bbf7d0",
    description:
      "독성 플라스크를 투척해 범위 내 적들에게 오래 지속되는 맹독 피해를 입힙니다.",
    levels: [
      {
        weaponName: "부식 독병 투척기",
        damage: 20,
        range: 155,
        fireRate: 0.9,
        poisonSplash: 56,
        poisonDps: 18,
        poisonDuration: 4.0,
        upgradeCost: 90,
      },
      {
        weaponName: "맹독 안개 분사기",
        damage: 30,
        range: 170,
        fireRate: 1.0,
        poisonSplash: 64,
        poisonDps: 28,
        poisonDuration: 4.5,
        upgradeCost: 130,
      },
      {
        weaponName: "역병 연금술 가마",
        damage: 44,
        range: 185,
        fireRate: 1.12,
        poisonSplash: 74,
        poisonDps: 42,
        poisonDuration: 5.0,
        upgradeCost: 175,
      },
      {
        weaponName: "히드라 산성 포대",
        damage: 62,
        range: 200,
        fireRate: 1.25,
        poisonSplash: 84,
        poisonDps: 62,
        poisonDuration: 5.5,
        upgradeCost: 235,
      },
      {
        weaponName: "심연의 맹독 성배",
        damage: 88,
        range: 215,
        fireRate: 1.4,
        poisonSplash: 96,
        poisonDps: 90,
        poisonDuration: 6.0,
        upgradeCost: null,
      },
    ],
  },
  ballista: {
    id: "ballista",
    key: "7",
    name: "거신 저격 발리스타",
    role: "초장거리 · 방어 무시 관통",
    unlockStage: 5,
    cost: 185,
    color: "#f43f5e",
    accent: "#fecdd3",
    description:
      "초장거리에서 방어력을 무시하는 거대 창을 쏘아 일직선상의 적과 보스를 관통 저격합니다.",
    levels: [
      {
        weaponName: "강철 공성 발리스타",
        damage: 135,
        range: 270,
        fireRate: 0.55,
        pierce: 3,
        critChance: 0.2,
        ignoreArmor: true,
        upgradeCost: 130,
      },
      {
        weaponName: "관통 작살 포대",
        damage: 195,
        range: 295,
        fireRate: 0.62,
        pierce: 4,
        critChance: 0.25,
        ignoreArmor: true,
        upgradeCost: 180,
      },
      {
        weaponName: "용사냥꾼 대발리스타",
        damage: 275,
        range: 320,
        fireRate: 0.7,
        pierce: 4,
        critChance: 0.3,
        ignoreArmor: true,
        upgradeCost: 240,
      },
      {
        weaponName: "섬멸 룬창 발사기",
        damage: 380,
        range: 345,
        fireRate: 0.78,
        pierce: 5,
        critChance: 0.35,
        ignoreArmor: true,
        upgradeCost: 320,
      },
      {
        weaponName: "신살자의 파멸창",
        damage: 520,
        range: 375,
        fireRate: 0.9,
        pierce: 6,
        critChance: 0.45,
        ignoreArmor: true,
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
  "poison",
  "ballista",
]

export const CHAMPION_WEAPONS: Record<ChampionWeaponId, ChampionWeaponDef> = {
  longbow: {
    id: "longbow",
    name: "정예 장궁",
    shortDesc: "균형 잡힌 사거리와 관통 사격",
    color: "#fde68a",
    damageMult: 1.0,
    fireRateMult: 1.0,
    rangeMult: 1.0,
    speedBonus: 0,
    splashRadius: 0,
    pierceBonus: 0,
  },
  handcannon: {
    id: "handcannon",
    name: "폭렬 핸드캐논",
    shortDesc: "느린 연사 대신 강력한 범위 폭발 피해",
    color: "#fb923c",
    damageMult: 1.45,
    fireRateMult: 0.64,
    rangeMult: 0.9,
    speedBonus: -10,
    splashRadius: 56,
    pierceBonus: 0,
  },
  chakram: {
    id: "chakram",
    name: "바람의 쌍차크람",
    shortDesc: "짧은 사거리, 초고속 연사 및 이동 속도 증가",
    color: "#38bdf8",
    damageMult: 0.72,
    fireRateMult: 1.6,
    rangeMult: 0.76,
    speedBonus: 28,
    splashRadius: 0,
    pierceBonus: 1,
  },
}

export const CHAMPION_WEAPON_ORDER: ChampionWeaponId[] = [
  "longbow",
  "handcannon",
  "chakram",
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
