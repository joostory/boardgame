"use client"

import Link from "next/link"
import type { CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"
import {
  CAMPAIGN_STAGES_PER_MAP,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CHAMPION_UPGRADE_ORDER,
  CHAMPION_UPGRADES,
  CHAMPION_WEAPON_ORDER,
  CHAMPION_WEAPONS,
  ENEMY_TYPES,
  GUIDE_ENEMY_ORDER,
  getUpgradeCost,
  MAP_ORDER,
  MAPS,
  TOWER_ORDER,
  TOWER_TYPES,
} from "./data"
import { DefenseEngine } from "./engine"
import type {
  ChampionWeaponId,
  GameMode,
  HudSnapshot,
  MapId,
  TargetPriority,
} from "./types"

const PRIORITY_OPTIONS: { key: TargetPriority; label: string }[] = [
  { key: "first", label: "선두" },
  { key: "closest", label: "근접" },
  { key: "strongest", label: "강적" },
]

export default function DefenseGame() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<DefenseEngine | null>(null)

  const [hud, setHud] = useState<HudSnapshot | null>(null)
  const [guideOpen, setGuideOpen] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = new DefenseEngine(
      canvas,
      (snapshot) => setHud(snapshot),
      ({ waveRatio, hpRatio, skillProgress }) => {
        const root = rootRef.current
        if (!root) return
        root.style.setProperty("--wave-ratio", waveRatio)
        root.style.setProperty("--hp-ratio", hpRatio)
        root.style.setProperty("--skill-progress", skillProgress)
      },
    )

    engineRef.current = engine
    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    engineRef.current?.setModalOpen(guideOpen)
  }, [guideOpen])

  const selectedTower = hud?.selectedTower ?? null
  const selectedTowerDef = selectedTower
    ? TOWER_TYPES[selectedTower.typeId]
    : null
  const selectedTowerSpec =
    selectedTower && selectedTowerDef
      ? selectedTowerDef.levels[selectedTower.level - 1]
      : null
  const selectedTowerNextSpec =
    selectedTower && selectedTowerDef && selectedTowerSpec?.upgradeCost !== null
      ? selectedTowerDef.levels[selectedTower.level]
      : null

  const handleModeChange = (mode: GameMode) => {
    engineRef.current?.sfx.unlock()
    engineRef.current?.setModeAndMap(mode, hud?.mapId)
  }

  const handleMapSelect = (mapId: MapId) => {
    engineRef.current?.sfx.unlock()
    engineRef.current?.setModeAndMap("single", mapId)
  }

  const handleWeaponSelect = (weaponId: ChampionWeaponId) => {
    engineRef.current?.sfx.unlock()
    engineRef.current?.setChampionWeapon(weaponId)
  }

  const totalCampaignStages = MAP_ORDER.length * CAMPAIGN_STAGES_PER_MAP
  const currentMode = hud?.mode ?? "single"
  const currentMapId = hud?.mapId ?? "bastion"

  return (
    <div ref={rootRef} className="defense-root">
      <header className="top-hud">
        <div className="brand-row">
          <Link href="/" className="home-back-link" title="보드게임 홈으로">
            ←
          </Link>
          <div className="brand-block">
            <h1>Bow &amp; Bastion</h1>
            <p className="subtitle">궁수 챔피언 &amp; 무한 타워 디펜스</p>
          </div>
        </div>

        <div className="hud-stats" role="status" aria-live="polite">
          <div className="stat-pill stat-stage">
            <div className="stat-label-row">
              <span className="stat-label">
                STAGE <strong>{hud?.stage ?? 1}</strong>
              </span>
              <span className="stat-sub">
                {hud?.remainingText ?? "출격 대기"}
              </span>
            </div>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill wave-fill" />
            </div>
          </div>

          <div className="stat-pill stat-hp">
            <div className="stat-label-row">
              <span className="stat-label">본진 체력</span>
              <strong>
                {hud ? `${hud.coreHp} / ${hud.maxCoreHp}` : "20 / 20"}
              </strong>
            </div>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill hp-fill" />
            </div>
          </div>

          <div className="stat-pill stat-gold">
            <span className="stat-label">보유 골드</span>
            <strong className="gold-value">{hud?.gold ?? 150} G</strong>
          </div>

          <div className="stat-pill stat-kills">
            <span className="stat-label">처치 / 수집</span>
            <strong>
              <span>{hud?.kills ?? 0}</span> 처치
            </strong>
          </div>
        </div>

        <nav className="hud-actions" aria-label="게임 제어">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!hud || hud.waveActive || hud.gameOver}
            onClick={() => engineRef.current?.startCurrentStage()}
          >
            {hud?.waveActive
              ? `Stage ${hud.stage} 진행 중`
              : `Stage ${hud?.stage ?? 1} 시작`}
          </button>

          <button
            type="button"
            className={`btn btn-toggle ${(hud?.autoWave ?? true) ? "active" : ""}`}
            aria-pressed={hud?.autoWave ?? true}
            onClick={() => engineRef.current?.toggleAutoWave()}
          >
            자동 웨이브: {(hud?.autoWave ?? true) ? "ON" : "OFF"}
          </button>

          <button
            type="button"
            className={`btn btn-toggle ${(hud?.speedMultiplier ?? 1) > 1 ? "active" : ""}`}
            onClick={() => engineRef.current?.toggleSpeed()}
          >
            배속: {hud?.speedMultiplier ?? 1}x
          </button>

          <button
            type="button"
            className="btn btn-toggle"
            onClick={() => engineRef.current?.cycleCameraPreset()}
          >
            시점: {hud?.cameraPresetLabel ?? "쿼터뷰"}
          </button>

          <button
            type="button"
            className={`btn btn-toggle ${(hud?.soundEnabled ?? true) ? "active" : ""}`}
            aria-pressed={hud?.soundEnabled ?? true}
            onClick={() => engineRef.current?.toggleSound()}
          >
            사운드: {(hud?.soundEnabled ?? true) ? "ON" : "OFF"}
          </button>

          <button
            type="button"
            className={`btn btn-toggle ${hud?.paused ? "active" : ""}`}
            aria-pressed={hud?.paused ?? false}
            onClick={() => engineRef.current?.togglePause()}
          >
            {hud?.paused ? "재개 (P)" : "일시정지"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setGuideOpen(true)}
          >
            스테이지·건물 도감
          </button>
        </nav>
      </header>

      <section className="mode-map-bar" aria-label="게임 모드 및 전장 선택">
        <div className="mode-tabs" role="tablist" aria-label="게임 모드">
          <button
            type="button"
            role="tab"
            aria-selected={currentMode === "single"}
            className={`btn-chip mode-tab ${currentMode === "single" ? "active" : ""}`}
            onClick={() => handleModeChange("single")}
          >
            자유 맵 선택
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={currentMode === "campaign"}
            className={`btn-chip mode-tab ${currentMode === "campaign" ? "active" : ""}`}
            onClick={() => handleModeChange("campaign")}
          >
            원정대 캠페인 (전체 {MAP_ORDER.length}맵)
          </button>
        </div>

        {currentMode === "single" ? (
          <div className="map-selector-group" aria-label="전장 맵 선택">
            {MAP_ORDER.map((id) => {
              const m = MAPS[id]
              const active = currentMapId === id
              return (
                <button
                  key={id}
                  type="button"
                  className={`map-pill ${active ? "active" : ""}`}
                  title={m.subtitle}
                  onClick={() => handleMapSelect(id)}
                >
                  <span className="map-pill-name">{m.name}</span>
                  <span className="map-pill-diff">{m.difficulty}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="campaign-status-bar">
            <span className="campaign-badge">
              원정대 {(hud?.campaignMapIndex ?? 0) + 1} /{" "}
              {hud?.campaignTotalMaps ?? MAP_ORDER.length}
            </span>
            <strong className="campaign-map-name">
              {hud?.mapName ?? MAPS.bastion.name}
            </strong>
            <span className="campaign-stage-hint">
              Stage {hud?.stage ?? 1} / {totalCampaignStages} (맵당{" "}
              {CAMPAIGN_STAGES_PER_MAP}스테이지)
            </span>
            <button
              type="button"
              className="btn-chip"
              onClick={() => handleModeChange("campaign")}
            >
              처음부터
            </button>
          </div>
        )}
      </section>

      <main className="game-layout">
        <section className="arena-section" aria-label="전장 영역">
          <div className="canvas-frame">
            <canvas
              ref={canvasRef}
              className="game-canvas"
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              tabIndex={0}
              aria-label="3D 디펜스 전장 캔버스"
            />
          </div>

          <footer className="controls-legend">
            <ul className="legend-list">
              <li>
                <kbd>W</kbd>
                <kbd>A</kbd>
                <kbd>S</kbd>
                <kbd>D</kbd> / 방향키: 챔피언 이동 &amp; 골드 수집
              </li>
              <li>
                사거리 내 적: <strong>자동 활 조준·사격</strong>
              </li>
              <li>
                <kbd>Space</kbd>: 천공의 화살비
              </li>
              <li>
                <kbd>Q</kbd>
                <kbd>E</kbd> / 우클릭 드래그 / 휠: 3D 시점 회전·줌
              </li>
              <li>
                <kbd>클릭</kbd>: 건설 슬롯 선택 · <kbd>1</kbd>~<kbd>7</kbd>:
                건설 · <kbd>U</kbd>: 강화
              </li>
            </ul>
          </footer>
        </section>

        <aside className="control-panel" aria-label="업그레이드 및 건설 제어판">
          <section className="panel-card champion-panel">
            <div className="panel-header">
              <h2>챔피언 무기 강화</h2>
              <span className="bow-badge">
                {hud?.championBowName ?? "사냥꾼의 나무활"}
              </span>
            </div>

            <p className="champion-summary">
              {hud
                ? `공격력 ${hud.championStats.damage} · 공속 ${hud.championStats.fireRate.toFixed(2)}/s · 화살 ${hud.championStats.arrows}발 · 자석 ${hud.championStats.pickupRadius}px`
                : "공격력 24 · 공속 1.60/s · 화살 1발 · 자석 68px"}
            </p>

            <div
              className="weapon-switch-row"
              role="group"
              aria-label="챔피언 무기 선택"
            >
              {CHAMPION_WEAPON_ORDER.map((wId) => {
                const w = CHAMPION_WEAPONS[wId]
                const active = (hud?.championWeaponId ?? "longbow") === wId
                return (
                  <button
                    key={wId}
                    type="button"
                    className={`weapon-chip ${active ? "active" : ""}`}
                    title={w.shortDesc}
                    onClick={() => handleWeaponSelect(wId)}
                  >
                    <span
                      className="weapon-dot"
                      style={{ backgroundColor: w.color }}
                      aria-hidden="true"
                    />
                    <span>{w.name}</span>
                  </button>
                )
              })}
            </div>

            <div className="upgrade-list">
              {CHAMPION_UPGRADE_ORDER.map((key) => {
                const upg = CHAMPION_UPGRADES[key]
                const curLv = hud?.championLevels[key] ?? 1
                const cost = getUpgradeCost(upg, curLv)
                const disabled =
                  cost === null || !hud || hud.gold < cost || hud.gameOver

                return (
                  <div key={key} className="upgrade-item">
                    <div className="upgrade-meta">
                      <div className="upgrade-title">
                        <span>{upg.name}</span>
                        <span className="upgrade-lvl">
                          Lv.{curLv}/{upg.maxLevel}
                        </span>
                      </div>
                      <div className="upgrade-desc">
                        {upg.getEffectText(curLv)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn upgrade-btn"
                      disabled={disabled}
                      onClick={() => engineRef.current?.upgradeChampion(key)}
                    >
                      {cost === null ? "MAX" : `${cost} G`}
                    </button>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              className="skill-btn"
              disabled={!hud || hud.arrowRainCooldown > 0 || hud.gameOver}
              onClick={() => engineRef.current?.triggerArrowRain()}
            >
              <span className="skill-title">
                천공의 화살비 <kbd>Space</kbd>
              </span>
              <span className="skill-status">
                {hud && hud.arrowRainCooldown > 0
                  ? `${hud.arrowRainCooldown.toFixed(1)}s`
                  : "준비 완료"}
              </span>
            </button>
          </section>

          <section className="panel-card tower-panel">
            <div className="panel-header">
              <h2>
                {selectedTower ? "건물 무기 업그레이드" : "디펜스 건물 건설"}
              </h2>
              <span className="slot-badge">
                {selectedTower
                  ? `슬롯 #${selectedTower.slotId + 1}`
                  : hud?.selectedSlotId !== null &&
                      hud?.selectedSlotId !== undefined
                    ? `빈 슬롯 #${hud.selectedSlotId + 1}`
                    : "가까운 슬롯 자동"}
              </span>
            </div>

            {!selectedTower ? (
              <div>
                <p className="panel-hint">
                  전장의 빈 원형 슬롯을 클릭해 건물을 세우세요. 높은
                  스테이지에서 강력한 건물이 해금됩니다.
                </p>
                <div className="tower-grid">
                  {TOWER_ORDER.map((towerId) => {
                    const t = TOWER_TYPES[towerId]
                    const stage = hud?.stage ?? 1
                    const unlocked = stage >= t.unlockStage
                    const disabled =
                      !unlocked || !hud || hud.gold < t.cost || hud.gameOver

                    return (
                      <button
                        key={towerId}
                        type="button"
                        className={`tower-card ${unlocked ? "" : "locked"}`}
                        style={{ "--tower-color": t.color } as CSSProperties}
                        disabled={disabled}
                        onClick={() =>
                          engineRef.current?.handleBuildTowerClick(towerId)
                        }
                      >
                        <div className="tower-card-left">
                          <span className="tower-swatch" aria-hidden="true" />
                          <div>
                            <div className="tower-card-title">
                              <kbd>{t.key}</kbd> {t.name}
                            </div>
                            <div className="tower-card-role">{t.role}</div>
                          </div>
                        </div>
                        <span
                          className={
                            unlocked ? "tower-cost-badge" : "tower-lock-badge"
                          }
                        >
                          {unlocked
                            ? `${t.cost} G`
                            : `Stage ${t.unlockStage} 해금`}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              selectedTowerDef &&
              selectedTowerSpec && (
                <div>
                  <div className="inspect-header">
                    <div>
                      <h3>{selectedTowerDef.name}</h3>
                      <p className="weapon-tier">
                        Lv.{selectedTower.level} ·{" "}
                        {selectedTowerSpec.weaponName}
                      </p>
                    </div>
                    <span className="level-stars">
                      {"★".repeat(selectedTower.level)}
                      {"☆".repeat(5 - selectedTower.level)}
                    </span>
                  </div>

                  <dl className="inspect-stats">
                    <div className="inspect-stat-box">
                      <dt>공격력</dt>
                      <dd>{selectedTowerSpec.damage}</dd>
                    </div>
                    <div className="inspect-stat-box">
                      <dt>공격 속도</dt>
                      <dd>
                        {(
                          selectedTowerSpec.fireRate * selectedTower.speedMult
                        ).toFixed(2)}
                        /s{selectedTower.speedMult > 1 ? " (+버프)" : ""}
                      </dd>
                    </div>
                    <div className="inspect-stat-box">
                      <dt>사거리</dt>
                      <dd>{selectedTowerSpec.range}px</dd>
                    </div>
                    <div className="inspect-stat-box">
                      <dt>처치 수</dt>
                      <dd>{selectedTower.kills} 마리</dd>
                    </div>
                  </dl>

                  <div className="inspect-actions">
                    <button
                      type="button"
                      className="btn btn-upgrade"
                      disabled={
                        selectedTowerSpec.upgradeCost === null ||
                        !hud ||
                        hud.gold < selectedTowerSpec.upgradeCost ||
                        hud.gameOver
                      }
                      onClick={() => engineRef.current?.upgradeSelectedTower()}
                    >
                      {selectedTowerSpec.upgradeCost === null
                        ? "최고 등급 무기 (MAX)"
                        : `무기 강화 → ${selectedTowerNextSpec?.weaponName} (${selectedTowerSpec.upgradeCost} G)`}
                    </button>

                    <div className="priority-row">
                      <span className="priority-label">조준 우선순위</span>
                      <div
                        className="priority-group"
                        role="group"
                        aria-label="타워 조준 우선순위"
                      >
                        {PRIORITY_OPTIONS.map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            className={`btn-chip ${selectedTower.priority === opt.key ? "active" : ""}`}
                            onClick={() =>
                              engineRef.current?.setSelectedTowerPriority(
                                opt.key,
                              )
                            }
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="secondary-actions">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => engineRef.current?.sellSelectedTower()}
                      >
                        철거 (+{Math.round(selectedTower.totalInvested * 0.7)}{" "}
                        G)
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => engineRef.current?.deselectSlot()}
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </section>
        </aside>
      </main>

      {guideOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setGuideOpen(false)
          }}
        >
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-dialog-title"
          >
            <div className="dialog-shell">
              <header className="dialog-header">
                <h2 id="guide-dialog-title">
                  스테이지별 출현 적 &amp; 해금 건물 도감
                </h2>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setGuideOpen(false)}
                >
                  닫기
                </button>
              </header>
              <div className="dialog-body">
                <section className="guide-section">
                  <h3>전장 맵 목록 ({MAP_ORDER.length}종)</h3>
                  <ul className="guide-list">
                    {MAP_ORDER.map((id, idx) => {
                      const m = MAPS[id]
                      return (
                        <li key={id} className="guide-item">
                          <div className="guide-item-head">
                            <span>
                              {idx + 1}. {m.name}
                            </span>
                            <span className="guide-stage-tag">
                              난이도: {m.difficulty}
                            </span>
                          </div>
                          <p>{m.subtitle}</p>
                        </li>
                      )
                    })}
                  </ul>
                </section>
                <section className="guide-section">
                  <h3>스테이지별 건물 해금</h3>
                  <ul className="guide-list">
                    {TOWER_ORDER.map((id) => {
                      const t = TOWER_TYPES[id]
                      const maxLv = t.levels[t.levels.length - 1]
                      return (
                        <li key={id} className="guide-item">
                          <div className="guide-item-head">
                            <span>
                              {t.name} ({t.cost}G · {t.role})
                            </span>
                            <span className="guide-stage-tag">
                              Stage {t.unlockStage} 해금
                            </span>
                          </div>
                          <p>
                            {t.description} (최고 무기: {maxLv.weaponName},
                            공격력 {maxLv.damage})
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                </section>
                <section className="guide-section">
                  <h3>스테이지별 출현 몬스터</h3>
                  <ul className="guide-list">
                    {GUIDE_ENEMY_ORDER.map((id) => {
                      const e = ENEMY_TYPES[id]
                      return (
                        <li key={id} className="guide-item">
                          <div className="guide-item-head">
                            <span>
                              {e.name} (기본 체력 {e.hp} · 보상 {e.gold}G)
                            </span>
                            <span className="guide-stage-tag">
                              Stage {e.unlockStage}+ 출현
                            </span>
                          </div>
                          <p>{e.trait}</p>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {hud?.campaignVictory && (
        <div className="modal-backdrop">
          <div
            className="modal-dialog gameover-shell"
            role="dialog"
            aria-modal="true"
            aria-labelledby="victory-title"
          >
            <div className="dialog-shell">
              <header className="dialog-header">
                <h2 id="victory-title">원정대 캠페인 완전 정복!</h2>
              </header>
              <div className="dialog-body">
                <p className="gameover-lead">
                  {MAP_ORDER.length}개의 모든 전장과 총 {totalCampaignStages}
                  스테이지의 공세를 모두 막아냈습니다!
                </p>
                <dl className="gameover-stats">
                  <div>
                    <dt>최종 전장</dt>
                    <dd>{hud.mapName}</dd>
                  </div>
                  <div>
                    <dt>처치한 적</dt>
                    <dd>{hud.kills} 마리</dd>
                  </div>
                  <div>
                    <dt>수집한 총 골드</dt>
                    <dd>{hud.totalGoldCollected} G</dd>
                  </div>
                </dl>
                <div className="gameover-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      engineRef.current?.sfx.unlock()
                      engineRef.current?.resetGame()
                    }}
                  >
                    원정대 다시 도전
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {hud?.gameOver && (
        <div className="modal-backdrop">
          <div
            className="modal-dialog gameover-shell"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gameover-title"
          >
            <div className="dialog-shell">
              <header className="dialog-header">
                <h2 id="gameover-title">본진 성채 함락!</h2>
              </header>
              <div className="dialog-body">
                <p className="gameover-lead">
                  끊임없이 몰려드는 적의 공세에 본진이 무너졌습니다.
                </p>
                <dl className="gameover-stats">
                  <div>
                    <dt>도달 스테이지</dt>
                    <dd>Stage {hud.stage}</dd>
                  </div>
                  <div>
                    <dt>처치한 적</dt>
                    <dd>{hud.kills} 마리</dd>
                  </div>
                  <div>
                    <dt>수집한 총 골드</dt>
                    <dd>{hud.totalGoldCollected} G</dd>
                  </div>
                </dl>
                <div className="gameover-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      engineRef.current?.sfx.unlock()
                      engineRef.current?.resetGame()
                    }}
                  >
                    새 게임 다시 시작
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
