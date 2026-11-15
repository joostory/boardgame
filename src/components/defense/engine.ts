import {
  CAMPAIGN_STAGES_PER_MAP,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CHAMPION_UPGRADES,
  CHAMPION_WEAPONS,
  clamp,
  dist,
  distSq,
  ENEMY_TYPES,
  getBowTier,
  getCampaignMapIndex,
  getMapById,
  getStageConfig,
  getUpgradeCost,
  MAP_ORDER,
  TOWER_ORDER,
  TOWER_TYPES,
} from "./data"
import { CAMERA_PRESET_ORDER, CAMERA_PRESETS, Renderer3D } from "./renderer3d"
import { SoundFX } from "./sound"
import type {
  ArrowRainEvent,
  ChampionState,
  ChampionStats,
  ChampionUpgradeKey,
  ChampionWeaponId,
  Coin,
  Effect,
  EnemyInstance,
  EnemyTypeId,
  FloatingText,
  GameMode,
  GameState,
  HudSnapshot,
  MapDefinition,
  MapId,
  Point2D,
  Projectile,
  RenderableGameState,
  TargetPriority,
  TowerInstance,
  TowerLevelSpec,
  TowerSlot,
  TowerTypeId,
} from "./types"

export class DefenseEngine implements RenderableGameState {
  public canvas: HTMLCanvasElement
  public renderer3d: Renderer3D
  public sfx: SoundFX

  public keys = new Set<string>()
  public hoveredSlotId: number | null = null
  public selectedSlotId: number | null = null
  public cameraPresetIndex = 0
  private isOrbitDragging = false
  private lastDragScreen: Point2D | null = null
  private isModalOpen = false

  public state!: GameState
  public currentMap: MapDefinition = getMapById("bastion")
  private selectedMode: GameMode = "single"
  private selectedMapId: MapId = "bastion"
  private selectedWeaponId: ChampionWeaponId = "longbow"
  public champion!: ChampionState
  public towers = new Map<number, TowerInstance>()
  public enemies: EnemyInstance[] = []
  public projectiles: Projectile[] = []
  public coins: Coin[] = []
  public effects: Effect[] = []
  public floatingTexts: FloatingText[] = []
  public arrowRainEvents: ArrowRainEvent[] = []

  private rafId = 0
  private lastTime = 0
  private lastHudEmit = 0
  private onSnapshot: (snapshot: HudSnapshot) => void
  private onCssVars?: (vars: {
    waveRatio: string
    hpRatio: string
    skillProgress: string
  }) => void

  constructor(
    canvas: HTMLCanvasElement,
    onSnapshot: (snapshot: HudSnapshot) => void,
    onCssVars?: (vars: {
      waveRatio: string
      hpRatio: string
      skillProgress: string
    }) => void,
  ) {
    this.canvas = canvas
    this.renderer3d = new Renderer3D(canvas)
    this.sfx = new SoundFX()
    this.onSnapshot = onSnapshot
    this.onCssVars = onCssVars

    this.bindEvents()
    this.resetGame()
    this.lastTime = performance.now()
    this.rafId = requestAnimationFrame((ts) => this.loop(ts))
  }

  public setModalOpen(open: boolean): void {
    this.isModalOpen = open
  }

  public destroy(): void {
    cancelAnimationFrame(this.rafId)
    this.unbindEvents()
  }

  public setModeAndMap(mode: GameMode, mapId?: MapId): void {
    this.selectedMode = mode
    if (mapId) {
      this.selectedMapId = mapId
    }
    this.resetGame()
  }

  public setChampionWeapon(weaponId: ChampionWeaponId): void {
    this.selectedWeaponId = weaponId
    if (this.champion) {
      this.champion.weaponId = weaponId
      const weapon = CHAMPION_WEAPONS[weaponId]
      this.spawnFloatingText(
        this.champion.x,
        this.champion.y - 30,
        `무기 교체: ${weapon.name}`,
        weapon.color,
      )
      this.emitSnapshot(true)
    }
  }

  public resetGame(): void {
    const startMapId =
      this.selectedMode === "campaign" ? MAP_ORDER[0] : this.selectedMapId
    this.currentMap = getMapById(startMapId)

    this.state = {
      mode: this.selectedMode,
      mapId: this.currentMap.id,
      campaignMapIndex: 0,
      campaignVictory: false,
      stage: 1,
      coreHp: 20,
      maxCoreHp: 20,
      gold: 150,
      totalGoldCollected: 0,
      kills: 0,
      autoWave: true,
      speedMultiplier: 1,
      paused: false,
      gameOver: false,
      waveActive: false,
      waveCountdown: 2.5,
      stageConfig: getStageConfig(1),
      spawnIndex: 0,
      spawnTimer: 0,
      coreFlash: 0,
      bannerText:
        this.selectedMode === "campaign"
          ? `원정대 1/${MAP_ORDER.length} [${this.currentMap.name}] — Stage 1 준비!`
          : `[${this.currentMap.name}] Stage 1 준비 — 건물을 세우고 적을 요격하세요!`,
      bannerTimer: 3.5,
    }

    this.champion = {
      x: this.currentMap.championSpawn.x,
      y: this.currentMap.championSpawn.y,
      radius: 16,
      facingAngle: Math.PI,
      fireCooldown: 0,
      recoil: 0,
      walkPhase: 0,
      arrowRainCooldown: 0,
      arrowRainMaxCooldown: 12,
      weaponId: this.selectedWeaponId,
      levels: {
        damage: 1,
        fireRate: 1,
        multishot: 1,
        magnet: 1,
      },
    }

    this.towers.clear()
    this.enemies = []
    this.projectiles = []
    this.coins = []
    this.effects = []
    this.floatingTexts = []
    this.arrowRainEvents = []
    this.selectedSlotId = null

    this.emitSnapshot(true)
  }

  public getChampionStats(): ChampionStats {
    const lv = this.champion.levels
    const weapon = CHAMPION_WEAPONS[this.champion.weaponId]
    const baseDamage = 24 + (lv.damage - 1) * 14
    const baseFireRate = 1.6 + (lv.fireRate - 1) * 0.35
    const baseRange = 185 + (lv.fireRate - 1) * 18
    const basePierce = lv.multishot >= 5 ? 3 : lv.multishot >= 3 ? 2 : 1
    const baseMoveSpeed = 195 + (lv.magnet - 1) * 16

    return {
      damage: Math.round(baseDamage * weapon.damageMult),
      critChance: Math.min(0.45, 0.05 + (lv.damage - 1) * 0.05),
      fireRate: baseFireRate * weapon.fireRateMult,
      range: Math.round(baseRange * weapon.rangeMult),
      arrows: lv.multishot,
      pierce: basePierce + weapon.pierceBonus,
      pickupRadius: 68 + (lv.magnet - 1) * 26,
      moveSpeed: Math.max(120, baseMoveSpeed + weapon.speedBonus),
    }
  }

  public getTowerAuraSpeedBonus(slot: TowerSlot): number {
    let bestBonus = 0
    for (const other of this.towers.values()) {
      if (other.typeId !== "sunburst") continue
      const otherSlot = this.currentMap.slots[other.slotId]
      if (!otherSlot || otherSlot.id === slot.id) continue
      const spec = TOWER_TYPES.sunburst.levels[other.level - 1]
      const auraRange = spec.auraRange ?? 150
      const auraBuff = spec.auraBuff ?? 0
      if (dist(slot.x, slot.y, otherSlot.x, otherSlot.y) <= auraRange) {
        bestBonus = Math.max(bestBonus, auraBuff)
      }
    }
    return 1 + bestBonus
  }

  // Public UI action methods
  public toggleAutoWave(): void {
    this.state.autoWave = !this.state.autoWave
    this.emitSnapshot(true)
  }

  public toggleSpeed(): void {
    this.state.speedMultiplier = this.state.speedMultiplier === 1 ? 2 : 1
    this.emitSnapshot(true)
  }

  public cycleCameraPreset(): void {
    this.cameraPresetIndex =
      (this.cameraPresetIndex + 1) % CAMERA_PRESET_ORDER.length
    const presetKey = CAMERA_PRESET_ORDER[this.cameraPresetIndex]
    this.renderer3d.camera.setPreset(presetKey)
    this.emitSnapshot(true)
  }

  public toggleSound(): void {
    this.sfx.unlock()
    this.sfx.enabled = !this.sfx.enabled
    this.emitSnapshot(true)
  }

  public togglePause(): void {
    this.state.paused = !this.state.paused
    this.emitSnapshot(true)
  }

  public deselectSlot(): void {
    this.selectedSlotId = null
    this.emitSnapshot(true)
  }

  public setSelectedTowerPriority(priority: TargetPriority): void {
    if (this.selectedSlotId === null) return
    const tower = this.towers.get(this.selectedSlotId)
    if (!tower) return
    tower.priority = priority
    this.emitSnapshot(true)
  }

  public startCurrentStage(): void {
    this.sfx.unlock()
    if (this.state.gameOver || this.state.waveActive) return
    this.state.waveActive = true
    this.state.waveCountdown = 0
    this.state.spawnTimer = 0.1

    const stage = this.state.stage
    const newlyUnlockedTowers = TOWER_ORDER.filter(
      (id) => TOWER_TYPES[id].unlockStage === stage,
    ).map((id) => TOWER_TYPES[id].name)

    if (newlyUnlockedTowers.length > 0 && stage > 1) {
      this.state.bannerText = `Stage ${stage} 시작! 신규 건물 해금: ${newlyUnlockedTowers.join(", ")}`
    } else if (stage >= 5) {
      this.state.bannerText = `Stage ${stage} — 공성 보스와 대규모 군단이 몰려옵니다!`
    } else {
      this.state.bannerText = `Stage ${stage} 웨이브 시작!`
    }
    this.state.bannerTimer = 3.0
    this.emitSnapshot(true)
  }

  public handleBuildTowerClick(towerId: TowerTypeId): void {
    this.sfx.unlock()
    if (this.state.gameOver) return
    const def = TOWER_TYPES[towerId]
    if (!def) return

    if (this.state.stage < def.unlockStage) {
      this.spawnFloatingText(
        this.champion.x,
        this.champion.y - 24,
        `Stage ${def.unlockStage} 해금!`,
        "#94a3b8",
      )
      return
    }

    let targetSlotId = this.selectedSlotId
    if (targetSlotId === null || this.towers.has(targetSlotId)) {
      targetSlotId = this.findNearestEmptySlotToChampion()
      if (targetSlotId === null) {
        this.spawnFloatingText(
          this.champion.x,
          this.champion.y - 24,
          "빈 건설 슬롯 없음",
          "#fb7185",
        )
        return
      }
      this.selectedSlotId = targetSlotId
    }

    if (this.state.gold < def.cost) {
      this.spawnFloatingText(
        this.currentMap.slots[targetSlotId].x,
        this.currentMap.slots[targetSlotId].y - 20,
        "골드 부족!",
        "#fb7185",
      )
      return
    }

    this.state.gold -= def.cost
    this.towers.set(targetSlotId, {
      slotId: targetSlotId,
      typeId: towerId,
      level: 1,
      cooldown: 0,
      angle: 0,
      priority: "first",
      totalInvested: def.cost,
      kills: 0,
      recoil: 0,
      beamTarget: null,
      beamTimer: 0,
    })

    const slot = this.currentMap.slots[targetSlotId]
    this.sfx.build()
    this.spawnBurst(slot.x, slot.y, def.color, 14)
    this.spawnFloatingText(slot.x, slot.y - 24, `${def.name} 건설!`, def.color)
    this.emitSnapshot(true)
  }

  public upgradeSelectedTower(): void {
    this.sfx.unlock()
    if (this.state.gameOver || this.selectedSlotId === null) return
    const tower = this.towers.get(this.selectedSlotId)
    if (!tower) return

    const def = TOWER_TYPES[tower.typeId]
    const currentSpec = def.levels[tower.level - 1]
    if (!currentSpec || currentSpec.upgradeCost === null) return

    if (this.state.gold < currentSpec.upgradeCost) {
      const slot = this.currentMap.slots[tower.slotId]
      this.spawnFloatingText(slot.x, slot.y - 26, "골드 부족!", "#fb7185")
      return
    }

    this.state.gold -= currentSpec.upgradeCost
    tower.totalInvested += currentSpec.upgradeCost
    tower.level += 1

    const nextSpec = def.levels[tower.level - 1]
    const slot = this.currentMap.slots[tower.slotId]
    this.sfx.upgrade()
    this.spawnBurst(slot.x, slot.y, "#facc15", 16)
    this.spawnFloatingText(
      slot.x,
      slot.y - 28,
      `Lv.${tower.level} ${nextSpec.weaponName}`,
      "#fde047",
    )
    this.emitSnapshot(true)
  }

  public sellSelectedTower(): void {
    this.sfx.unlock()
    if (this.state.gameOver || this.selectedSlotId === null) return
    const tower = this.towers.get(this.selectedSlotId)
    if (!tower) return

    const refund = Math.round(tower.totalInvested * 0.7)
    const slot = this.currentMap.slots[tower.slotId]
    this.state.gold += refund
    this.towers.delete(this.selectedSlotId)
    this.selectedSlotId = null

    this.sfx.coin()
    this.spawnBurst(slot.x, slot.y, "#94a3b8", 10)
    this.spawnFloatingText(slot.x, slot.y - 20, `+${refund}G 철거`, "#facc15")
    this.emitSnapshot(true)
  }

  public upgradeChampion(key: ChampionUpgradeKey): void {
    this.sfx.unlock()
    if (this.state.gameOver) return
    const upg = CHAMPION_UPGRADES[key]
    const curLv = this.champion.levels[key]
    const cost = getUpgradeCost(upg, curLv)
    if (cost === null) return

    if (this.state.gold < cost) {
      this.spawnFloatingText(
        this.champion.x,
        this.champion.y - 26,
        "골드 부족!",
        "#fb7185",
      )
      return
    }

    this.state.gold -= cost
    this.champion.levels[key] += 1
    this.sfx.upgrade()
    this.spawnBurst(this.champion.x, this.champion.y, "#38bdf8", 14)
    this.spawnFloatingText(
      this.champion.x,
      this.champion.y - 26,
      `${upg.name} Lv.${curLv + 1}`,
      "#7dd3fc",
    )
    this.emitSnapshot(true)
  }

  public triggerArrowRain(): void {
    this.sfx.unlock()
    if (this.state.gameOver || this.state.paused) return
    if (this.champion.arrowRainCooldown > 0) return

    this.champion.arrowRainCooldown = this.champion.arrowRainMaxCooldown

    let targetX = this.champion.x
    let targetY = this.champion.y
    if (this.enemies.length > 0) {
      let bestScore = -1
      for (const e of this.enemies) {
        let count = 0
        for (const other of this.enemies) {
          if (distSq(e.x, e.y, other.x, other.y) <= 95 * 95) count++
        }
        if (count > bestScore) {
          bestScore = count
          targetX = e.x
          targetY = e.y
        }
      }
    }

    this.arrowRainEvents.push({
      x: targetX,
      y: targetY,
      radius: 105,
      elapsed: 0,
      duration: 0.75,
      ticksLeft: 6,
      tickTimer: 0,
    })

    this.sfx.bow()
    this.spawnFloatingText(targetX, targetY - 34, "천공의 화살비!", "#e9d5ff")
    this.emitSnapshot(true)
  }

  // Event listeners
  private onKeyDownBound = (e: KeyboardEvent) => this.onKeyDown(e)
  private onKeyUpBound = (e: KeyboardEvent) => this.onKeyUp(e)
  private onMouseUpBound = () => {
    this.isOrbitDragging = false
    this.lastDragScreen = null
  }
  private onContextMenuBound = (e: MouseEvent) => e.preventDefault()
  private onMouseDownBound = (e: MouseEvent) => {
    if (e.button === 2) {
      this.isOrbitDragging = true
      this.lastDragScreen = this.getCanvasCoords(e)
    }
  }
  private onMouseMoveBound = (e: MouseEvent) => this.onCanvasMouseMove(e)
  private onMouseLeaveBound = () => {
    this.hoveredSlotId = null
  }
  private onClickBound = (e: MouseEvent) => {
    this.sfx.unlock()
    this.onCanvasClick(e)
  }
  private onWheelBound = (e: WheelEvent) => {
    e.preventDefault()
    this.renderer3d.camera.adjustZoom(-e.deltaY * 0.0008)
  }

  private bindEvents(): void {
    window.addEventListener("keydown", this.onKeyDownBound)
    window.addEventListener("keyup", this.onKeyUpBound)
    window.addEventListener("mouseup", this.onMouseUpBound)

    this.canvas.addEventListener("contextmenu", this.onContextMenuBound)
    this.canvas.addEventListener("mousedown", this.onMouseDownBound)
    this.canvas.addEventListener("mousemove", this.onMouseMoveBound)
    this.canvas.addEventListener("mouseleave", this.onMouseLeaveBound)
    this.canvas.addEventListener("click", this.onClickBound)
    this.canvas.addEventListener("wheel", this.onWheelBound, { passive: false })
  }

  private unbindEvents(): void {
    window.removeEventListener("keydown", this.onKeyDownBound)
    window.removeEventListener("keyup", this.onKeyUpBound)
    window.removeEventListener("mouseup", this.onMouseUpBound)

    this.canvas.removeEventListener("contextmenu", this.onContextMenuBound)
    this.canvas.removeEventListener("mousedown", this.onMouseDownBound)
    this.canvas.removeEventListener("mousemove", this.onMouseMoveBound)
    this.canvas.removeEventListener("mouseleave", this.onMouseLeaveBound)
    this.canvas.removeEventListener("click", this.onClickBound)
    this.canvas.removeEventListener("wheel", this.onWheelBound)
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (this.isModalOpen || this.state.gameOver) return

    const code = e.code
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(
        code,
      )
    ) {
      e.preventDefault()
    }

    this.sfx.unlock()
    this.keys.add(code)

    if (code === "Space") {
      this.triggerArrowRain()
    } else if (code === "KeyP") {
      this.togglePause()
    } else if (code === "KeyU") {
      this.upgradeSelectedTower()
    } else if (code === "Escape") {
      this.deselectSlot()
    } else if (code >= "Digit1" && code <= "Digit7") {
      const idx = Number(code.replace("Digit", "")) - 1
      const towerId = TOWER_ORDER[idx]
      if (towerId) this.handleBuildTowerClick(towerId)
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.keys.delete(e.code)
  }

  private getCanvasCoords(e: MouseEvent): Point2D {
    const rect = this.canvas.getBoundingClientRect()
    const scaleX = CANVAS_WIDTH / rect.width
    const scaleY = CANVAS_HEIGHT / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  private findSlotAt(x: number, y: number, maxRadius = 34): number | null {
    let bestId: number | null = null
    let bestDistSq = maxRadius * maxRadius
    for (const slot of this.currentMap.slots) {
      const dSq = distSq(x, y, slot.x, slot.y)
      if (dSq <= bestDistSq) {
        bestDistSq = dSq
        bestId = slot.id
      }
    }
    return bestId
  }

  private findSlotFromScreen(sx: number, sy: number): number | null {
    const ground = this.renderer3d.screenToGround(sx, sy)
    const byGround = this.findSlotAt(ground.x, ground.y, 34)
    if (byGround !== null) return byGround

    let bestId: number | null = null
    let bestDistSq = 28 * 28
    for (const slot of this.currentMap.slots) {
      const zMid = this.towers.has(slot.id) ? 20 : 4
      const p = this.renderer3d.project(slot.x, slot.y, zMid)
      const dSq = distSq(sx, sy, p.x, p.y)
      if (dSq <= bestDistSq) {
        bestDistSq = dSq
        bestId = slot.id
      }
    }
    return bestId
  }

  private findNearestEmptySlotToChampion(): number | null {
    let bestId: number | null = null
    let bestDistSq = Number.POSITIVE_INFINITY
    for (const slot of this.currentMap.slots) {
      if (this.towers.has(slot.id)) continue
      const dSq = distSq(this.champion.x, this.champion.y, slot.x, slot.y)
      if (dSq < bestDistSq) {
        bestDistSq = dSq
        bestId = slot.id
      }
    }
    return bestId
  }

  private onCanvasMouseMove(e: MouseEvent): void {
    const pos = this.getCanvasCoords(e)
    if (this.isOrbitDragging && this.lastDragScreen) {
      const dx = pos.x - this.lastDragScreen.x
      const dy = pos.y - this.lastDragScreen.y
      this.renderer3d.camera.orbit(-dx * 0.0055, dy * 0.0045)
      this.lastDragScreen = pos
      return
    }
    this.hoveredSlotId = this.findSlotFromScreen(pos.x, pos.y)
  }

  private onCanvasClick(e: MouseEvent): void {
    if (e.button !== 0) return
    const pos = this.getCanvasCoords(e)
    const slotId = this.findSlotFromScreen(pos.x, pos.y)
    this.selectedSlotId = slotId
    this.emitSnapshot(true)
  }

  // Main simulation loop
  private loop(timestamp: number): void {
    const rawDt = Math.min(0.05, (timestamp - this.lastTime) / 1000)
    this.lastTime = timestamp

    this.updateCamera(rawDt)

    if (
      !this.state.paused &&
      !this.state.gameOver &&
      !this.state.campaignVictory
    ) {
      const dt = rawDt * this.state.speedMultiplier
      this.update(dt, timestamp)
    }

    this.renderer3d.render(this)
    this.rafId = requestAnimationFrame((ts) => this.loop(ts))
  }

  private updateCamera(dt: number): void {
    if (this.isModalOpen || this.state.gameOver) return
    let yawDelta = 0
    if (this.keys.has("KeyQ")) yawDelta -= 1.35 * dt
    if (this.keys.has("KeyE")) yawDelta += 1.35 * dt
    if (yawDelta !== 0) {
      this.renderer3d.camera.orbit(yawDelta, 0)
    }
  }

  private update(dt: number, timestamp: number): void {
    if (this.state.bannerTimer > 0) {
      this.state.bannerTimer = Math.max(0, this.state.bannerTimer - dt)
    }
    if (this.state.coreFlash > 0) {
      this.state.coreFlash = Math.max(0, this.state.coreFlash - dt * 2.5)
    }

    this.updateWaveSpawner(dt)
    this.updateChampion(dt)
    this.updateArrowRain(dt)
    this.updateTowers(dt)
    this.updateProjectiles(dt)
    this.updateEnemies(dt)
    this.updateCoins(dt)
    this.updateEffects(dt)

    if (timestamp - this.lastHudEmit >= 80) {
      this.emitSnapshot(false, timestamp)
    }
  }

  private updateWaveSpawner(dt: number): void {
    const cfg = this.state.stageConfig

    if (!this.state.waveActive) {
      if (this.state.autoWave) {
        this.state.waveCountdown -= dt
        if (this.state.waveCountdown <= 0) {
          this.startCurrentStage()
        }
      }
      return
    }

    if (this.state.spawnIndex < cfg.queue.length) {
      this.state.spawnTimer -= dt
      if (this.state.spawnTimer <= 0) {
        const enemyTypeId = cfg.queue[this.state.spawnIndex]
        this.spawnEnemy(enemyTypeId, 0, 0)
        this.state.spawnIndex += 1
        this.state.spawnTimer = cfg.spawnInterval
      }
    } else if (this.enemies.length === 0) {
      this.state.waveActive = false
      this.state.gold += cfg.clearBonus
      this.state.totalGoldCollected += cfg.clearBonus
      this.sfx.stageClear()
      this.spawnFloatingText(
        this.champion.x,
        this.champion.y - 30,
        `Stage ${this.state.stage} 클리어 +${cfg.clearBonus}G`,
        "#facc15",
      )

      const totalCampaignStages = MAP_ORDER.length * CAMPAIGN_STAGES_PER_MAP
      if (
        this.state.mode === "campaign" &&
        this.state.stage >= totalCampaignStages
      ) {
        this.state.campaignVictory = true
        this.state.bannerText = "축하합니다! 모든 전장을 정복했습니다!"
        this.state.bannerTimer = 6.0
        this.emitSnapshot(true)
        return
      }

      this.state.stage += 1
      this.state.stageConfig = getStageConfig(this.state.stage)
      this.state.spawnIndex = 0
      this.state.waveCountdown = 3.2

      if (this.state.mode === "campaign") {
        const nextMapIdx = getCampaignMapIndex(this.state.stage)
        if (nextMapIdx !== this.state.campaignMapIndex) {
          let refund = 0
          for (const t of this.towers.values()) {
            refund += t.totalInvested
          }
          this.towers.clear()
          this.selectedSlotId = null
          this.hoveredSlotId = null
          this.projectiles = []
          this.coins = []
          this.effects = []
          this.arrowRainEvents = []

          this.state.gold += refund
          this.state.coreHp = Math.min(
            this.state.maxCoreHp,
            this.state.coreHp + 3,
          )
          this.state.campaignMapIndex = nextMapIdx
          this.currentMap = getMapById(MAP_ORDER[nextMapIdx])
          this.state.mapId = this.currentMap.id
          this.champion.x = this.currentMap.championSpawn.x
          this.champion.y = this.currentMap.championSpawn.y
          this.state.waveCountdown = 5.0

          this.state.bannerText = `원정대 ${nextMapIdx + 1}/${MAP_ORDER.length} [${this.currentMap.name}] 이동! (타워 ${refund}G 전액 환급 · 체력 +3)`
          this.state.bannerTimer = 4.5
          this.emitSnapshot(true)
          return
        }
      }

      const unlocked = TOWER_ORDER.filter(
        (id) => TOWER_TYPES[id].unlockStage === this.state.stage,
      ).map((id) => TOWER_TYPES[id].name)
      this.state.bannerText =
        unlocked.length > 0
          ? `Stage ${this.state.stage - 1} 클리어! 해금: ${unlocked.join(", ")}`
          : `Stage ${this.state.stage - 1} 클리어! (+${cfg.clearBonus}G)`
      this.state.bannerTimer = 3.5

      this.emitSnapshot(true)
    }
  }

  private spawnEnemy(
    typeId: EnemyTypeId,
    waypointIndex: number,
    segmentDist: number,
    offsetX = 0,
    offsetY = 0,
  ): void {
    const def = ENEMY_TYPES[typeId]
    const hpScale = this.state.stageConfig.hpScale
    const wp =
      this.currentMap.waypoints[waypointIndex] || this.currentMap.waypoints[0]
    const maxHp = Math.round(def.hp * hpScale)

    this.enemies.push({
      id: Math.random().toString(36).slice(2),
      typeId,
      x: wp.x + offsetX,
      y: wp.y + offsetY,
      waypointIndex,
      segmentDist,
      totalProgress: waypointIndex * 1000 + segmentDist,
      hp: maxHp,
      maxHp,
      speed: def.speed,
      armor: def.armor + Math.floor(Math.max(0, this.state.stage - 4) * 0.6),
      gold: def.gold + Math.floor((this.state.stage - 1) * 1.2),
      radius: def.radius,
      facingAngle: 0,
      walkPhase: Math.random() * Math.PI * 2,
      slowFactor: 0,
      slowTimer: 0,
      burnDps: 0,
      burnTimer: 0,
      poisonDps: 0,
      poisonTimer: 0,
      hitFlash: 0,
      healPulseTimer: 0,
    })
  }

  private updateChampion(dt: number): void {
    const stats = this.getChampionStats()
    let dx = 0
    let dy = 0

    if (this.keys.has("KeyW") || this.keys.has("ArrowUp")) dy -= 1
    if (this.keys.has("KeyS") || this.keys.has("ArrowDown")) dy += 1
    if (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) dx -= 1
    if (this.keys.has("KeyD") || this.keys.has("ArrowRight")) dx += 1

    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy)
      dx /= len
      dy /= len
      this.champion.x = clamp(
        this.champion.x + dx * stats.moveSpeed * dt,
        24,
        CANVAS_WIDTH - 24,
      )
      this.champion.y = clamp(
        this.champion.y + dy * stats.moveSpeed * dt,
        24,
        CANVAS_HEIGHT - 24,
      )
      this.champion.walkPhase += dt * 12
      if (this.enemies.length === 0) {
        this.champion.facingAngle = Math.atan2(dy, dx)
      }
    }

    if (this.champion.recoil > 0) {
      this.champion.recoil = Math.max(0, this.champion.recoil - dt * 5)
    }
    if (this.champion.arrowRainCooldown > 0) {
      this.champion.arrowRainCooldown = Math.max(
        0,
        this.champion.arrowRainCooldown - dt,
      )
    }

    this.champion.fireCooldown -= dt
    const target = this.findChampionTarget(stats.range)
    if (target) {
      const aimAngle = Math.atan2(
        target.y - this.champion.y,
        target.x - this.champion.x,
      )
      this.champion.facingAngle = aimAngle

      if (this.champion.fireCooldown <= 0) {
        this.fireChampionBow(aimAngle, stats)
        this.champion.fireCooldown = 1 / stats.fireRate
        this.champion.recoil = 1
      }
    }
  }

  private findChampionTarget(range: number): EnemyInstance | null {
    let best: EnemyInstance | null = null
    let bestDistSq = range * range
    for (const e of this.enemies) {
      const dSq = distSq(this.champion.x, this.champion.y, e.x, e.y)
      if (dSq <= bestDistSq) {
        bestDistSq = dSq
        best = e
      }
    }
    return best
  }

  private fireChampionBow(baseAngle: number, stats: ChampionStats): void {
    const tier = getBowTier(this.champion.levels.damage)
    const weapon = CHAMPION_WEAPONS[this.champion.weaponId]
    const arrowCount = stats.arrows
    const spreadStep = this.champion.weaponId === "chakram" ? 0.19 : 0.14
    const startOffset = -((arrowCount - 1) * spreadStep) / 2
    const speed =
      this.champion.weaponId === "chakram"
        ? 630
        : this.champion.weaponId === "handcannon"
          ? 470
          : 560

    for (let i = 0; i < arrowCount; i++) {
      const angle = baseAngle + startOffset + i * spreadStep
      const isCrit = Math.random() < stats.critChance
      const dmg = Math.round(stats.damage * (isCrit ? 1.8 : 1))

      this.projectiles.push({
        kind: this.champion.weaponId === "chakram" ? "chakram" : "arrow",
        x: this.champion.x + Math.cos(angle) * 14,
        y: this.champion.y + Math.sin(angle) * 14,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        angle,
        damage: dmg,
        isCrit,
        splashRadius: weapon.splashRadius > 0 ? weapon.splashRadius : undefined,
        pierceLeft: stats.pierce,
        hitIds: new Set(),
        color:
          this.champion.weaponId === "longbow" ? tier.arrowColor : weapon.color,
        trailColor:
          this.champion.weaponId === "longbow"
            ? tier.trailColor
            : `${weapon.color}88`,
        life: this.champion.weaponId === "chakram" ? 0.65 : 0.9,
      })
    }

    if (this.champion.weaponId === "handcannon") {
      this.sfx.cannon()
    } else {
      this.sfx.bow()
    }
  }

  private updateArrowRain(dt: number): void {
    const stats = this.getChampionStats()
    for (let i = this.arrowRainEvents.length - 1; i >= 0; i--) {
      const ev = this.arrowRainEvents[i]
      ev.elapsed += dt
      ev.tickTimer -= dt

      if (ev.tickTimer <= 0 && ev.ticksLeft > 0) {
        ev.ticksLeft -= 1
        ev.tickTimer = 0.11

        for (let k = 0; k < 3; k++) {
          const ang = Math.random() * Math.PI * 2
          const r = Math.random() * ev.radius
          const ix = ev.x + Math.cos(ang) * r
          const iy = ev.y + Math.sin(ang) * r

          this.effects.push({
            kind: "skyArrow",
            x: ix,
            y: iy,
            life: 0.25,
            maxLife: 0.25,
          })

          const hitRadiusSq = 54 * 54
          for (const e of this.enemies) {
            if (distSq(ix, iy, e.x, e.y) <= hitRadiusSq) {
              this.damageEnemy(e, Math.round(stats.damage * 1.15), true, false)
            }
          }
        }
      }

      if (ev.elapsed >= ev.duration && ev.ticksLeft <= 0) {
        this.arrowRainEvents.splice(i, 1)
      }
    }
  }

  private updateTowers(dt: number): void {
    for (const tower of this.towers.values()) {
      const slot = this.currentMap.slots[tower.slotId]
      const def = TOWER_TYPES[tower.typeId]
      const spec = def.levels[tower.level - 1]

      if (tower.recoil > 0) tower.recoil = Math.max(0, tower.recoil - dt * 4)
      if (tower.beamTimer > 0) {
        tower.beamTimer = Math.max(0, tower.beamTimer - dt)
      }

      const speedMult = this.getTowerAuraSpeedBonus(slot)
      tower.cooldown -= dt * speedMult
      if (tower.cooldown > 0) continue

      const targets = this.selectTowerTargets(slot, spec, tower.priority)
      if (targets.length === 0) continue

      const primary = targets[0]
      tower.angle = Math.atan2(primary.y - slot.y, primary.x - slot.x)
      tower.cooldown = 1 / spec.fireRate
      tower.recoil = 1

      this.fireTowerWeapon(tower, slot, def.color, def.accent, spec, targets)
    }
  }

  private selectTowerTargets(
    slot: TowerSlot,
    spec: TowerLevelSpec,
    priority: TargetPriority,
  ): EnemyInstance[] {
    const rangeSq = spec.range * spec.range
    const inRange: { enemy: EnemyInstance; dSq: number }[] = []
    for (const e of this.enemies) {
      const dSq = distSq(slot.x, slot.y, e.x, e.y)
      if (dSq <= rangeSq) {
        inRange.push({ enemy: e, dSq })
      }
    }
    if (inRange.length === 0) return []

    inRange.sort((a, b) => {
      if (priority === "closest") return a.dSq - b.dSq
      if (priority === "strongest") return b.enemy.hp - a.enemy.hp
      return b.enemy.totalProgress - a.enemy.totalProgress
    })

    const maxCount = spec.multiTargets || 1
    return inRange.slice(0, maxCount).map((item) => item.enemy)
  }

  private fireTowerWeapon(
    tower: TowerInstance,
    slot: TowerSlot,
    defColor: string,
    defAccent: string,
    spec: TowerLevelSpec,
    targets: EnemyInstance[],
  ): void {
    const primary = targets[0]

    if (tower.typeId === "crossbow") {
      const angle = Math.atan2(primary.y - slot.y, primary.x - slot.x)
      this.projectiles.push({
        kind: "bolt",
        towerSlotId: tower.slotId,
        x: slot.x + Math.cos(angle) * 16,
        y: slot.y + Math.sin(angle) * 16,
        vx: Math.cos(angle) * 520,
        vy: Math.sin(angle) * 520,
        angle,
        damage: spec.damage,
        pierceLeft: spec.pierce ?? 1,
        hitIds: new Set(),
        color: defAccent,
        life: 0.9,
      })
      this.sfx.bow()
    } else if (tower.typeId === "cannon") {
      const angle = Math.atan2(primary.y - slot.y, primary.x - slot.x)
      const startX = slot.x + Math.cos(angle) * 16
      const startY = slot.y + Math.sin(angle) * 16
      const totalDist = Math.max(1, dist(startX, startY, primary.x, primary.y))
      this.projectiles.push({
        kind: "shell",
        towerSlotId: tower.slotId,
        x: startX,
        y: startY,
        startX,
        startY,
        targetX: primary.x,
        targetY: primary.y,
        totalDist,
        progress: 0,
        speed: 330,
        damage: spec.damage,
        splashRadius: spec.splashRadius ?? 58,
        burnDps: spec.burnDps ?? 0,
        color: defColor,
      })
      this.sfx.cannon()
    } else if (tower.typeId === "frost") {
      for (const t of targets) {
        const angle = Math.atan2(t.y - slot.y, t.x - slot.x)
        this.projectiles.push({
          kind: "frost",
          towerSlotId: tower.slotId,
          x: slot.x,
          y: slot.y,
          targetEnemy: t,
          speed: 380,
          angle,
          damage: spec.damage,
          slowFactor: spec.slowFactor ?? 0.35,
          slowDuration: spec.slowDuration ?? 2.2,
          color: defColor,
        })
      }
      this.sfx.frost()
    } else if (tower.typeId === "tesla") {
      this.fireTeslaChain(tower, slot, spec, primary)
      this.sfx.tesla()
    } else if (tower.typeId === "sunburst") {
      tower.beamTarget = { x: primary.x, y: primary.y }
      tower.beamTimer = 0.16
      const killed = this.damageEnemy(primary, spec.damage, false, true)
      if (killed) tower.kills += 1
      this.spawnBurst(primary.x, primary.y, "#fef08a", 6)
      this.sfx.sunburst()
    } else if (tower.typeId === "poison") {
      const angle = Math.atan2(primary.y - slot.y, primary.x - slot.x)
      const startX = slot.x + Math.cos(angle) * 14
      const startY = slot.y + Math.sin(angle) * 14
      const totalDist = Math.max(1, dist(startX, startY, primary.x, primary.y))
      this.projectiles.push({
        kind: "poison",
        towerSlotId: tower.slotId,
        x: startX,
        y: startY,
        startX,
        startY,
        targetX: primary.x,
        targetY: primary.y,
        totalDist,
        progress: 0,
        speed: 350,
        damage: spec.damage,
        splashRadius: spec.poisonSplash ?? 56,
        burnDps: 0,
        poisonDps: spec.poisonDps ?? 18,
        poisonDuration: spec.poisonDuration ?? 4.0,
        color: defColor,
      })
      this.sfx.frost()
    } else if (tower.typeId === "ballista") {
      const angle = Math.atan2(primary.y - slot.y, primary.x - slot.x)
      const isCrit = Math.random() < (spec.critChance ?? 0.2)
      const dmg = Math.round(spec.damage * (isCrit ? 1.85 : 1))
      this.projectiles.push({
        kind: "spear",
        towerSlotId: tower.slotId,
        x: slot.x + Math.cos(angle) * 20,
        y: slot.y + Math.sin(angle) * 20,
        vx: Math.cos(angle) * 760,
        vy: Math.sin(angle) * 760,
        angle,
        damage: dmg,
        isCrit,
        ignoreArmor: spec.ignoreArmor ?? true,
        pierceLeft: spec.pierce ?? 3,
        hitIds: new Set(),
        color: defColor,
        trailColor: "rgba(244, 63, 94, 0.55)",
        life: 0.9,
      })
      this.sfx.bow()
    }
  }

  private fireTeslaChain(
    tower: TowerInstance,
    slot: TowerSlot,
    spec: TowerLevelSpec,
    firstTarget: EnemyInstance,
  ): void {
    const chainPoints: Point2D[] = [{ x: slot.x, y: slot.y }]
    const hitSet = new Set<string>()
    let current: EnemyInstance | null = firstTarget
    let dmg = spec.damage
    const chainCount = spec.chainCount ?? 3
    const chainRange = spec.chainRange ?? 105

    for (let hop = 0; hop < chainCount && current; hop++) {
      chainPoints.push({ x: current.x, y: current.y })
      hitSet.add(current.id)
      const killed = this.damageEnemy(current, Math.round(dmg), false, false)
      if (killed) tower.kills += 1
      this.spawnBurst(current.x, current.y, "#d8b4fe", 5)

      dmg *= 0.84
      let nextEnemy: EnemyInstance | null = null
      let bestDistSq = chainRange * chainRange
      for (const candidate of this.enemies) {
        if (hitSet.has(candidate.id) || candidate.hp <= 0) continue
        const dSq = distSq(current.x, current.y, candidate.x, candidate.y)
        if (dSq <= bestDistSq) {
          bestDistSq = dSq
          nextEnemy = candidate
        }
      }
      current = nextEnemy
    }

    this.effects.push({
      kind: "lightning",
      points: chainPoints,
      life: 0.18,
      maxLife: 0.18,
    })
  }

  private updateProjectiles(dt: number): void {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i]

      if (
        p.kind === "arrow" ||
        p.kind === "bolt" ||
        p.kind === "chakram" ||
        p.kind === "spear"
      ) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.life -= dt

        let remove =
          p.life <= 0 ||
          p.x < -20 ||
          p.x > CANVAS_WIDTH + 20 ||
          p.y < -20 ||
          p.y > CANVAS_HEIGHT + 20
        if (!remove) {
          for (const e of this.enemies) {
            if (e.hp <= 0 || p.hitIds.has(e.id)) continue
            if (distSq(p.x, p.y, e.x, e.y) <= (e.radius + 7) * (e.radius + 7)) {
              p.hitIds.add(e.id)
              if (p.splashRadius && p.splashRadius > 0) {
                this.effects.push({
                  kind: "explosion",
                  x: p.x,
                  y: p.y,
                  radius: p.splashRadius,
                  life: 0.22,
                  maxLife: 0.22,
                  color: p.color,
                })
                const rSq = p.splashRadius * p.splashRadius
                for (const splashTarget of this.enemies) {
                  if (splashTarget.hp <= 0) continue
                  if (distSq(p.x, p.y, splashTarget.x, splashTarget.y) <= rSq) {
                    const dmgAmount =
                      splashTarget.id === e.id
                        ? p.damage
                        : Math.round(p.damage * 0.65)
                    this.damageEnemy(
                      splashTarget,
                      dmgAmount,
                      splashTarget.id === e.id ? !!p.isCrit : false,
                      !!p.ignoreArmor,
                    )
                  }
                }
              } else {
                const killed = this.damageEnemy(
                  e,
                  p.damage,
                  !!p.isCrit,
                  !!p.ignoreArmor,
                )
                if (killed && p.towerSlotId !== undefined) {
                  const t = this.towers.get(p.towerSlotId)
                  if (t) t.kills += 1
                }
              }
              this.spawnBurst(p.x, p.y, p.color, 4)
              p.pierceLeft -= 1
              if (p.pierceLeft <= 0) {
                remove = true
                break
              }
            }
          }
        }
        if (remove) this.projectiles.splice(i, 1)
      } else if (p.kind === "shell" || p.kind === "poison") {
        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        const d = Math.hypot(dx, dy)
        const step = p.speed * dt
        if (d <= step + 4) {
          this.explodeShell(p)
          this.projectiles.splice(i, 1)
        } else {
          p.x += (dx / d) * step
          p.y += (dy / d) * step
          p.progress = clamp(1 - (d - step) / p.totalDist, 0, 1)
        }
      } else if (p.kind === "frost") {
        if (!p.targetEnemy || p.targetEnemy.hp <= 0) {
          this.projectiles.splice(i, 1)
          continue
        }
        const dx = p.targetEnemy.x - p.x
        const dy = p.targetEnemy.y - p.y
        const d = Math.hypot(dx, dy)
        const step = p.speed * dt
        if (d <= step + p.targetEnemy.radius) {
          const e = p.targetEnemy
          e.slowFactor = Math.max(e.slowFactor, p.slowFactor)
          e.slowTimer = Math.max(e.slowTimer, p.slowDuration)
          const killed = this.damageEnemy(e, p.damage, false, true)
          if (killed) {
            const t = this.towers.get(p.towerSlotId)
            if (t) t.kills += 1
          }
          this.spawnBurst(e.x, e.y, "#a5f3fc", 7)
          this.projectiles.splice(i, 1)
        } else {
          p.x += (dx / d) * step
          p.y += (dy / d) * step
          p.angle = Math.atan2(dy, dx)
        }
      }
    }
  }

  private explodeShell(
    p: Extract<Projectile, { kind: "shell" | "poison" }>,
  ): void {
    this.effects.push({
      kind: "explosion",
      x: p.targetX,
      y: p.targetY,
      radius: p.splashRadius,
      life: 0.28,
      maxLife: 0.28,
      color: p.color,
    })
    this.spawnBurst(
      p.targetX,
      p.targetY,
      p.kind === "poison" ? "#4ade80" : "#fb923c",
      12,
    )

    const rSq = p.splashRadius * p.splashRadius
    const ownerTower = this.towers.get(p.towerSlotId)
    for (const e of this.enemies) {
      if (e.hp <= 0) continue
      if (distSq(p.targetX, p.targetY, e.x, e.y) <= rSq) {
        if (p.burnDps > 0) {
          e.burnDps = Math.max(e.burnDps, p.burnDps)
          e.burnTimer = 3.0
        }
        if (p.poisonDps && p.poisonDps > 0) {
          e.poisonDps = Math.max(e.poisonDps, p.poisonDps)
          e.poisonTimer = Math.max(e.poisonTimer, p.poisonDuration ?? 4.0)
        }
        const killed = this.damageEnemy(e, p.damage, false, p.kind === "poison")
        if (killed && ownerTower) ownerTower.kills += 1
      }
    }
  }

  private damageEnemy(
    enemy: EnemyInstance,
    rawAmount: number,
    isCrit: boolean,
    trueDamage: boolean,
  ): boolean {
    if (enemy.hp <= 0) return false
    const mitigated = trueDamage
      ? rawAmount
      : Math.max(Math.round(rawAmount * 0.25), rawAmount - enemy.armor)
    enemy.hp -= mitigated
    enemy.hitFlash = 1

    if (isCrit) {
      this.spawnFloatingText(enemy.x, enemy.y - 16, `${mitigated}!`, "#fef08a")
    }

    if (enemy.hp <= 0) {
      this.onEnemyKilled(enemy)
      return true
    }
    return false
  }

  private onEnemyKilled(enemy: EnemyInstance): void {
    this.state.kills += 1
    const def = ENEMY_TYPES[enemy.typeId]
    this.spawnBurst(enemy.x, enemy.y, def.color, 10)

    const coinCount = def.isBoss ? 9 : enemy.gold >= 24 ? 3 : 1
    const baseValue = Math.floor(enemy.gold / coinCount)
    let remainder = enemy.gold - baseValue * coinCount

    for (let i = 0; i < coinCount; i++) {
      const val = baseValue + (remainder > 0 ? 1 : 0)
      if (remainder > 0) remainder -= 1
      const angle = Math.random() * Math.PI * 2
      const push =
        coinCount > 1 ? 35 + Math.random() * 45 : 15 + Math.random() * 25
      this.coins.push({
        x: enemy.x,
        y: enemy.y,
        z: 12,
        vx: Math.cos(angle) * push,
        vy: Math.sin(angle) * push,
        vz: 95 + Math.random() * 60,
        value: val,
        age: 0,
        maxAge: 45,
        bobOffset: Math.random() * Math.PI * 2,
      })
    }

    while (this.coins.length > 260) {
      const oldest = this.coins.shift()
      if (oldest) {
        this.state.gold += oldest.value
        this.state.totalGoldCollected += oldest.value
      }
    }

    if (def.splitCount) {
      for (let s = 0; s < def.splitCount; s++) {
        const ox = (s === 0 ? -10 : 10) + (Math.random() * 6 - 3)
        const oy = Math.random() * 10 - 5
        this.spawnEnemy(
          "miniSlime",
          enemy.waypointIndex,
          Math.max(0, enemy.segmentDist - 12),
          ox,
          oy,
        )
      }
    }
  }

  private updateEnemies(dt: number): void {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i]
      if (e.hp <= 0) {
        this.enemies.splice(i, 1)
        continue
      }

      if (e.hitFlash > 0) e.hitFlash = Math.max(0, e.hitFlash - dt * 5)

      if (e.burnTimer > 0) {
        e.burnTimer -= dt
        e.hp -= e.burnDps * dt
        if (e.hp <= 0) {
          this.onEnemyKilled(e)
          this.enemies.splice(i, 1)
          continue
        }
      }

      if (e.poisonTimer > 0) {
        e.poisonTimer -= dt
        e.hp -= e.poisonDps * dt
        if (e.hp <= 0) {
          this.onEnemyKilled(e)
          this.enemies.splice(i, 1)
          continue
        }
      }

      if (e.slowTimer > 0) {
        e.slowTimer -= dt
        if (e.slowTimer <= 0) e.slowFactor = 0
      }

      const def = ENEMY_TYPES[e.typeId]
      if (def.healRadius && def.healPerSec) {
        e.healPulseTimer += dt
        const rSq = def.healRadius * def.healRadius
        for (const ally of this.enemies) {
          if (
            ally.hp > 0 &&
            ally.hp < ally.maxHp &&
            distSq(e.x, e.y, ally.x, ally.y) <= rSq
          ) {
            ally.hp = Math.min(ally.maxHp, ally.hp + def.healPerSec * dt)
          }
        }
      }

      const effectiveSpeed = e.speed * (1 - e.slowFactor)
      e.walkPhase += effectiveSpeed * dt * 0.14
      let remainingMove = effectiveSpeed * dt
      let reachedCore = false

      while (remainingMove > 0) {
        const nextIdx = e.waypointIndex + 1
        if (nextIdx >= this.currentMap.waypoints.length) {
          reachedCore = true
          break
        }

        const p1 = this.currentMap.waypoints[e.waypointIndex]
        const p2 = this.currentMap.waypoints[nextIdx]
        e.facingAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x)
        const segLen = dist(p1.x, p1.y, p2.x, p2.y)
        const leftOnSeg = segLen - e.segmentDist

        if (remainingMove >= leftOnSeg) {
          remainingMove -= leftOnSeg
          e.waypointIndex = nextIdx
          e.segmentDist = 0
          e.x = p2.x
          e.y = p2.y
          if (e.waypointIndex >= this.currentMap.waypoints.length - 1) {
            reachedCore = true
            break
          }
        } else {
          e.segmentDist += remainingMove
          const ratio = e.segmentDist / segLen
          e.x = p1.x + (p2.x - p1.x) * ratio
          e.y = p1.y + (p2.y - p1.y) * ratio
          remainingMove = 0
        }
      }

      e.totalProgress = e.waypointIndex * 1000 + e.segmentDist

      if (reachedCore) {
        this.state.coreHp = Math.max(0, this.state.coreHp - def.coreDamage)
        this.state.coreFlash = 1
        this.sfx.damageCore()
        const endPt =
          this.currentMap.waypoints[this.currentMap.waypoints.length - 1]
        this.spawnFloatingText(
          endPt.x - 16,
          endPt.y - 28,
          `-${def.coreDamage} HP`,
          "#fb7185",
        )
        this.enemies.splice(i, 1)

        if (this.state.coreHp <= 0) {
          this.state.gameOver = true
          this.emitSnapshot(true)
          return
        }
      }
    }
  }

  private updateCoins(dt: number): void {
    const stats = this.getChampionStats()
    const pickupSq = stats.pickupRadius * stats.pickupRadius

    for (let i = this.coins.length - 1; i >= 0; i--) {
      const c = this.coins[i]
      c.age += dt
      if (c.age >= c.maxAge) {
        this.coins.splice(i, 1)
        continue
      }

      c.x = clamp(c.x + c.vx * dt, 16, CANVAS_WIDTH - 16)
      c.y = clamp(c.y + c.vy * dt, 16, CANVAS_HEIGHT - 16)
      c.vx *= 0.06 ** dt
      c.vy *= 0.06 ** dt
      c.vz = (c.vz || 0) - 420 * dt
      c.z = Math.max(0, (c.z || 0) + c.vz * dt)
      if (c.z === 0 && c.vz < -25) {
        c.vz = -c.vz * 0.42
      }

      const dSq = distSq(c.x, c.y, this.champion.x, this.champion.y)
      if (dSq <= pickupSq) {
        const d = Math.sqrt(dSq)
        if (d < 20) {
          this.state.gold += c.value
          this.state.totalGoldCollected += c.value
          this.sfx.coin()
          this.spawnFloatingText(
            this.champion.x,
            this.champion.y - 22,
            `+${c.value}G`,
            "#facc15",
          )
          this.coins.splice(i, 1)
          this.emitSnapshot(true)
          continue
        }
        const pullSpeed = 360 + (stats.pickupRadius - d) * 3
        c.x += ((this.champion.x - c.x) / d) * pullSpeed * dt
        c.y += ((this.champion.y - c.y) / d) * pullSpeed * dt
        c.z += (18 - c.z) * Math.min(1, 8 * dt)
      }
    }
  }

  private updateEffects(dt: number): void {
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const ef = this.effects[i]
      ef.life -= dt
      if (ef.kind === "particle") {
        ef.x += ef.vx * dt
        ef.y += ef.vy * dt
        ef.z = Math.max(0, (ef.z || 0) + (ef.vz || 0) * dt)
        ef.vz = (ef.vz || 0) - 240 * dt
        ef.vx *= 0.94
        ef.vy *= 0.94
      }
      if (ef.life <= 0) this.effects.splice(i, 1)
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i]
      ft.z = (ft.z !== undefined ? ft.z : 32) + 32 * dt
      ft.life -= dt
      if (ft.life <= 0) this.floatingTexts.splice(i, 1)
    }
  }

  private spawnBurst(x: number, y: number, color: string, count: number): void {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2
      const spd = 30 + Math.random() * 95
      this.effects.push({
        kind: "particle",
        x,
        y,
        z: 10 + Math.random() * 14,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        vz: 40 + Math.random() * 90,
        size: 2 + Math.random() * 2.5,
        color,
        life: 0.25 + Math.random() * 0.25,
        maxLife: 0.5,
      })
    }
  }

  private spawnFloatingText(
    x: number,
    y: number,
    text: string,
    color: string,
  ): void {
    this.floatingTexts.push({
      x,
      y,
      z: 36,
      text,
      color,
      life: 0.95,
      maxLife: 0.95,
    })
  }

  public getSnapshot(): HudSnapshot {
    const cfg = this.state.stageConfig
    const totalInWave = cfg.queue.length
    const spawned = this.state.spawnIndex
    const remaining = totalInWave - spawned + this.enemies.length

    const waveRatio =
      this.state.waveActive && totalInWave > 0
        ? (totalInWave - remaining) / totalInWave
        : 0
    const hpRatio = this.state.coreHp / this.state.maxCoreHp
    const skillProgress =
      1 - this.champion.arrowRainCooldown / this.champion.arrowRainMaxCooldown

    const presetKey = CAMERA_PRESET_ORDER[this.cameraPresetIndex]
    const stats = this.getChampionStats()
    const tier = getBowTier(this.champion.levels.damage)
    const weapon = CHAMPION_WEAPONS[this.champion.weaponId]

    const selectedTowerObj =
      this.selectedSlotId !== null
        ? (this.towers.get(this.selectedSlotId) ?? null)
        : null

    return {
      mode: this.state.mode,
      mapId: this.currentMap.id,
      mapName: this.currentMap.name,
      campaignMapIndex: this.state.campaignMapIndex,
      campaignTotalMaps: MAP_ORDER.length,
      campaignVictory: this.state.campaignVictory,
      stage: this.state.stage,
      remainingText: this.state.waveActive
        ? `남은 적 ${remaining}`
        : this.state.autoWave
          ? `${this.state.waveCountdown.toFixed(1)}s 후 출격`
          : "출격 대기",
      coreHp: this.state.coreHp,
      maxCoreHp: this.state.maxCoreHp,
      gold: this.state.gold,
      totalGoldCollected: this.state.totalGoldCollected,
      kills: this.state.kills,
      waveRatio: clamp(waveRatio, 0, 1),
      hpRatio: clamp(hpRatio, 0, 1),
      skillProgress: clamp(skillProgress, 0, 1),
      arrowRainCooldown: this.champion.arrowRainCooldown,
      waveActive: this.state.waveActive,
      autoWave: this.state.autoWave,
      speedMultiplier: this.state.speedMultiplier,
      cameraPresetLabel: CAMERA_PRESETS[presetKey].label,
      soundEnabled: this.sfx.enabled,
      paused: this.state.paused,
      gameOver: this.state.gameOver,
      championWeaponId: this.champion.weaponId,
      championLevels: { ...this.champion.levels },
      championStats: stats,
      championBowName:
        this.champion.weaponId === "longbow" ? tier.name : weapon.name,
      selectedSlotId: this.selectedSlotId,
      selectedTower: selectedTowerObj
        ? {
            slotId: selectedTowerObj.slotId,
            typeId: selectedTowerObj.typeId,
            level: selectedTowerObj.level,
            priority: selectedTowerObj.priority,
            kills: selectedTowerObj.kills,
            totalInvested: selectedTowerObj.totalInvested,
            speedMult: this.getTowerAuraSpeedBonus(
              this.currentMap.slots[selectedTowerObj.slotId],
            ),
          }
        : null,
    }
  }

  private emitSnapshot(force: boolean, timestamp = performance.now()): void {
    if (force) {
      this.lastHudEmit = timestamp
    } else {
      this.lastHudEmit = timestamp
    }
    const snap = this.getSnapshot()
    this.onCssVars?.({
      waveRatio: snap.waveRatio.toFixed(3),
      hpRatio: snap.hpRatio.toFixed(3),
      skillProgress: snap.skillProgress.toFixed(3),
    })
    this.onSnapshot(snap)
  }
}
