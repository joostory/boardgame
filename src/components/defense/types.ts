export interface Point2D {
  x: number
  y: number
}

export interface TowerSlot {
  id: number
  x: number
  y: number
}

export type MapId = "bastion" | "spiral" | "canyon" | "citadel"

export type GameMode = "single" | "campaign"

export interface MapTheme {
  turfColors: [string, string, string]
  borderColor: string
  roadColor: string
  curbColor: string
  propStyle: "forest" | "frost" | "canyon" | "lava"
}

export interface MapDefinition {
  id: MapId
  name: string
  subtitle: string
  difficulty: string
  waypoints: Point2D[]
  slots: TowerSlot[]
  championSpawn: Point2D
  theme: MapTheme
}

export type TowerTypeId =
  | "crossbow"
  | "cannon"
  | "frost"
  | "tesla"
  | "sunburst"
  | "poison"
  | "ballista"

export interface TowerLevelSpec {
  weaponName: string
  damage: number
  range: number
  fireRate: number
  upgradeCost: number | null
  pierce?: number
  splashRadius?: number
  burnDps?: number
  slowFactor?: number
  slowDuration?: number
  multiTargets?: number
  chainCount?: number
  chainRange?: number
  auraRange?: number
  auraBuff?: number
  poisonDps?: number
  poisonDuration?: number
  poisonSplash?: number
  critChance?: number
  ignoreArmor?: boolean
}

export type ChampionWeaponId = "longbow" | "handcannon" | "chakram"

export interface ChampionWeaponDef {
  id: ChampionWeaponId
  name: string
  shortDesc: string
  color: string
  damageMult: number
  fireRateMult: number
  rangeMult: number
  speedBonus: number
  splashRadius: number
  pierceBonus: number
}

export interface TowerDefinition {
  id: TowerTypeId
  key: string
  name: string
  role: string
  unlockStage: number
  cost: number
  color: string
  accent: string
  description: string
  levels: TowerLevelSpec[]
}

export interface BowTier {
  minLevel: number
  name: string
  bowColor: string
  arrowColor: string
  trailColor: string
}

export type ChampionUpgradeKey = "damage" | "fireRate" | "multishot" | "magnet"

export interface ChampionUpgradeDef {
  id: ChampionUpgradeKey
  name: string
  shortDesc: string
  maxLevel: number
  baseCost: number
  costScale: number
  getEffectText: (level: number) => string
}

export type EnemyTypeId =
  | "goblin"
  | "wolf"
  | "orc"
  | "shaman"
  | "slime"
  | "miniSlime"
  | "golem"

export interface EnemyDefinition {
  id: EnemyTypeId
  name: string
  unlockStage: number
  hp: number
  speed: number
  armor: number
  gold: number
  coreDamage: number
  radius: number
  color: string
  stroke: string
  trait: string
  healRadius?: number
  healPerSec?: number
  splitCount?: number
  isBoss?: boolean
}

export interface StageConfig {
  stage: number
  queue: EnemyTypeId[]
  hpScale: number
  spawnInterval: number
  clearBonus: number
}

export type TargetPriority = "first" | "closest" | "strongest"

export interface TowerInstance {
  slotId: number
  typeId: TowerTypeId
  level: number
  cooldown: number
  angle: number
  priority: TargetPriority
  totalInvested: number
  kills: number
  recoil: number
  beamTarget: Point2D | null
  beamTimer: number
}

export interface EnemyInstance {
  id: string
  typeId: EnemyTypeId
  x: number
  y: number
  waypointIndex: number
  segmentDist: number
  totalProgress: number
  hp: number
  maxHp: number
  speed: number
  armor: number
  gold: number
  radius: number
  facingAngle: number
  walkPhase: number
  slowFactor: number
  slowTimer: number
  burnDps: number
  burnTimer: number
  poisonDps: number
  poisonTimer: number
  hitFlash: number
  healPulseTimer: number
}

export type Projectile =
  | {
      kind: "arrow" | "bolt" | "chakram" | "spear"
      towerSlotId?: number
      x: number
      y: number
      vx: number
      vy: number
      angle: number
      damage: number
      isCrit?: boolean
      ignoreArmor?: boolean
      splashRadius?: number
      pierceLeft: number
      hitIds: Set<string>
      color: string
      trailColor?: string
      life: number
    }
  | {
      kind: "shell" | "poison"
      towerSlotId: number
      x: number
      y: number
      startX: number
      startY: number
      targetX: number
      targetY: number
      totalDist: number
      progress: number
      speed: number
      damage: number
      splashRadius: number
      burnDps: number
      poisonDps?: number
      poisonDuration?: number
      color: string
    }
  | {
      kind: "frost"
      towerSlotId: number
      x: number
      y: number
      targetEnemy: EnemyInstance
      speed: number
      angle: number
      damage: number
      slowFactor: number
      slowDuration: number
      color: string
    }

export interface Coin {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  value: number
  age: number
  maxAge: number
  bobOffset: number
}

export type Effect =
  | {
      kind: "particle"
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      life: number
      maxLife: number
    }
  | {
      kind: "explosion"
      x: number
      y: number
      radius: number
      life: number
      maxLife: number
      color: string
    }
  | {
      kind: "lightning"
      points: Point2D[]
      life: number
      maxLife: number
    }
  | {
      kind: "skyArrow"
      x: number
      y: number
      life: number
      maxLife: number
    }

export interface FloatingText {
  x: number
  y: number
  z: number
  text: string
  color: string
  life: number
  maxLife: number
}

export interface ArrowRainEvent {
  x: number
  y: number
  radius: number
  elapsed: number
  duration: number
  ticksLeft: number
  tickTimer: number
}

export interface ChampionStats {
  damage: number
  critChance: number
  fireRate: number
  range: number
  arrows: number
  pierce: number
  pickupRadius: number
  moveSpeed: number
}

export interface ChampionState {
  x: number
  y: number
  radius: number
  facingAngle: number
  fireCooldown: number
  recoil: number
  walkPhase: number
  arrowRainCooldown: number
  arrowRainMaxCooldown: number
  weaponId: ChampionWeaponId
  levels: Record<ChampionUpgradeKey, number>
}

export interface GameState {
  mode: GameMode
  mapId: MapId
  campaignMapIndex: number
  campaignVictory: boolean
  stage: number
  coreHp: number
  maxCoreHp: number
  gold: number
  totalGoldCollected: number
  kills: number
  autoWave: boolean
  speedMultiplier: number
  paused: boolean
  gameOver: boolean
  waveActive: boolean
  waveCountdown: number
  stageConfig: StageConfig
  spawnIndex: number
  spawnTimer: number
  coreFlash: number
  bannerText: string
  bannerTimer: number
}

export type CameraPresetKey = "quarter" | "high" | "dramatic"

export interface RenderableGameState {
  currentMap: MapDefinition
  state: GameState
  champion: ChampionState
  towers: Map<number, TowerInstance>
  enemies: EnemyInstance[]
  projectiles: Projectile[]
  coins: Coin[]
  effects: Effect[]
  floatingTexts: FloatingText[]
  arrowRainEvents: ArrowRainEvent[]
  selectedSlotId: number | null
  hoveredSlotId: number | null
  getChampionStats: () => ChampionStats
}

export interface HudSnapshot {
  mode: GameMode
  mapId: MapId
  mapName: string
  campaignMapIndex: number
  campaignTotalMaps: number
  campaignVictory: boolean
  stage: number
  remainingText: string
  coreHp: number
  maxCoreHp: number
  gold: number
  totalGoldCollected: number
  kills: number
  waveRatio: number
  hpRatio: number
  skillProgress: number
  arrowRainCooldown: number
  waveActive: boolean
  autoWave: boolean
  speedMultiplier: number
  cameraPresetLabel: string
  soundEnabled: boolean
  paused: boolean
  gameOver: boolean
  championWeaponId: ChampionWeaponId
  championLevels: Record<ChampionUpgradeKey, number>
  championStats: ChampionStats
  championBowName: string
  selectedSlotId: number | null
  selectedTower: {
    slotId: number
    typeId: TowerTypeId
    level: number
    priority: TargetPriority
    kills: number
    totalInvested: number
    speedMult: number
  } | null
}
