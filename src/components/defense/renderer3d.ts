import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  clamp,
  dist,
  ENEMY_TYPES,
  getBowTier,
  ROAD_WIDTH,
  TOWER_TYPES,
} from "./data"
import type {
  CameraPresetKey,
  Coin,
  Effect,
  EnemyInstance,
  MapDefinition,
  MapId,
  Projectile,
  RenderableGameState,
  TowerInstance,
} from "./types"

export const CAMERA_PRESETS: Record<
  CameraPresetKey,
  { label: string; yaw: number; pitch: number; zoom: number }
> = {
  quarter: { label: "쿼터뷰", yaw: -0.16, pitch: 0.68, zoom: 1.06 },
  high: { label: "하이앵글", yaw: 0.0, pitch: 0.38, zoom: 0.98 },
  dramatic: { label: "드라마틱", yaw: -0.42, pitch: 0.88, zoom: 1.15 },
}

export const CAMERA_PRESET_ORDER: CameraPresetKey[] = [
  "quarter",
  "high",
  "dramatic",
]

type Vec3 = [number, number, number]

interface ProjectedPoint {
  x: number
  y: number
  depth: number
  scale: number
}

interface EnvProp {
  kind: "tree" | "rock" | "crystal"
  x: number
  y: number
  scale: number
}

type DrawItem =
  | {
      kind: "poly"
      depth: number
      pts: ProjectedPoint[]
      fill: string
      stroke: string | null
      lineWidth: number
    }
  | {
      kind: "orb"
      depth: number
      x: number
      y: number
      r: number
      color: string
      rimColor: string
    }
  | {
      kind: "line"
      depth: number
      x1: number
      y1: number
      x2: number
      y2: number
      color: string
      width: number
      alpha: number
    }
  | {
      kind: "ring"
      depth: number
      pts: ProjectedPoint[]
      color: string
      width: number
      alpha: number
    }

function normalize3(x: number, y: number, z: number): Vec3 {
  const len = Math.hypot(x, y, z) || 1
  return [x / len, y / len, z / len]
}

function parseHexColor(hex: string): Vec3 {
  const clean = hex.replace("#", "")
  const num = Number.parseInt(
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean,
    16,
  )
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function shadeHex(hex: string, factor: number, alpha = 1): string {
  const [r, g, b] = parseHexColor(hex)
  const cr = Math.max(0, Math.min(255, Math.round(r * factor)))
  const cg = Math.max(0, Math.min(255, Math.round(g * factor)))
  const cb = Math.max(0, Math.min(255, Math.round(b * factor)))
  return alpha < 1
    ? `rgba(${cr},${cg},${cb},${alpha})`
    : `rgb(${cr},${cg},${cb})`
}

const SUN_DIR = normalize3(-0.42, -0.52, 0.74)

/**
 * 3D Perspective Camera with exact inverse ground-plane projection.
 */
export class Camera3D {
  public targetX = CANVAS_WIDTH / 2
  public targetY = CANVAS_HEIGHT / 2 + 12
  public yaw = CAMERA_PRESETS.quarter.yaw
  public pitch = CAMERA_PRESETS.quarter.pitch
  public zoom = CAMERA_PRESETS.quarter.zoom
  public fov = 1080
  public camDist = 1160
  public presetKey: CameraPresetKey = "quarter"

  private cosY = 1
  private sinY = 0
  private cosP = 1
  private sinP = 0
  public eye: Vec3 = [0, 0, this.camDist]

  constructor() {
    this.updateMatrices()
  }

  setPreset(key: CameraPresetKey): void {
    const p = CAMERA_PRESETS[key]
    if (!p) return
    this.presetKey = key
    this.yaw = p.yaw
    this.pitch = p.pitch
    this.zoom = p.zoom
    this.updateMatrices()
  }

  orbit(deltaYaw: number, deltaPitch: number): void {
    this.yaw = clamp(this.yaw + deltaYaw, -1.05, 1.05)
    this.pitch = clamp(this.pitch + deltaPitch, 0.22, 1.02)
    this.updateMatrices()
  }

  adjustZoom(delta: number): void {
    this.zoom = clamp(this.zoom + delta, 0.75, 1.65)
  }

  updateMatrices(): void {
    this.cosY = Math.cos(this.yaw)
    this.sinY = Math.sin(this.yaw)
    this.cosP = Math.cos(this.pitch)
    this.sinP = Math.sin(this.pitch)

    this.eye = [
      this.targetX + this.camDist * this.sinP * this.sinY,
      this.targetY + this.camDist * this.sinP * this.cosY,
      this.camDist * this.cosP,
    ]
  }

  project(wx: number, wy: number, wz = 0): ProjectedPoint {
    const dx = wx - this.targetX
    const dy = wy - this.targetY
    const dz = wz

    const rx = dx * this.cosY - dy * this.sinY
    const ry = dx * this.sinY + dy * this.cosY
    const vy = ry * this.cosP - dz * this.sinP
    const depth = Math.max(80, this.camDist - ry * this.sinP - dz * this.cosP)
    const scale = (this.fov / depth) * this.zoom

    return {
      x: CANVAS_WIDTH / 2 + rx * scale,
      y: CANVAS_HEIGHT / 2 + vy * scale,
      depth,
      scale,
    }
  }

  screenToGround(sx: number, sy: number): { x: number; y: number } {
    const nx = (sx - CANVAS_WIDTH / 2) / (this.fov * this.zoom)
    const ny = (sy - CANVAS_HEIGHT / 2) / (this.fov * this.zoom)
    const denom = this.cosP + ny * this.sinP
    if (Math.abs(denom) < 0.05) {
      return { x: this.targetX, y: this.targetY }
    }

    const ry = (ny * this.camDist) / denom
    const depth = this.camDist - ry * this.sinP
    const rx = nx * depth

    const dx = rx * this.cosY + ry * this.sinY
    const dy = -rx * this.sinY + ry * this.cosY

    return {
      x: this.targetX + dx,
      y: this.targetY + dy,
    }
  }
}

function buildEnvironmentProps(map: MapDefinition): EnvProp[] {
  const props: EnvProp[] = []
  const candidates: EnvProp[] = [
    { kind: "tree", x: 75, y: 235, scale: 1.05 },
    { kind: "tree", x: 92, y: 420, scale: 1.15 },
    { kind: "rock", x: 130, y: 505, scale: 1.1 },
    { kind: "crystal", x: 65, y: 515, scale: 1.0 },
    { kind: "tree", x: 170, y: 45, scale: 0.95 },
    { kind: "rock", x: 355, y: 65, scale: 1.0 },
    { kind: "tree", x: 420, y: 78, scale: 1.15 },
    { kind: "crystal", x: 315, y: 295, scale: 0.9 },
    { kind: "tree", x: 585, y: 495, scale: 1.1 },
    { kind: "rock", x: 645, y: 525, scale: 1.05 },
    { kind: "tree", x: 855, y: 80, scale: 1.15 },
    { kind: "crystal", x: 840, y: 150, scale: 0.95 },
    { kind: "tree", x: 215, y: 525, scale: 0.95 },
    { kind: "rock", x: 575, y: 295, scale: 0.85 },
    { kind: "tree", x: 48, y: 310, scale: 1.0 },
    { kind: "crystal", x: 460, y: 40, scale: 0.9 },
    { kind: "rock", x: 880, y: 300, scale: 1.0 },
    { kind: "tree", x: 875, y: 535, scale: 1.05 },
  ]

  for (const c of candidates) {
    let ok = true
    for (const slot of map.slots) {
      if (dist(c.x, c.y, slot.x, slot.y) < 52) ok = false
    }
    for (let i = 0; i < map.waypoints.length - 1; i++) {
      const a = map.waypoints[i]
      const b = map.waypoints[i + 1]
      const abx = b.x - a.x
      const aby = b.y - a.y
      const lenSq = abx * abx + aby * aby || 1
      const t = clamp(((c.x - a.x) * abx + (c.y - a.y) * aby) / lenSq, 0, 1)
      const px = a.x + abx * t
      const py = a.y + aby * t
      if (dist(c.x, c.y, px, py) < 46) ok = false
    }
    if (ok) props.push(c)
  }
  return props
}

/**
 * Full 3D scene renderer using buffered Z-sorted faces and primitives.
 */
export class Renderer3D {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public camera: Camera3D
  private envProps: EnvProp[] = []
  private cachedMapId: MapId | null = null
  private drawQueue: DrawItem[] = []

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("2D canvas context is not available")
    }
    this.ctx = ctx
    this.camera = new Camera3D()
  }

  screenToGround(sx: number, sy: number): { x: number; y: number } {
    return this.camera.screenToGround(sx, sy)
  }

  project(x: number, y: number, z = 0): ProjectedPoint {
    return this.camera.project(x, y, z)
  }

  pushFace(
    pts3D: Vec3[],
    hexColor: string,
    strokeColor: string | null = null,
    alpha = 1,
    doubleSided = false,
    depthBias = 0,
  ): void {
    if (pts3D.length < 3) return
    const [p0, p1, p2] = pts3D

    let cx = 0
    let cy = 0
    let cz = 0
    for (const p of pts3D) {
      cx += p[0]
      cy += p[1]
      cz += p[2]
    }
    const invN = 1 / pts3D.length
    cx *= invN
    cy *= invN
    cz *= invN

    const ux = p1[0] - p0[0]
    const uy = p1[1] - p0[1]
    const uz = p1[2] - p0[2]
    const vx = p2[0] - p0[0]
    const vy = p2[1] - p0[1]
    const vz = p2[2] - p0[2]

    const nx = uy * vz - uz * vy
    const ny = uz * vx - ux * vz
    const nz = ux * vy - uy * vx
    const nLen = Math.hypot(nx, ny, nz) || 1
    const nrm: Vec3 = [nx / nLen, ny / nLen, nz / nLen]

    const eye = this.camera.eye
    const viewDot =
      nrm[0] * (eye[0] - cx) + nrm[1] * (eye[1] - cy) + nrm[2] * (eye[2] - cz)
    if (!doubleSided && viewDot <= 0) return

    const sunDot =
      nrm[0] * SUN_DIR[0] + nrm[1] * SUN_DIR[1] + nrm[2] * SUN_DIR[2]
    const effectiveDot = doubleSided ? Math.abs(sunDot) : sunDot
    const shade = 0.56 + 0.44 * Math.max(0, effectiveDot)

    const projected = pts3D.map((p) => this.camera.project(p[0], p[1], p[2]))
    const centerProj = this.camera.project(cx, cy, cz)

    this.drawQueue.push({
      kind: "poly",
      depth: centerProj.depth + depthBias,
      pts: projected,
      fill: shadeHex(hexColor, shade, alpha),
      stroke: strokeColor,
      lineWidth: 1,
    })
  }

  addBox(
    x: number,
    y: number,
    zMin: number,
    zMax: number,
    w: number,
    d: number,
    angle: number,
    color: string,
    stroke: string | null = null,
    alpha = 1,
  ): void {
    const hw = w / 2
    const hd = d / 2
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    const local: [number, number][] = [
      [-hw, -hd],
      [hw, -hd],
      [hw, hd],
      [-hw, hd],
    ]
    const b: Vec3[] = local.map(([lx, ly]) => [
      x + lx * cos - ly * sin,
      y + lx * sin + ly * cos,
      zMin,
    ])
    const t: Vec3[] = local.map(([lx, ly]) => [
      x + lx * cos - ly * sin,
      y + lx * sin + ly * cos,
      zMax,
    ])

    this.pushFace([t[0], t[1], t[2], t[3]], color, stroke, alpha)
    this.pushFace([b[0], b[3], b[2], b[1]], color, stroke, alpha)
    this.pushFace([b[0], t[0], t[3], b[3]], color, stroke, alpha)
    this.pushFace([b[2], t[2], t[1], b[1]], color, stroke, alpha)
    this.pushFace([b[1], t[1], t[0], b[0]], color, stroke, alpha)
    this.pushFace([b[3], t[3], t[2], b[2]], color, stroke, alpha)
  }

  addPrism(
    x: number,
    y: number,
    zMin: number,
    zMax: number,
    rBot: number,
    rTop: number,
    sides: number,
    rot: number,
    color: string,
    stroke: string | null = null,
    alpha = 1,
  ): void {
    const bot: Vec3[] = []
    const top: Vec3[] = []
    for (let i = 0; i < sides; i++) {
      const a = rot + (i * Math.PI * 2) / sides
      const ca = Math.cos(a)
      const sa = Math.sin(a)
      bot.push([x + ca * rBot, y + sa * rBot, zMin])
      top.push([x + ca * rTop, y + sa * rTop, zMax])
    }

    if (rTop > 0.4) {
      this.pushFace(top, color, stroke, alpha)
    }

    for (let i = 0; i < sides; i++) {
      const next = (i + 1) % sides
      if (rTop <= 0.4) {
        this.pushFace([bot[i], bot[next], top[i]], color, stroke, alpha)
      } else {
        this.pushFace(
          [bot[i], bot[next], top[next], top[i]],
          color,
          stroke,
          alpha,
        )
      }
    }
  }

  addOctahedron(
    x: number,
    y: number,
    zCenter: number,
    radius: number,
    halfHeight: number,
    rot: number,
    color: string,
    stroke: string | null = null,
    alpha = 1,
  ): void {
    const top: Vec3 = [x, y, zCenter + halfHeight]
    const bot: Vec3 = [x, y, zCenter - halfHeight]
    const mid: Vec3[] = []
    for (let i = 0; i < 4; i++) {
      const a = rot + (i * Math.PI) / 2
      mid.push([x + Math.cos(a) * radius, y + Math.sin(a) * radius, zCenter])
    }
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4
      this.pushFace([mid[i], mid[next], top], color, stroke, alpha)
      this.pushFace([mid[next], mid[i], bot], color, stroke, alpha)
    }
  }

  addOrb(
    x: number,
    y: number,
    z: number,
    radius: number,
    color: string,
    rimColor = "#ffffff",
    depthBias = 0,
  ): void {
    const p = this.camera.project(x, y, z)
    this.drawQueue.push({
      kind: "orb",
      depth: p.depth + depthBias,
      x: p.x,
      y: p.y,
      r: Math.max(1.5, radius * p.scale),
      color,
      rimColor,
    })
  }

  addLine(
    p1: Vec3,
    p2: Vec3,
    color: string,
    width = 2,
    alpha = 1,
    depthBias = 0,
  ): void {
    const a = this.camera.project(p1[0], p1[1], p1[2])
    const b = this.camera.project(p2[0], p2[1], p2[2])
    this.drawQueue.push({
      kind: "line",
      depth: (a.depth + b.depth) * 0.5 + depthBias,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      color,
      width: Math.max(1, width * ((a.scale + b.scale) * 0.5)),
      alpha,
    })
  }

  addRing(
    x: number,
    y: number,
    z: number,
    radius: number,
    color: string,
    width = 2,
    alpha = 1,
    segments = 24,
    depthBias = 0,
  ): void {
    const pts: ProjectedPoint[] = []
    for (let i = 0; i <= segments; i++) {
      const a = (i * Math.PI * 2) / segments
      pts.push(
        this.camera.project(
          x + Math.cos(a) * radius,
          y + Math.sin(a) * radius,
          z,
        ),
      )
    }
    const center = this.camera.project(x, y, z)
    this.drawQueue.push({
      kind: "ring",
      depth: center.depth + depthBias,
      pts,
      color,
      width: Math.max(1, width * center.scale),
      alpha,
    })
  }

  addGroundShadow(
    x: number,
    y: number,
    rx: number,
    ry = rx * 0.85,
    alpha = 0.34,
  ): void {
    const pts: ProjectedPoint[] = []
    const segs = 12
    for (let i = 0; i < segs; i++) {
      const a = (i * Math.PI * 2) / segs
      pts.push(
        this.camera.project(x + Math.cos(a) * rx, y + Math.sin(a) * ry, 0.4),
      )
    }
    this.drawQueue.push({
      kind: "poly",
      depth: 99990,
      pts,
      fill: `rgba(2, 6, 23, ${alpha})`,
      stroke: null,
      lineWidth: 0,
    })
  }

  render(game: RenderableGameState): void {
    const ctx = this.ctx
    const time = performance.now() * 0.001
    const map = game.currentMap
    if (this.cachedMapId !== map.id) {
      this.cachedMapId = map.id
      this.envProps = buildEnvironmentProps(map)
    }
    this.drawQueue.length = 0

    this.drawSkyBackdrop(ctx)
    this.drawTerrainIsland(ctx, map)
    this.drawStoneRoad(ctx, map)
    this.drawTowerSlots3D(ctx, game)

    for (const prop of this.envProps) {
      this.queueEnvProp(prop, map, time)
    }
    this.queueSpawnPortal(map, time)
    this.queueCoreCitadel(game, time)

    for (const tower of game.towers.values()) {
      this.queueTower3D(tower, map, time)
    }
    for (const c of game.coins) {
      this.queueCoin3D(c, time)
    }
    for (const e of game.enemies) {
      this.queueEnemy3D(e, time)
    }
    this.queueChampion3D(game)
    for (const p of game.projectiles) {
      this.queueProjectile3D(p)
    }
    for (const ev of game.arrowRainEvents) {
      this.addRing(ev.x, ev.y, 2, ev.radius, "#c084fc", 3, 0.7, 28, -5)
    }
    for (const ef of game.effects) {
      this.queueEffect3D(ef)
    }

    this.drawQueue.sort((a, b) => b.depth - a.depth)
    this.flushDrawQueue(ctx)

    this.drawEnemyHealthBars(ctx, game)
    this.drawFloatingTexts3D(ctx, game)
    this.drawBannerOverlay(ctx, game)
  }

  private drawSkyBackdrop(ctx: CanvasRenderingContext2D): void {
    const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
    grad.addColorStop(0, "#070b18")
    grad.addColorStop(0.55, "#0f172a")
    grad.addColorStop(1, "#091124")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  private drawTerrainIsland(
    ctx: CanvasRenderingContext2D,
    map: MapDefinition,
  ): void {
    const x0 = 10
    const y0 = 14
    const x1 = CANVAS_WIDTH - 10
    const y1 = CANVAS_HEIGHT - 14
    const cliffZ = -34

    const topCorners = [
      this.camera.project(x0, y0, 0),
      this.camera.project(x1, y0, 0),
      this.camera.project(x1, y1, 0),
      this.camera.project(x0, y1, 0),
    ]
    const botCorners = [
      this.camera.project(x0, y0, cliffZ),
      this.camera.project(x1, y0, cliffZ),
      this.camera.project(x1, y1, cliffZ),
      this.camera.project(x0, y1, cliffZ),
    ]

    const sides = [
      { idx: [3, 2], col: "#1e293b", nx: 0, ny: 1 },
      { idx: [0, 3], col: "#172033", nx: -1, ny: 0 },
      { idx: [2, 1], col: "#172033", nx: 1, ny: 0 },
      { idx: [1, 0], col: "#0f172a", nx: 0, ny: -1 },
    ]
    const eye = this.camera.eye
    for (const s of sides) {
      const a = s.idx[0]
      const b = s.idx[1]
      const testX = s.nx > 0 ? x1 : s.nx < 0 ? x0 : (x0 + x1) / 2
      const testY = s.ny > 0 ? y1 : s.ny < 0 ? y0 : (y0 + y1) / 2
      if (s.nx * (eye[0] - testX) + s.ny * (eye[1] - testY) <= 0) continue

      ctx.beginPath()
      ctx.moveTo(topCorners[a].x, topCorners[a].y)
      ctx.lineTo(topCorners[b].x, topCorners[b].y)
      ctx.lineTo(botCorners[b].x, botCorners[b].y)
      ctx.lineTo(botCorners[a].x, botCorners[a].y)
      ctx.closePath()
      ctx.fillStyle = s.col
      ctx.fill()
      ctx.strokeStyle = "#334155"
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const turfGrad = ctx.createLinearGradient(
      0,
      topCorners[0].y,
      0,
      topCorners[2].y,
    )
    turfGrad.addColorStop(0, map.theme.turfColors[0])
    turfGrad.addColorStop(0.5, map.theme.turfColors[1])
    turfGrad.addColorStop(1, map.theme.turfColors[2])
    ctx.beginPath()
    ctx.moveTo(topCorners[0].x, topCorners[0].y)
    ctx.lineTo(topCorners[1].x, topCorners[1].y)
    ctx.lineTo(topCorners[2].x, topCorners[2].y)
    ctx.lineTo(topCorners[3].x, topCorners[3].y)
    ctx.closePath()
    ctx.fillStyle = turfGrad
    ctx.fill()
    ctx.strokeStyle = map.theme.borderColor
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.strokeStyle = "rgba(148, 163, 184, 0.06)"
    ctx.lineWidth = 1
    for (let x = 60; x < CANVAS_WIDTH - 20; x += 60) {
      const pA = this.camera.project(x, y0, 0)
      const pB = this.camera.project(x, y1, 0)
      ctx.beginPath()
      ctx.moveTo(pA.x, pA.y)
      ctx.lineTo(pB.x, pB.y)
      ctx.stroke()
    }
    for (let y = 60; y < CANVAS_HEIGHT - 20; y += 60) {
      const pA = this.camera.project(x0, y, 0)
      const pB = this.camera.project(x1, y, 0)
      ctx.beginPath()
      ctx.moveTo(pA.x, pA.y)
      ctx.lineTo(pB.x, pB.y)
      ctx.stroke()
    }
  }

  private drawStoneRoad(
    ctx: CanvasRenderingContext2D,
    map: MapDefinition,
  ): void {
    const roadHalf = ROAD_WIDTH / 2
    for (let i = 0; i < map.waypoints.length - 1; i++) {
      const a = map.waypoints[i]
      const b = map.waypoints[i + 1]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const len = Math.hypot(dx, dy) || 1
      const ux = dx / len
      const uy = dy / len
      const px = -uy
      const py = ux

      const ax = a.x - ux * roadHalf
      const ay = a.y - uy * roadHalf
      const bx = b.x + ux * roadHalf
      const by = b.y + uy * roadHalf

      const curbW = roadHalf + 5
      const cPts = [
        this.camera.project(ax + px * curbW, ay + py * curbW, 0.2),
        this.camera.project(bx + px * curbW, by + py * curbW, 0.2),
        this.camera.project(bx - px * curbW, by - py * curbW, 0.2),
        this.camera.project(ax - px * curbW, ay - py * curbW, 0.2),
      ]
      ctx.beginPath()
      for (let idx = 0; idx < cPts.length; idx++) {
        const p = cPts[idx]
        if (idx === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.closePath()
      ctx.fillStyle = map.theme.curbColor
      ctx.fill()

      const rPts = [
        this.camera.project(ax + px * roadHalf, ay + py * roadHalf, 0.5),
        this.camera.project(bx + px * roadHalf, by + py * roadHalf, 0.5),
        this.camera.project(bx - px * roadHalf, by - py * roadHalf, 0.5),
        this.camera.project(ax - px * roadHalf, ay - py * roadHalf, 0.5),
      ]
      ctx.beginPath()
      for (let idx = 0; idx < rPts.length; idx++) {
        const p = rPts[idx]
        if (idx === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      }
      ctx.closePath()
      ctx.fillStyle = map.theme.roadColor
      ctx.fill()

      const mA = this.camera.project(a.x, a.y, 0.8)
      const mB = this.camera.project(b.x, b.y, 0.8)
      ctx.save()
      ctx.strokeStyle = "rgba(203, 213, 225, 0.22)"
      ctx.lineWidth = 2
      ctx.setLineDash([8, 10])
      ctx.beginPath()
      ctx.moveTo(mA.x, mA.y)
      ctx.lineTo(mB.x, mB.y)
      ctx.stroke()
      ctx.restore()
    }
  }

  private drawTowerSlots3D(
    ctx: CanvasRenderingContext2D,
    game: RenderableGameState,
  ): void {
    for (const slot of game.currentMap.slots) {
      const isSelected = game.selectedSlotId === slot.id
      const isHovered = game.hoveredSlotId === slot.id
      const tower = game.towers.get(slot.id)

      if (isSelected && tower) {
        const spec = TOWER_TYPES[tower.typeId].levels[tower.level - 1]
        const pts: ProjectedPoint[] = []
        for (let i = 0; i <= 36; i++) {
          const a = (i * Math.PI * 2) / 36
          pts.push(
            this.camera.project(
              slot.x + Math.cos(a) * spec.range,
              slot.y + Math.sin(a) * spec.range,
              1,
            ),
          )
        }
        ctx.beginPath()
        for (let idx = 0; idx < pts.length; idx++) {
          const p = pts[idx]
          if (idx === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.fillStyle = "rgba(56, 189, 248, 0.1)"
        ctx.fill()
        ctx.strokeStyle = "rgba(56, 189, 248, 0.6)"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      if (tower && tower.typeId === "sunburst") {
        const spec = TOWER_TYPES.sunburst.levels[tower.level - 1]
        const auraRange = spec.auraRange ?? 150
        const pts: ProjectedPoint[] = []
        for (let i = 0; i <= 32; i++) {
          const a = (i * Math.PI * 2) / 32
          pts.push(
            this.camera.project(
              slot.x + Math.cos(a) * auraRange,
              slot.y + Math.sin(a) * auraRange,
              1,
            ),
          )
        }
        ctx.save()
        ctx.beginPath()
        for (let idx = 0; idx < pts.length; idx++) {
          const p = pts[idx]
          if (idx === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.fillStyle = "rgba(250, 204, 21, 0.06)"
        ctx.fill()
        ctx.setLineDash([6, 6])
        ctx.strokeStyle = "rgba(250, 204, 21, 0.35)"
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }

      const padColor = isSelected
        ? "#fde047"
        : isHovered
          ? "#38bdf8"
          : "#334155"
      this.addPrism(
        slot.x,
        slot.y,
        0,
        5,
        25,
        22,
        8,
        Math.PI / 8,
        "#1e293b",
        padColor,
      )

      if (!tower) {
        const center = this.camera.project(slot.x, slot.y, 6)
        ctx.save()
        ctx.fillStyle = isSelected
          ? "#fde047"
          : isHovered
            ? "#7dd3fc"
            : "rgba(148, 163, 184, 0.7)"
        ctx.font = `bold ${Math.round(11 * center.scale)}px sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`+${slot.id + 1}`, center.x, center.y)
        ctx.restore()
      }
    }
  }

  private queueEnvProp(prop: EnvProp, map: MapDefinition, time: number): void {
    const s = prop.scale
    const style = map.theme.propStyle
    const treeColors =
      style === "frost"
        ? { c1: "#bae6fd", c2: "#38bdf8", c3: "#e0f2fe", c4: "#0284c7" }
        : style === "canyon"
          ? { c1: "#d97706", c2: "#78350f", c3: "#f59e0b", c4: "#92400e" }
          : style === "lava"
            ? { c1: "#991b1b", c2: "#450a0a", c3: "#ef4444", c4: "#7f1d1d" }
            : { c1: "#15803d", c2: "#052e16", c3: "#22c55e", c4: "#14532d" }
    const crystalColors =
      style === "frost"
        ? { main: "#7dd3fc", edge: "#f0f9ff" }
        : style === "canyon"
          ? { main: "#fb923c", edge: "#ffedd5" }
          : style === "lava"
            ? { main: "#f43f5e", edge: "#ffe4e6" }
            : { main: "#38bdf8", edge: "#bae6fd" }

    if (prop.kind === "tree") {
      this.addGroundShadow(prop.x, prop.y, 16 * s)
      this.addPrism(
        prop.x,
        prop.y,
        0,
        14 * s,
        4.5 * s,
        3.5 * s,
        6,
        0,
        "#78350f",
        "#451a03",
      )
      this.addPrism(
        prop.x,
        prop.y,
        11 * s,
        30 * s,
        15 * s,
        2 * s,
        6,
        0.2,
        treeColors.c1,
        treeColors.c2,
      )
      this.addPrism(
        prop.x,
        prop.y,
        24 * s,
        44 * s,
        11 * s,
        0,
        6,
        0.6,
        treeColors.c3,
        treeColors.c4,
      )
    } else if (prop.kind === "rock") {
      const rockTop =
        style === "canyon"
          ? "#9a3412"
          : style === "lava"
            ? "#44403c"
            : "#64748b"
      const rockSide =
        style === "canyon"
          ? "#7c2d12"
          : style === "lava"
            ? "#1c1917"
            : "#334155"
      this.addGroundShadow(prop.x, prop.y, 14 * s)
      this.addPrism(
        prop.x,
        prop.y,
        0,
        13 * s,
        13 * s,
        7 * s,
        5,
        0.4,
        rockTop,
        rockSide,
      )
      this.addPrism(
        prop.x + 7 * s,
        prop.y + 4 * s,
        0,
        8 * s,
        7 * s,
        4 * s,
        5,
        1.1,
        rockSide,
        "#1e293b",
      )
    } else if (prop.kind === "crystal") {
      this.addGroundShadow(prop.x, prop.y, 12 * s)
      this.addPrism(
        prop.x,
        prop.y,
        0,
        6 * s,
        11 * s,
        8 * s,
        6,
        0,
        "#334155",
        "#1e293b",
      )
      this.addOctahedron(
        prop.x,
        prop.y,
        19 * s + Math.sin(time * 2 + prop.x) * 2,
        7 * s,
        13 * s,
        time * 0.8,
        crystalColors.main,
        crystalColors.edge,
        0.88,
      )
    }
  }

  private queueSpawnPortal(map: MapDefinition, time: number): void {
    const start = map.waypoints[0]
    this.addGroundShadow(start.x, start.y, 28)
    this.addPrism(
      start.x - 18,
      start.y - 14,
      0,
      38,
      7,
      3,
      4,
      Math.PI / 4,
      "#4c1d95",
      "#a855f7",
    )
    this.addPrism(
      start.x + 18,
      start.y + 14,
      0,
      38,
      7,
      3,
      4,
      Math.PI / 4,
      "#4c1d95",
      "#a855f7",
    )
    this.addOctahedron(
      start.x,
      start.y,
      26 + Math.sin(time * 3) * 3,
      10,
      16,
      time * 2.1,
      "#c084fc",
      "#f3e8ff",
      0.92,
    )
    this.addRing(start.x, start.y, 22, 20, "#a855f7", 2.5, 0.7)
  }

  private queueCoreCitadel(game: RenderableGameState, time: number): void {
    const end = game.currentMap.waypoints[game.currentMap.waypoints.length - 1]
    const hit = game.state.coreFlash > 0
    this.addGroundShadow(end.x, end.y, 34)

    this.addBox(end.x, end.y, 0, 22, 36, 36, 0, "#1e3a5f", "#60a5fa")
    const offsets: [number, number][] = [
      [-16, -16],
      [16, -16],
      [16, 16],
      [-16, 16],
    ]
    for (const [ox, oy] of offsets) {
      this.addBox(
        end.x + ox,
        end.y + oy,
        0,
        32,
        10,
        10,
        0,
        "#334155",
        "#93c5fd",
      )
      this.addPrism(
        end.x + ox,
        end.y + oy,
        32,
        40,
        6,
        0,
        4,
        Math.PI / 4,
        "#0284c7",
        "#bae6fd",
      )
    }

    const crystalColor = hit ? "#fb7185" : "#38bdf8"
    const crystalEdge = hit ? "#fecdd3" : "#e0f2fe"
    this.addOctahedron(
      end.x,
      end.y,
      44 + Math.sin(time * 2.5) * 3.5,
      13,
      21,
      time * 1.3,
      crystalColor,
      crystalEdge,
      0.95,
    )
    this.addRing(end.x, end.y, 38, 22, crystalColor, 2, 0.65)
  }

  private queueTower3D(
    tower: TowerInstance,
    map: MapDefinition,
    time: number,
  ): void {
    const slot = map.slots[tower.slotId]
    if (!slot) return
    const def = TOWER_TYPES[tower.typeId]
    const lv = tower.level
    const x = slot.x
    const y = slot.y
    const tierTrim = lv >= 4 ? "#facc15" : lv >= 2 ? def.accent : "#94a3b8"

    this.addGroundShadow(x, y, 22)

    if (lv >= 4) {
      this.addRing(x, y, 7, 23, def.color, 2, 0.65)
    }

    if (tower.typeId === "crossbow") {
      this.addPrism(
        x,
        y,
        5,
        22 + lv * 2,
        17,
        13,
        8,
        Math.PI / 8,
        "#334155",
        tierTrim,
      )
      this.addPrism(
        x,
        y,
        22 + lv * 2,
        26 + lv * 2,
        16,
        16,
        8,
        Math.PI / 8,
        "#78350f",
        "#d97706",
      )

      const topZ = 28 + lv * 2
      const recoil = tower.recoil * 4
      const cos = Math.cos(tower.angle)
      const sin = Math.sin(tower.angle)

      this.addBox(
        x - cos * recoil,
        y - sin * recoil,
        topZ,
        topZ + 6,
        20,
        7,
        tower.angle,
        "#92400e",
        "#fde68a",
      )
      this.addBox(
        x + cos * (6 - recoil),
        y + sin * (6 - recoil),
        topZ + 2,
        topZ + 6,
        5,
        24 + lv * 2,
        tower.angle,
        def.color,
        tierTrim,
      )
      if (lv >= 3) {
        this.addBox(
          x + cos * (2 - recoil),
          y + sin * (2 - recoil),
          topZ + 5,
          topZ + 8,
          4,
          18,
          tower.angle,
          "#facc15",
          "#fef08a",
        )
      }
      this.addLine(
        [x - cos * 6, y - sin * 6, topZ + 6],
        [x + cos * (18 - recoil), y + sin * (18 - recoil), topZ + 6],
        "#e0f2fe",
        2.5,
      )
    } else if (tower.typeId === "cannon") {
      this.addPrism(x, y, 5, 20 + lv * 2, 19, 16, 6, 0, "#44403c", tierTrim)
      this.addPrism(
        x,
        y,
        20 + lv * 2,
        26 + lv * 2,
        15,
        13,
        8,
        0,
        "#7c2d12",
        "#fb923c",
      )

      const pivotZ = 27 + lv * 2
      const recoil = tower.recoil * 5
      const cos = Math.cos(tower.angle)
      const sin = Math.sin(tower.angle)

      const barrelLen = 20 + lv * 1.5
      for (let seg = 0; seg < 3; seg++) {
        const distAlong = 3 - recoil + seg * (barrelLen / 3)
        const zSeg = pivotZ + seg * 3.5
        this.addBox(
          x + cos * distAlong,
          y + sin * distAlong,
          zSeg,
          zSeg + 8 + (lv >= 5 ? 2 : 0),
          9,
          9 + (lv >= 5 ? 2 : 0),
          tower.angle,
          seg === 2 && lv >= 3 ? "#ea580c" : "#1e293b",
          lv >= 3 ? "#fdba74" : "#94a3b8",
        )
      }
    } else if (tower.typeId === "frost") {
      this.addPrism(x, y, 5, 18, 17, 13, 6, 0, "#cbd5e1", "#67e8f9")
      this.addPrism(
        x,
        y,
        18,
        32 + lv * 2,
        12,
        6,
        6,
        Math.PI / 6,
        "#e2e8f0",
        "#a5f3fc",
      )

      const hoverZ = 42 + lv * 2 + Math.sin(time * 3 + slot.id) * 3
      this.addOctahedron(
        x,
        y,
        hoverZ,
        9 + lv * 0.8,
        14 + lv,
        time * 1.6,
        "#22d3ee",
        "#ecfeff",
        0.9,
      )

      const shardCount = Math.min(4, lv)
      for (let i = 0; i < shardCount; i++) {
        const ang = time * 2.4 + (i * Math.PI * 2) / shardCount
        const sx = x + Math.cos(ang) * 18
        const sy = y + Math.sin(ang) * 18
        this.addOctahedron(
          sx,
          sy,
          hoverZ - 4,
          3.5,
          6,
          -time * 2,
          "#a5f3fc",
          "#ffffff",
          0.85,
        )
      }
    } else if (tower.typeId === "tesla") {
      this.addPrism(x, y, 5, 18, 17, 12, 4, Math.PI / 4, "#1e1b4b", tierTrim)
      this.addPrism(x, y, 18, 40 + lv * 3, 8, 4, 8, 0, "#312e81", "#c084fc")

      const coilRings = 2 + Math.floor(lv / 2)
      for (let r = 0; r < coilRings; r++) {
        const rz = 23 + r * 6
        this.addRing(
          x,
          y,
          rz,
          12 - r * 1.2,
          r % 2 === 0 ? "#f59e0b" : "#c084fc",
          3,
          0.9,
          16,
        )
      }
      const orbZ = 44 + lv * 3
      this.addOrb(x, y, orbZ, 7.5 + lv * 0.6, "#c084fc", "#faf5ff")
    } else if (tower.typeId === "sunburst") {
      this.addPrism(x, y, 5, 16, 20, 14, 4, Math.PI / 4, "#92400e", "#facc15")
      this.addPrism(x, y, 16, 28, 13, 8, 4, Math.PI / 4, "#b45309", "#fde047")

      const corners: [number, number][] = [
        [-13, -13],
        [13, -13],
        [13, 13],
        [-13, 13],
      ]
      for (const [cx, cy] of corners) {
        this.addPrism(
          x + cx,
          y + cy,
          5,
          25 + lv * 2,
          3.5,
          1.5,
          4,
          0,
          "#d97706",
          "#fef08a",
        )
      }

      const sunZ = 44 + lv * 2 + Math.sin(time * 2.5) * 2.5
      this.addOctahedron(
        x,
        y,
        sunZ,
        10 + lv,
        12 + lv,
        time * 1.8,
        "#facc15",
        "#fefce8",
        0.96,
      )
      this.addRing(x, y, sunZ, 17 + lv, "#fde047", 2.5, 0.85, 20)

      if (tower.beamTimer > 0 && tower.beamTarget) {
        this.addLine(
          [x, y, sunZ],
          [tower.beamTarget.x, tower.beamTarget.y, 16],
          "#facc15",
          5 + lv,
          0.9,
        )
        this.addLine(
          [x, y, sunZ],
          [tower.beamTarget.x, tower.beamTarget.y, 16],
          "#fefce8",
          2,
          1,
        )
      }
    } else if (tower.typeId === "poison") {
      this.addPrism(x, y, 5, 19, 15, 13, 6, 0, "#14532d", "#22c55e")
      this.addPrism(x, y, 19, 32, 12, 9, 6, time * 0.7, "#166534", "#86efac")
      const orbZ = 38 + lv * 2 + Math.sin(time * 3) * 2
      this.addOrb(x, y, orbZ, 7 + lv * 0.6, "#22c55e", "#dcfce7")
      this.addRing(x, y, orbZ - 2, 13 + lv, "#4ade80", 2, 0.75, 16)
    } else if (tower.typeId === "ballista") {
      this.addBox(x, y, 5, 17, 26, 26, 0, "#4c0519", "#f43f5e")
      const dirX = Math.cos(tower.angle)
      const dirY = Math.sin(tower.angle)
      const px = -dirY
      const py = dirX
      const recoil = tower.recoil * 5
      const bx = x - dirX * recoil
      const by = y - dirY * recoil
      this.addLine(
        [bx - dirX * 14, by - dirY * 14, 24],
        [bx + dirX * 22, by + dirY * 22, 24],
        "#e2e8f0",
        4.5,
      )
      this.addLine(
        [bx + dirX * 10 + px * 17, by + dirY * 10 + py * 17, 24],
        [bx + dirX * 10 - px * 17, by + dirY * 10 - py * 17, 24],
        "#fb7185",
        4,
      )
      this.addLine(
        [bx + dirX * 10 + px * 17, by + dirY * 10 + py * 17, 24],
        [bx - dirX * 10, by - dirY * 10, 24],
        "#fecdd3",
        1.8,
      )
      this.addLine(
        [bx + dirX * 10 - px * 17, by + dirY * 10 - py * 17, 24],
        [bx - dirX * 10, by - dirY * 10, 24],
        "#fecdd3",
        1.8,
      )
    }
  }

  private queueChampion3D(game: RenderableGameState): void {
    const c = game.champion
    const stats = game.getChampionStats()
    const tier = getBowTier(c.levels.damage)
    const angle = c.facingAngle
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const px = -sin
    const py = cos
    const stride = Math.sin(c.walkPhase || 0) * 5

    this.addRing(c.x, c.y, 1, stats.pickupRadius, "#facc15", 1.2, 0.28, 36)
    this.addRing(c.x, c.y, 1, stats.range, "#38bdf8", 1.2, 0.16, 44)
    this.addGroundShadow(c.x, c.y, 16)

    this.addBox(
      c.x + px * 5 + cos * stride,
      c.y + py * 5 + sin * stride,
      0,
      11,
      5,
      5,
      angle,
      "#1e293b",
      "#475569",
    )
    this.addBox(
      c.x - px * 5 - cos * stride,
      c.y - py * 5 - sin * stride,
      0,
      11,
      5,
      5,
      angle,
      "#1e293b",
      "#475569",
    )

    this.addBox(
      c.x - cos * 8,
      c.y - sin * 8,
      6,
      24,
      7,
      13,
      angle,
      "#0369a1",
      "#7dd3fc",
    )
    this.addBox(c.x, c.y, 11, 26, 12, 14, angle, "#0284c7", "#e0f2fe")
    this.addPrism(
      c.x - cos * 9 + px * 3,
      c.y - sin * 9 + py * 3,
      16,
      29,
      3.5,
      4,
      5,
      angle,
      "#78350f",
      "#fde68a",
    )

    this.addBox(
      c.x + cos * 1,
      c.y + sin * 1,
      26,
      36,
      10,
      10,
      angle,
      "#fed7aa",
      "#fdba74",
    )
    this.addPrism(
      c.x - cos * 1,
      c.y - sin * 1,
      31,
      41,
      8,
      2,
      6,
      angle,
      "#0369a1",
      tier.bowColor,
    )

    if (c.levels.damage >= 4) {
      this.addRing(c.x, c.y, 43, 8, tier.bowColor, 2, 0.9, 14)
    }

    const pull = c.recoil * 3.5
    const bowX = c.x + cos * (13 - pull)
    const bowY = c.y + sin * (13 - pull)
    this.addBox(
      bowX,
      bowY,
      18,
      23,
      4,
      18,
      angle,
      tier.bowColor,
      tier.arrowColor,
    )
    this.addLine(
      [bowX + px * 9, bowY + py * 9, 22],
      [bowX + px * 11 - cos * 4, bowY + py * 11 - sin * 4, 30],
      tier.bowColor,
      3,
    )
    this.addLine(
      [bowX - px * 9, bowY - py * 9, 22],
      [bowX - px * 11 - cos * 4, bowY - py * 11 - sin * 4, 12],
      tier.bowColor,
      3,
    )
    this.addLine(
      [bowX + px * 11 - cos * 4, bowY + py * 11 - sin * 4, 30],
      [bowX - cos * (2 + pull), bowY - sin * (2 + pull), 21],
      "#f8fafc",
      1.3,
    )
    this.addLine(
      [bowX - px * 11 - cos * 4, bowY - py * 11 - sin * 4, 12],
      [bowX - cos * (2 + pull), bowY - sin * (2 + pull), 21],
      "#f8fafc",
      1.3,
    )
  }

  private queueEnemy3D(e: EnemyInstance, time: number): void {
    const def = ENEMY_TYPES[e.typeId]
    const x = e.x
    const y = e.y
    const angle = e.facingAngle || 0
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const px = -sin
    const py = cos
    const stride = Math.sin((e.walkPhase || 0) * 1.4)

    const flash = e.hitFlash > 0
    const chilled = e.slowTimer > 0
    const tint = (base: string) =>
      flash ? "#ffffff" : chilled ? "#67e8f9" : base

    this.addGroundShadow(x, y, e.radius * 1.15)

    if (e.burnTimer > 0) {
      this.addRing(x, y, 4, e.radius + 4, "#fb923c", 2, 0.85, 16)
    }

    if (e.typeId === "goblin") {
      this.addBox(
        x + px * 3 + cos * stride * 3,
        y + py * 3 + sin * stride * 3,
        0,
        8,
        4,
        4,
        angle,
        "#166534",
      )
      this.addBox(
        x - px * 3 - cos * stride * 3,
        y - py * 3 - sin * stride * 3,
        0,
        8,
        4,
        4,
        angle,
        "#166534",
      )
      this.addBox(x, y, 8, 19, 9, 10, angle, tint("#4ade80"), "#14532d")
      this.addBox(x, y, 19, 27, 8, 8, angle, tint("#86efac"), "#166534")
      this.addBox(x + px * 6, y + py * 6, 22, 26, 3, 6, angle, tint("#4ade80"))
      this.addBox(x - px * 6, y - py * 6, 22, 26, 3, 6, angle, tint("#4ade80"))
      this.addLine(
        [x + cos * 6 + px * 6, y + sin * 6 + py * 6, 14],
        [x + cos * 14 + px * 6, y + sin * 14 + py * 6, 17],
        "#e2e8f0",
        2.5,
      )
    } else if (e.typeId === "wolf") {
      const gallop = stride * 4
      this.addBox(
        x + cos * (6 + gallop) + px * 4,
        y + sin * (6 + gallop) + py * 4,
        0,
        8,
        4,
        3,
        angle,
        "#475569",
      )
      this.addBox(
        x + cos * (6 - gallop) - px * 4,
        y + sin * (6 - gallop) - py * 4,
        0,
        8,
        4,
        3,
        angle,
        "#475569",
      )
      this.addBox(
        x - cos * (6 - gallop) + px * 4,
        y - sin * (6 - gallop) + py * 4,
        0,
        8,
        4,
        3,
        angle,
        "#334155",
      )
      this.addBox(
        x - cos * (6 + gallop) - px * 4,
        y - sin * (6 + gallop) - py * 4,
        0,
        8,
        4,
        3,
        angle,
        "#334155",
      )
      this.addBox(x, y, 7, 16, 19, 9, angle, tint("#94a3b8"), "#334155")
      this.addBox(
        x + cos * 11,
        y + sin * 11,
        12,
        20,
        8,
        7,
        angle,
        tint("#cbd5e1"),
        "#475569",
      )
      this.addBox(
        x - cos * 1,
        y - sin * 1,
        16,
        27,
        8,
        9,
        angle,
        tint("#ef4444"),
        "#7f1d1d",
      )
      this.addBox(
        x - cos * 1,
        y - sin * 1,
        27,
        34,
        7,
        7,
        angle,
        tint("#fca5a5"),
        "#991b1b",
      )
      this.addLine(
        [x - cos * 4 + px * 6, y - sin * 4 + py * 6, 20],
        [x + cos * 18 + px * 6, y + sin * 18 + py * 6, 24],
        "#e2e8f0",
        2.2,
      )
    } else if (e.typeId === "orc") {
      this.addBox(
        x + px * 5 + cos * stride * 3,
        y + py * 5 + sin * stride * 3,
        0,
        11,
        6,
        6,
        angle,
        "#334155",
      )
      this.addBox(
        x - px * 5 - cos * stride * 3,
        y - py * 5 - sin * stride * 3,
        0,
        11,
        6,
        6,
        angle,
        "#334155",
      )
      this.addBox(x, y, 11, 28, 15, 18, angle, tint("#64748b"), "#cbd5e1")
      this.addBox(
        x + px * 10,
        y + py * 10,
        21,
        30,
        8,
        7,
        angle,
        tint("#94a3b8"),
        "#e2e8f0",
      )
      this.addBox(
        x - px * 10,
        y - py * 10,
        21,
        30,
        8,
        7,
        angle,
        tint("#94a3b8"),
        "#e2e8f0",
      )
      this.addBox(x, y, 28, 37, 10, 10, angle, tint("#475569"), "#cbd5e1")
      this.addPrism(x + px * 6, y + py * 6, 33, 41, 2.5, 0, 4, 0, "#e2e8f0")
      this.addPrism(x - px * 6, y - py * 6, 33, 41, 2.5, 0, 4, 0, "#e2e8f0")
      this.addBox(
        x + cos * 6 + px * 11,
        y + sin * 6 + py * 11,
        9,
        28,
        4,
        12,
        angle,
        "#475569",
        "#f8fafc",
      )
    } else if (e.typeId === "shaman") {
      this.addRing(x, y, 2, def.healRadius ?? 95, "#a855f7", 1.4, 0.25, 28)
      this.addPrism(x, y, 0, 23, 12, 7, 6, angle, tint("#6b21a8"), "#d8b4fe")
      this.addPrism(x, y, 22, 34, 8, 3, 6, angle, tint("#7e22ce"), "#e9d5ff")
      const bob = Math.sin(time * 4 + x) * 2.5
      const sx = x + px * 11 + cos * 4
      const sy = y + py * 11 + sin * 4
      this.addLine([sx, sy, 4 + bob], [sx, sy, 31 + bob], "#78350f", 2.5)
      this.addOrb(sx, sy, 33 + bob, 4.5, "#c084fc", "#faf5ff")
    } else if (e.typeId === "slime" || e.typeId === "miniSlime") {
      const isMini = e.typeId === "miniSlime"
      const jumpPhase = Math.abs(Math.sin(time * 5 + (e.x + e.y) * 0.05))
      const baseZ = jumpPhase * (isMini ? 7 : 10)
      const squash = 1 - jumpPhase * 0.18
      const w = (isMini ? 13 : 22) * squash
      const h = (isMini ? 11 : 19) * (1.15 - jumpPhase * 0.1)

      this.addBox(
        x,
        y,
        baseZ,
        baseZ + h,
        w,
        w,
        angle * 0.3,
        tint(def.color),
        "#99f6e4",
        0.72,
      )
      this.addOrb(
        x,
        y,
        baseZ + h * 0.45,
        isMini ? 3.5 : 6,
        "#0f766e",
        "#5eead4",
      )
    } else if (e.typeId === "golem") {
      const stomp = stride * 4
      this.addBox(
        x + px * 8 + cos * stomp,
        y + py * 8 + sin * stomp,
        0,
        18,
        10,
        9,
        angle,
        "#44403c",
        "#78350f",
      )
      this.addBox(
        x - px * 8 - cos * stomp,
        y - py * 8 - sin * stomp,
        0,
        18,
        10,
        9,
        angle,
        "#44403c",
        "#78350f",
      )
      this.addBox(x, y, 16, 44, 24, 28, angle, tint("#57534e"), "#f59e0b")
      this.addOrb(x + cos * 12, y + sin * 12, 30, 7, "#f97316", "#fef08a")
      this.addBox(
        x + px * 18 + cos * (-stomp + 4),
        y + py * 18 + sin * (-stomp + 4),
        12,
        30,
        12,
        10,
        angle,
        "#78716c",
        "#f59e0b",
      )
      this.addBox(
        x - px * 18 + cos * (stomp + 4),
        y - py * 18 + sin * (stomp + 4),
        12,
        30,
        12,
        10,
        angle,
        "#78716c",
        "#f59e0b",
      )
      this.addBox(
        x + cos * 3,
        y + sin * 3,
        44,
        57,
        14,
        15,
        angle,
        tint("#44403c"),
        "#fbbf24",
      )
      this.addPrism(
        x + px * 7,
        y + py * 7,
        55,
        68,
        4,
        0,
        4,
        0,
        "#f59e0b",
        "#fef08a",
      )
      this.addPrism(
        x - px * 7,
        y - py * 7,
        55,
        68,
        4,
        0,
        4,
        0,
        "#f59e0b",
        "#fef08a",
      )
    }
  }

  private queueCoin3D(c: Coin, time: number): void {
    if (c.age > c.maxAge - 5 && Math.floor(c.age * 8) % 2 === 0) return
    const z = (c.z || 0) + 6 + Math.sin(time * 6 + c.bobOffset) * 2.5
    this.addGroundShadow(c.x, c.y, 6, 5, 0.25)
    const spin = time * 4 + c.bobOffset
    this.addOctahedron(
      c.x,
      c.y,
      z,
      c.value >= 15 ? 6.5 : 5,
      c.value >= 15 ? 7.5 : 5.5,
      spin,
      "#facc15",
      "#fef9c3",
    )
  }

  private queueProjectile3D(p: Projectile): void {
    if (p.kind === "arrow" || p.kind === "bolt") {
      const z = 20
      const dx = Math.cos(p.angle)
      const dy = Math.sin(p.angle)
      this.addLine(
        [p.x - dx * 16, p.y - dy * 16, z],
        [p.x + dx * 6, p.y + dy * 6, z],
        p.color,
        p.isCrit ? 3.2 : 2.2,
      )
    } else if (p.kind === "spear") {
      const z = 24
      const dx = Math.cos(p.angle)
      const dy = Math.sin(p.angle)
      this.addLine(
        [p.x - dx * 24, p.y - dy * 24, z],
        [p.x + dx * 10, p.y + dy * 10, z],
        "#fecdd3",
        p.isCrit ? 4.5 : 3.5,
      )
    } else if (p.kind === "chakram") {
      const spin = performance.now() * 0.02
      this.addRing(p.x, p.y, 20, 6.5, p.color, 2.5, 0.95, 8, spin)
    } else if (p.kind === "shell" || p.kind === "poison") {
      const t = clamp(p.progress || 0, 0, 1)
      const z = 26 * (1 - t) + 4 * 90 * t * (1 - t)
      this.addGroundShadow(p.x, p.y, 7, 6, 0.28)
      if (p.kind === "poison") {
        this.addOrb(p.x, p.y, z, 6.2, "#22c55e", "#bbf7d0")
      } else {
        this.addOrb(p.x, p.y, z, 6.5, "#f97316", "#fef08a")
      }
    } else if (p.kind === "frost") {
      this.addOctahedron(p.x, p.y, 24, 5, 8, p.angle, "#67e8f9", "#ecfeff")
    }
  }

  private queueEffect3D(ef: Effect): void {
    const alpha = clamp(ef.life / ef.maxLife, 0, 1)
    if (ef.kind === "particle") {
      this.addOrb(
        ef.x,
        ef.y,
        ef.z !== undefined ? ef.z : 14,
        ef.size,
        ef.color,
        ef.color,
      )
    } else if (ef.kind === "explosion") {
      const r = ef.radius * (1 - alpha * 0.35)
      this.addRing(ef.x, ef.y, 4, r, "#fb923c", 3.5, alpha, 24)
      this.addOrb(ef.x, ef.y, 12, r * 0.35 * alpha, "#f97316", "#fef08a")
    } else if (ef.kind === "lightning") {
      for (let i = 0; i < ef.points.length - 1; i++) {
        const a = ef.points[i]
        const b = ef.points[i + 1]
        const az = i === 0 ? 44 : 18
        const bz = 18
        const mx = (a.x + b.x) / 2 + (Math.random() * 14 - 7)
        const my = (a.y + b.y) / 2 + (Math.random() * 14 - 7)
        const mz = (az + bz) / 2 + 12
        this.addLine([a.x, a.y, az], [mx, my, mz], "#e9d5ff", 3, alpha)
        this.addLine([mx, my, mz], [b.x, b.y, bz], "#c084fc", 3, alpha)
      }
    } else if (ef.kind === "skyArrow") {
      const topZ = 140 * alpha
      this.addLine(
        [ef.x - 16, ef.y - 12, topZ],
        [ef.x, ef.y, 2],
        "#e9d5ff",
        2.8,
        alpha,
      )
      this.addRing(ef.x, ef.y, 2, 22 * (1 - alpha), "#facc15", 2, alpha, 16)
    }
  }

  private flushDrawQueue(ctx: CanvasRenderingContext2D): void {
    for (const item of this.drawQueue) {
      if (item.kind === "poly") {
        ctx.beginPath()
        const pts = item.pts
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
        ctx.closePath()
        ctx.fillStyle = item.fill
        ctx.fill()
        if (item.stroke) {
          ctx.strokeStyle = item.stroke
          ctx.lineWidth = item.lineWidth
          ctx.stroke()
        }
      } else if (item.kind === "orb") {
        const g = ctx.createRadialGradient(
          item.x - item.r * 0.3,
          item.y - item.r * 0.3,
          item.r * 0.1,
          item.x,
          item.y,
          item.r,
        )
        g.addColorStop(0, item.rimColor)
        g.addColorStop(0.55, item.color)
        g.addColorStop(1, "rgba(15, 23, 42, 0.45)")
        ctx.beginPath()
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      } else if (item.kind === "line") {
        ctx.save()
        ctx.globalAlpha = item.alpha
        ctx.strokeStyle = item.color
        ctx.lineWidth = item.width
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(item.x1, item.y1)
        ctx.lineTo(item.x2, item.y2)
        ctx.stroke()
        ctx.restore()
      } else if (item.kind === "ring") {
        ctx.save()
        ctx.globalAlpha = item.alpha
        ctx.strokeStyle = item.color
        ctx.lineWidth = item.width
        ctx.beginPath()
        for (let idx = 0; idx < item.pts.length; idx++) {
          const p = item.pts[idx]
          if (idx === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
        ctx.restore()
      }
    }
  }

  private drawEnemyHealthBars(
    ctx: CanvasRenderingContext2D,
    game: RenderableGameState,
  ): void {
    for (const e of game.enemies) {
      const def = ENEMY_TYPES[e.typeId]
      const topZ = def.isBoss
        ? 72
        : e.typeId === "orc"
          ? 44
          : e.typeId === "shaman"
            ? 40
            : 32
      const p = this.camera.project(e.x, e.y, topZ)
      const barW = Math.round((e.radius * 2 + 8) * p.scale)
      const barH = Math.max(3, Math.round((def.isBoss ? 6 : 4) * p.scale))
      const hpRatio = clamp(e.hp / e.maxHp, 0, 1)

      ctx.fillStyle = "rgba(15, 23, 42, 0.85)"
      ctx.fillRect(p.x - barW / 2, p.y - barH, barW, barH)
      ctx.fillStyle = def.isBoss
        ? "#f59e0b"
        : hpRatio > 0.5
          ? "#4ade80"
          : hpRatio > 0.25
            ? "#facc15"
            : "#ef4444"
      ctx.fillRect(p.x - barW / 2, p.y - barH, barW * hpRatio, barH)
    }

    for (const tower of game.towers.values()) {
      const slot = game.currentMap.slots[tower.slotId]
      if (!slot) continue
      const p = this.camera.project(slot.x, slot.y, 4)
      ctx.fillStyle = "rgba(15, 23, 42, 0.88)"
      ctx.fillRect(p.x - 14, p.y + 8, 28, 12)
      ctx.fillStyle = "#facc15"
      ctx.font = "bold 9px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`Lv.${tower.level}`, p.x, p.y + 14)
    }
  }

  private drawFloatingTexts3D(
    ctx: CanvasRenderingContext2D,
    game: RenderableGameState,
  ): void {
    for (const ft of game.floatingTexts) {
      const p = this.camera.project(ft.x, ft.y, ft.z !== undefined ? ft.z : 32)
      ctx.save()
      ctx.globalAlpha = clamp(ft.life / ft.maxLife, 0, 1)
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillStyle = "#020617"
      ctx.fillText(ft.text, p.x + 1, p.y + 1)
      ctx.fillStyle = ft.color
      ctx.fillText(ft.text, p.x, p.y)
      ctx.restore()
    }
  }

  private drawBannerOverlay(
    ctx: CanvasRenderingContext2D,
    game: RenderableGameState,
  ): void {
    if (game.state.paused) {
      ctx.save()
      ctx.fillStyle = "rgba(2, 6, 23, 0.55)"
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      ctx.fillStyle = "#f8fafc"
      ctx.font = "bold 28px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(
        "일시정지 (P 키로 재개)",
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2,
      )
      ctx.restore()
      return
    }

    if (game.state.bannerTimer > 0 && game.state.bannerText) {
      ctx.save()
      ctx.globalAlpha = clamp(game.state.bannerTimer, 0, 1)
      ctx.font = "bold 13px sans-serif"
      const textWidth = ctx.measureText(game.state.bannerText).width
      const boxW = clamp(textWidth + 56, 260, 660)
      const boxX = (CANVAS_WIDTH - boxW) / 2
      ctx.fillStyle = "rgba(15, 23, 42, 0.88)"
      ctx.strokeStyle = "rgba(56, 189, 248, 0.55)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(boxX, 14, boxW, 34, 999)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = "#e0f2fe"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(game.state.bannerText, CANVAS_WIDTH / 2, 31)
      ctx.restore()
    }
  }
}
