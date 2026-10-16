"use client"

import {
  BookOpen,
  CheckCircle2,
  Compass,
  Eye,
  FastForward,
  HelpCircle,
  Home,
  Info,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  SkipForward,
  Sparkles,
  Trophy,
  Undo2,
  Volume2,
  VolumeX,
  Wand2,
} from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ALL_FACES,
  applyMove,
  applyMoves,
  type BasicMove,
  type CubieState,
  createSolvedCube,
  generateScramble,
  getCenterRotations,
  invertMove,
  isCubeSolved,
} from "../utils/cubeEngine"
import {
  createStagePracticeCube,
  type FullSolution,
  STAGE_GUIDES,
  solveCubeLayerByLayer,
} from "../utils/cubeSolver"
import { Cube3DViewport } from "./Cube3DViewport"
import { CubeNetView } from "./CubeNetView"
import { CUBE_STYLES, type CubeStyleType, FACE_COLORS } from "./StickerGraphic"

type RightTab = "solver" | "academy" | "net"

interface FlatSolutionStep {
  globalIndex: number
  stageIndex: number
  stageNumber: number
  stageTitle: string
  subStepIndex: number
  subStepTitle: string
  subStepDescription: string
  formulaName?: string
  moveInSubStepIndex: number
  subStepMoves: BasicMove[]
  move: BasicMove
  targetCubieIds?: string[]
}

const CAMERA_PRESETS: { label: string; pitch: number; yaw: number }[] = [
  { label: "기본 시점 (앞·위·오른)", pitch: -25, yaw: -35 },
  { label: "반대 시점 (뒤·위·왼)", pitch: -25, yaw: 145 },
  { label: "1층(바닥 D) 보기", pitch: 38, yaw: -35 },
  { label: "3층(윗면 U) 보기", pitch: -55, yaw: -25 },
  { label: "정면(F) 보기", pitch: -12, yaw: 0 },
]

export default function CubeSimulatorGame() {
  // 큐브 상태 및 히스토리
  const [cubies, setCubies] = useState<CubieState[]>(() => createSolvedCube())
  const [history, setHistory] = useState<BasicMove[]>([])
  const [cubeStyle, setCubeStyle] = useState<CubeStyleType>("classic")
  const [soundEnabled, setSoundEnabled] = useState(true)

  // 3D 카메라 각도
  const [cameraPitch, setCameraPitch] = useState(-25)
  const [cameraYaw, setCameraYaw] = useState(-35)

  // 애니메이션 큐 및 현재 회전 중인 이동
  const [activeMove, setActiveMove] = useState<BasicMove | null>(null)
  const moveQueueRef = useRef<
    {
      move: BasicMove
      recordHistory: boolean
      advanceSolutionStep?: boolean
    }[]
  >([])
  const isAnimatingRef = useRef(false)
  const [animSpeedMs, setAnimSpeedMs] = useState<number>(210)

  // 타이머 & 게임 진행 상태
  const [moveCount, setMoveCount] = useState(0)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [lastScramble, setLastScramble] = useState<BasicMove[]>([])
  const [showWinBanner, setShowWinBanner] = useState(false)

  // 우측 패널 탭 및 해법 가이드 상태
  const [rightTab, setRightTab] = useState<RightTab>("solver")
  const [solution, setSolution] = useState<FullSolution | null>(null)
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [selectedAcademyStage, setSelectedAcademyStage] = useState<number>(1)
  const [practiceBanner, setPracticeBanner] = useState<string | null>(null)

  const currentStyleConfig = useMemo(
    () => CUBE_STYLES.find((s) => s.id === cubeStyle) || CUBE_STYLES[0],
    [cubeStyle],
  )
  const checkOrientation = currentStyleConfig.hasOrientation

  // 색상 기준 완성 여부 & 방향 포함 최종 완성 여부
  const isColorSolved = useMemo(() => isCubeSolved(cubies, false), [cubies])
  const isFullySolved = useMemo(
    () => isCubeSolved(cubies, checkOrientation),
    [cubies, checkOrientation],
  )
  const centerRotations = useMemo(() => getCenterRotations(cubies), [cubies])

  // Web Audio API 사운드 효과
  const audioCtxRef = useRef<AudioContext | null>(null)
  const playSound = useCallback(
    (type: "turn" | "solve" | "scramble") => {
      if (!soundEnabled || typeof window === "undefined") return
      try {
        if (!audioCtxRef.current) {
          const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext
          audioCtxRef.current = new AudioCtx()
        }
        const ctx = audioCtxRef.current
        if (ctx.state === "suspended") {
          ctx.resume()
        }
        const now = ctx.currentTime

        if (type === "turn") {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = "triangle"
          osc.frequency.setValueAtTime(170, now)
          osc.frequency.exponentialRampToValueAtTime(75, now + 0.055)
          gain.gain.setValueAtTime(0.14, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.06)
        } else if (type === "scramble") {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = "sine"
          osc.frequency.setValueAtTime(240, now)
          osc.frequency.exponentialRampToValueAtTime(120, now + 0.04)
          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.045)
        } else if (type === "solve") {
          const notes = [523.25, 659.25, 783.99, 1046.5]
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = "triangle"
            osc.frequency.setValueAtTime(freq, now + i * 0.09)
            gain.gain.setValueAtTime(0.18, now + i * 0.09)
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35)
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start(now + i * 0.09)
            osc.stop(now + i * 0.09 + 0.36)
          })
        }
      } catch {
        // 오디오 컨텍스트 제한 시 무시
      }
    },
    [soundEnabled],
  )

  // 타이머 동작
  useEffect(() => {
    if (!timerActive) return
    const timer = setInterval(() => {
      setElapsedSec((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timerActive])

  // 큐브가 완성되면 타이머 정지 및 축하 배너 표시
  useEffect(() => {
    if (isFullySolved && moveCount > 0) {
      setTimerActive(false)
      setIsAutoPlaying(false)
      setShowWinBanner(true)
      playSound("solve")
    }
  }, [isFullySolved, moveCount, playSound])

  // 해법의 전체 개별 이동(FlatSolutionStep) 배열 생성
  const flatSteps: FlatSolutionStep[] = useMemo(() => {
    if (!solution || solution.isAlreadySolved) return []
    const list: FlatSolutionStep[] = []
    let gIdx = 0
    solution.stages.forEach((stage, sIdx) => {
      stage.subSteps.forEach((sub, subIdx) => {
        sub.moves.forEach((m, mIdx) => {
          list.push({
            globalIndex: gIdx++,
            stageIndex: sIdx,
            stageNumber: stage.stageNumber,
            stageTitle: stage.title,
            subStepIndex: subIdx,
            subStepTitle: sub.title,
            subStepDescription: sub.description,
            formulaName: sub.formulaName,
            moveInSubStepIndex: mIdx,
            subStepMoves: sub.moves,
            move: m,
            targetCubieIds: sub.targetCubieIds,
          })
        })
      })
    })
    return list
  }, [solution])

  const currentFlatStep: FlatSolutionStep | null =
    flatSteps.length > 0 && currentStepIdx < flatSteps.length
      ? flatSteps[currentStepIdx]
      : null

  // 애니메이션 큐 처리기
  const processNextInQueue = useCallback(() => {
    if (isAnimatingRef.current) return
    const nextItem = moveQueueRef.current.shift()
    if (!nextItem) return

    isAnimatingRef.current = true
    setActiveMove(nextItem.move)
    playSound("turn")

    setTimeout(() => {
      setCubies((prev) => applyMove(prev, nextItem.move))
      if (nextItem.recordHistory) {
        setHistory((prev) => [...prev, nextItem.move])
        setMoveCount((prev) => prev + 1)
      }
      if (nextItem.advanceSolutionStep) {
        setCurrentStepIdx((prev) => prev + 1)
      }
      setActiveMove(null)
      isAnimatingRef.current = false

      if (moveQueueRef.current.length > 0) {
        setTimeout(() => processNextInQueue(), 25)
      }
    }, animSpeedMs)
  }, [animSpeedMs, playSound])

  const enqueueMove = useCallback(
    (
      move: BasicMove,
      options: { recordHistory?: boolean; advanceSolutionStep?: boolean } = {},
    ) => {
      const { recordHistory = true, advanceSolutionStep = false } = options
      moveQueueRef.current.push({
        move,
        recordHistory,
        advanceSolutionStep,
      })
      processNextInQueue()
    },
    [processNextInQueue],
  )

  // 사용자가 직접 회전 조작을 요청했을 때
  const handleUserMove = useCallback(
    (move: BasicMove) => {
      setShowWinBanner(false)
      if (!timerActive && moveCount === 0) {
        setTimerActive(true)
      }

      // 만약 현재 해법 가이드가 켜져 있고, 사용자가 누른 수가 정확히 다음 추천 수라면 해법 스텝을 자동으로 1칸 전진!
      if (currentFlatStep && currentFlatStep.move === move) {
        enqueueMove(move, { recordHistory: true, advanceSolutionStep: true })
      } else {
        // 다른 수를 두면 기존 해법 경로와 달라지므로 자동재생 중지 및 재분석 안내 가능하도록 처리
        setIsAutoPlaying(false)
        if (solution) {
          setSolution(null)
          setCurrentStepIdx(0)
        }
        enqueueMove(move, { recordHistory: true, advanceSolutionStep: false })
      }
    },
    [currentFlatStep, enqueueMove, moveCount, solution, timerActive],
  )

  // 자동 재생 (Auto Play) 루프
  useEffect(() => {
    if (!isAutoPlaying) return
    if (!currentFlatStep) {
      setIsAutoPlaying(false)
      return
    }
    if (activeMove || moveQueueRef.current.length > 0) return

    const timer = setTimeout(() => {
      enqueueMove(currentFlatStep.move, {
        recordHistory: true,
        advanceSolutionStep: true,
      })
    }, 80)

    return () => clearTimeout(timer)
  }, [isAutoPlaying, currentFlatStep, activeMove, enqueueMove])

  // 키보드 단축키 지원 (U, D, L, R, F, B + Shift 반시계방향, Space 다음 힌트 실행)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }
      const key = e.key.toUpperCase()
      if (["U", "D", "L", "R", "F", "B"].includes(key)) {
        e.preventDefault()
        const move = (e.shiftKey ? `${key}'` : key) as BasicMove
        handleUserMove(move)
      } else if (e.key === " " && currentFlatStep) {
        e.preventDefault()
        enqueueMove(currentFlatStep.move, {
          recordHistory: true,
          advanceSolutionStep: true,
        })
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleUserMove, currentFlatStep, enqueueMove])

  // 섞기(Scramble) 실행
  const handleScramble = (count = 20) => {
    moveQueueRef.current = []
    setIsAutoPlaying(false)
    setSolution(null)
    setCurrentStepIdx(0)
    setShowWinBanner(false)
    setPracticeBanner(null)

    const scrambleMoves = generateScramble(count)
    const solved = createSolvedCube()
    const scrambled = applyMoves(solved, scrambleMoves)

    setCubies(scrambled)
    setHistory([])
    setMoveCount(0)
    setElapsedSec(0)
    setTimerActive(true)
    setLastScramble(scrambleMoves)
    playSound("scramble")
  }

  // 현재 상태에서 해결 방법 찾기 실행
  const handleFindSolution = useCallback(() => {
    setIsAutoPlaying(false)
    moveQueueRef.current = []
    const computed = solveCubeLayerByLayer(cubies, checkOrientation)
    setSolution(computed)
    setCurrentStepIdx(0)
    setRightTab("solver")
  }, [cubies, checkOrientation])

  // 큐브 스타일 변경 시 이미 열린 해법이 있다면 방향 조건에 맞춰 재계산
  const handleChangeCubeStyle = (newStyle: CubeStyleType) => {
    setCubeStyle(newStyle)
    setShowWinBanner(false)
    const newConfig = CUBE_STYLES.find((s) => s.id === newStyle)
    if (solution && newConfig) {
      const recomputed = solveCubeLayerByLayer(cubies, newConfig.hasOrientation)
      setSolution(recomputed)
      setCurrentStepIdx(0)
    }
  }

  // 한 수 되돌리기 (Undo)
  const handleUndo = () => {
    if (history.length === 0 || activeMove) return
    setIsAutoPlaying(false)
    setSolution(null)
    const lastMove = history[history.length - 1]
    const inv = invertMove(lastMove)
    setHistory((prev) => prev.slice(0, -1))
    setCubies((prev) => applyMove(prev, inv))
    setMoveCount((prev) => Math.max(0, prev - 1))
    playSound("turn")
  }

  // 맞춰진 상태로 초기화
  const handleReset = () => {
    moveQueueRef.current = []
    setIsAutoPlaying(false)
    setActiveMove(null)
    isAnimatingRef.current = false
    setCubies(createSolvedCube())
    setHistory([])
    setMoveCount(0)
    setElapsedSec(0)
    setTimerActive(false)
    setLastScramble([])
    setSolution(null)
    setCurrentStepIdx(0)
    setShowWinBanner(false)
    setPracticeBanner(null)
  }

  // 해법 네비게이터: 다음 1수 실행
  const handleStepForward = () => {
    if (!currentFlatStep || activeMove) return
    setIsAutoPlaying(false)
    enqueueMove(currentFlatStep.move, {
      recordHistory: true,
      advanceSolutionStep: true,
    })
  }

  // 해법 네비게이터: 이전 1수 되돌리기
  const handleStepBackward = () => {
    if (!solution || currentStepIdx <= 0 || activeMove) return
    setIsAutoPlaying(false)
    const prevStep = flatSteps[currentStepIdx - 1]
    const inv = invertMove(prevStep.move)
    setCubies((prev) => applyMove(prev, inv))
    setCurrentStepIdx((prev) => prev - 1)
    playSound("turn")
  }

  // 해법 네비게이터: 현재 세부 단계(SubStep) 끝까지 연속 실행
  const handleRunCurrentSubStep = () => {
    if (!currentFlatStep || activeMove) return
    setIsAutoPlaying(false)
    const targetStage = currentFlatStep.stageIndex
    const targetSub = currentFlatStep.subStepIndex
    for (let i = currentStepIdx; i < flatSteps.length; i++) {
      const st = flatSteps[i]
      if (st.stageIndex === targetStage && st.subStepIndex === targetSub) {
        enqueueMove(st.move, {
          recordHistory: true,
          advanceSolutionStep: true,
        })
      } else {
        break
      }
    }
  }

  // 학습 아카데미: 특정 단계 연습 상태 불러오기
  const handleLoadStagePractice = (stageNum: number) => {
    moveQueueRef.current = []
    setIsAutoPlaying(false)
    setShowWinBanner(false)

    // 8단계(센터 방향 정렬) 연습 시 자동으로 방향 있는 큐브로 전환
    let targetHasOrientation = checkOrientation
    if (stageNum === 8 && !checkOrientation) {
      setCubeStyle("supercube")
      targetHasOrientation = true
    }

    const { cubies: practiceCubies, description } =
      createStagePracticeCube(stageNum)
    setCubies(practiceCubies)
    setHistory([])
    setMoveCount(0)
    setElapsedSec(0)
    setTimerActive(true)
    setLastScramble([])
    setPracticeBanner(description)

    // 바로 해법 분석도 함께 생성해 두어 막히면 볼 수 있게 지원
    const sol = solveCubeLayerByLayer(practiceCubies, targetHasOrientation)
    setSolution(sol)
    setCurrentStepIdx(0)
    playSound("scramble")
  }

  // 학습 아카데미: 공식 애니메이션 직접 시연
  const handleDemonstrateFormula = (moves: BasicMove[]) => {
    if (activeMove) return
    setIsAutoPlaying(false)
    setSolution(null)
    for (const m of moves) {
      enqueueMove(m, { recordHistory: true, advanceSolutionStep: false })
    }
  }

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const palette =
    cubeStyle === "pastel" ? FACE_COLORS.pastel : FACE_COLORS.classic

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950 flex flex-col items-center p-3 sm:p-6">
      {/* 1. 상단 네비게이션 헤더 */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200"
        >
          <Home size={20} />
          <span className="hidden sm:inline text-sm font-medium">
            메뉴로 가기
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 tracking-tight">
            3×3 큐브
          </h1>
          <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold">
            3D
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-neutral-400 hover:text-white hover:bg-neutral-800"
            title={soundEnabled ? "소리 끄기" : "소리 켜기"}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:text-white hover:bg-neutral-800"
                title="도움말 및 회전 기호 안내"
              >
                <HelpCircle size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-lg max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Info className="text-amber-400" />
                  3×3 큐브 조작법 & 회전 기호 안내
                </DialogTitle>
                <DialogDescription className="text-neutral-400 text-sm mt-1">
                  다양한 형태의 큐브를 섞고, 8단계 초급/슈퍼큐브 해법으로 맞추는
                  방법을 학습해보세요.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-neutral-200 text-sm pt-2">
                <div className="bg-neutral-800/70 p-3.5 rounded-xl border border-neutral-700/70 space-y-2">
                  <h3 className="font-bold text-amber-400">
                    🎮 마우스 / 터치 / 키보드 조작법
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300">
                    <li>
                      <strong>시점 회전:</strong> 큐브 주변 빈 공간이나 각 면의{" "}
                      <strong>중심 조각</strong>을 드래그하면 360° 자유롭게
                      돌려볼 수 있습니다.
                    </li>
                    <li>
                      <strong>큐브 면 회전:</strong> 큐브의 모서리·코너 조각을
                      원하는 방향으로 드래그하거나 하단 회전 패드 버튼을
                      클릭하세요.
                    </li>
                    <li>
                      <strong>키보드 단축키:</strong>{" "}
                      <code className="bg-neutral-950 px-1.5 py-0.5 rounded text-amber-300">
                        U D L R F B
                      </code>{" "}
                      키로 시계방향 회전,{" "}
                      <code className="bg-neutral-950 px-1.5 py-0.5 rounded text-amber-300">
                        Shift + 키
                      </code>
                      로 반시계방향 회전,{" "}
                      <code className="bg-neutral-950 px-1.5 py-0.5 rounded text-amber-300">
                        Space
                      </code>
                      로 해법의 다음 추천 수를 바로 실행합니다.
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-800/70 p-3.5 rounded-xl border border-neutral-700/70 space-y-2">
                  <h3 className="font-bold text-amber-400">
                    📐 국제 표준 회전 기호 (Notation)
                  </h3>
                  <p className="text-xs text-neutral-400">
                    각 면을 정면에서 바라보았을 때 시계방향 90°가 기본이며,{" "}
                    <code className="text-amber-300">&apos;</code>(프라임)이
                    붙으면 반시계방향 90°,{" "}
                    <code className="text-amber-300">2</code>가 붙으면 180°
                    회전입니다.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-neutral-950/70 p-2 rounded border border-neutral-800">
                      <span className="font-bold text-yellow-400">U (Up)</span>:
                      윗면 (3층)
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded border border-neutral-800">
                      <span className="font-bold text-slate-200">D (Down)</span>
                      : 아랫면 (1층 바닥)
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded border border-neutral-800">
                      <span className="font-bold text-red-400">F (Front)</span>:
                      앞면
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded border border-neutral-800">
                      <span className="font-bold text-orange-400">
                        B (Back)
                      </span>
                      : 뒷면
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded border border-neutral-800">
                      <span className="font-bold text-green-400">L (Left)</span>
                      : 왼쪽면
                    </div>
                    <div className="bg-neutral-950/70 p-2 rounded border border-neutral-800">
                      <span className="font-bold text-blue-400">R (Right)</span>
                      : 오른쪽면
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-800/70 p-3.5 rounded-xl border border-neutral-700/70 space-y-1.5">
                  <h3 className="font-bold text-amber-400">
                    🖼️ 색만 있는 큐브 vs 그림·방향이 있는 큐브
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    일반 색상 큐브는 중심 조각이 90°나 180° 돌아가 있어도 눈에
                    보이지 않지만, <strong>일러스트 그림 큐브</strong>,{" "}
                    <strong>화살표 슈퍼큐브</strong>,{" "}
                    <strong>숫자 매트릭스 큐브</strong>는 중심 조각의
                    방향(0°)까지 정확히 일치해야 그림이 완성됩니다! 본
                    시뮬레이터의 솔버는 방향 큐브의 센터 정렬 해법(8단계)까지
                    완벽하게 찾아줍니다.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* 2. 큐브 형태(테마) 선택 바 */}
      <section className="w-full max-w-6xl bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3 mb-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Layers size={14} className="text-amber-400" />
              큐브 형태:
            </span>
            {CUBE_STYLES.map((style) => {
              const active = cubeStyle === style.id
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleChangeCubeStyle(style.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                    active
                      ? "bg-amber-500 text-neutral-950 border-amber-400 shadow-md scale-[1.02]"
                      : "bg-neutral-800/90 text-neutral-300 border-neutral-700 hover:bg-neutral-750 hover:text-white"
                  }`}
                >
                  <span>{style.shortName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      active
                        ? "bg-neutral-950/20 text-neutral-950"
                        : style.hasOrientation
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {style.badge}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="text-xs text-neutral-400 lg:text-right">
            {currentStyleConfig.description}
          </p>
        </div>
      </section>

      {/* 3. 섞기(Scramble) & 해법 찾기 컨트롤 바 */}
      <section className="w-full max-w-6xl bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3 mb-5 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-400 flex items-center gap-1 mr-1">
            <Shuffle size={14} className="text-amber-400" />
            큐브 섞기:
          </span>
          {[
            { label: "워밍업 3수", count: 3 },
            { label: "초급 7수", count: 7 },
            { label: "중급 12수", count: 12 },
            { label: "표준 20수", count: 20 },
          ].map((item) => (
            <Button
              key={item.count}
              size="sm"
              variant="secondary"
              onClick={() => handleScramble(item.count)}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 h-8 px-3 text-xs font-semibold cursor-pointer"
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* 상태 표시 */}
          <div className="flex items-center gap-3 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-500 mr-1">이동</span>
              <span className="font-extrabold text-amber-400">{moveCount}</span>
              <span className="text-neutral-500 ml-0.5">회</span>
            </div>
            <div className="w-px h-3 bg-neutral-800" />
            <div>
              <span className="text-neutral-500 mr-1">시간</span>
              <span className="font-mono font-bold text-neutral-200">
                {formatTime(elapsedSec)}
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleUndo}
            disabled={history.length === 0 || !!activeMove}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 h-8 px-3 text-xs disabled:opacity-40 cursor-pointer"
          >
            <Undo2 size={14} className="mr-1" />
            되돌리기
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleReset}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 h-8 px-3 text-xs cursor-pointer"
          >
            <RotateCcw size={14} className="mr-1" />
            초기화
          </Button>

          <Button
            size="sm"
            onClick={handleFindSolution}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-extrabold h-8 px-3.5 text-xs shadow-md cursor-pointer"
          >
            <Wand2 size={14} className="mr-1.5" />
            해결 방법 찾기 (
            {checkOrientation ? "8단계 방향해법" : "7단계 초급해법"})
          </Button>
        </div>
      </section>

      {/* 4. 메인 2단 레이아웃: 좌측 3D 큐브 & 회전 패드 / 우측 학습 & 해법 & 전개도 */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 좌측(7칸): 3D 인터랙티브 뷰포트 + 시점 프리셋 + 6면 회전 패드 */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <Card className="bg-neutral-900/70 border-neutral-800 p-3 sm:p-4 rounded-2xl relative overflow-hidden">
            {/* 연습 모드 또는 마지막 섞기 시퀀스 안내 배지 */}
            {practiceBanner && (
              <div className="mb-3 bg-indigo-500/15 border border-indigo-500/40 text-indigo-200 px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-indigo-400 shrink-0" />
                  <span>{practiceBanner}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPracticeBanner(null)}
                  className="text-indigo-300 hover:text-white text-[11px] font-bold shrink-0"
                >
                  닫기
                </button>
              </div>
            )}

            {/* 방향 큐브일 때 색상은 다 맞았지만 센터 방향만 돌아가 있는 경우 특별 안내 */}
            {checkOrientation && isColorSolved && !isFullySolved && (
              <div className="mb-3 bg-rose-500/15 border border-rose-500/40 text-rose-200 px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2">
                <div>
                  <strong>🎨 색상은 모두 맞았습니다!</strong> 하지만 현재{" "}
                  <strong>{currentStyleConfig.shortName}</strong>에서는 중심
                  조각의 그림/화살표 방향(
                  {ALL_FACES.filter((f) => centerRotations[f] !== 0)
                    .map((f) => `${f}:${centerRotations[f]}°`)
                    .join(", ")}
                  )까지 정방향(0°)으로 맞춰야 완성됩니다.
                </div>
                <Button
                  size="sm"
                  onClick={handleFindSolution}
                  className="bg-rose-500 hover:bg-rose-400 text-white text-xs h-7 px-2.5 shrink-0"
                >
                  센터 정렬 해법 보기
                </Button>
              </div>
            )}

            {/* 3D 큐브 뷰포트 */}
            <div className="relative">
              <Cube3DViewport
                cubies={cubies}
                cubeStyle={cubeStyle}
                cameraPitch={cameraPitch}
                cameraYaw={cameraYaw}
                onCameraChange={(p, y) => {
                  setCameraPitch(p)
                  setCameraYaw(y)
                }}
                onRequestMove={handleUserMove}
                activeMove={activeMove}
                highlightedCubieIds={currentFlatStep?.targetCubieIds}
              />

              {/* 큐브 완성 축하 배너 */}
              {showWinBanner && isFullySolved && (
                <div className="absolute inset-x-4 bottom-4 bg-neutral-900/95 border border-amber-500/60 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 z-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-400">
                      <Trophy size={26} />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-amber-400">
                        🎉 큐브 완성 성공! ({currentStyleConfig.shortName})
                      </h3>
                      <p className="text-xs text-neutral-300">
                        총 <strong>{moveCount}회</strong> 이동 · 소요 시간{" "}
                        <strong>{formatTime(elapsedSec)}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowWinBanner(false)}
                      className="border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 h-8 text-xs"
                    >
                      계속 보기
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleScramble(20)}
                      className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold h-8 text-xs"
                    >
                      다시 섞기
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* 시점 프리셋 버튼 바 */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-neutral-400 font-semibold flex items-center gap-1 mr-1">
                  <Eye size={13} />
                  빠른 시점:
                </span>
                {CAMERA_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setCameraPitch(preset.pitch)
                      setCameraYaw(preset.yaw)
                    }}
                    className="text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg border border-neutral-700/70 transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {lastScramble.length > 0 && (
                <div className="text-[11px] text-neutral-400 font-mono truncate max-w-full">
                  섞기 기호:{" "}
                  <span className="text-neutral-300">
                    {lastScramble.join(" ")}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* 6면 회전 조작 패드 (시계방향 / 반시계방향 / 180도) */}
          <Card className="bg-neutral-900/70 border-neutral-800 p-3.5 sm:p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Compass size={16} className="text-amber-400" />
                <h2 className="text-sm font-bold text-neutral-200">
                  직접 회전 컨트롤 패드
                </h2>
              </div>
              {currentFlatStep && (
                <span className="text-xs text-amber-300 font-semibold animate-pulse">
                  👉 다음 추천 회전: <strong>{currentFlatStep.move}</strong>{" "}
                  (클릭 또는 Space 키)
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {ALL_FACES.map((face) => {
                const fColor = palette[face]
                const cwMove = face as BasicMove
                const ccwMove = `${face}'` as BasicMove
                const doubleMove = `${face}2` as BasicMove

                const isCwRecommended = currentFlatStep?.move === cwMove
                const isCcwRecommended = currentFlatStep?.move === ccwMove
                const isDoubleRecommended = currentFlatStep?.move === doubleMove

                return (
                  <div
                    key={face}
                    className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-2 flex flex-col items-center gap-1.5"
                  >
                    <div className="flex items-center gap-1.5 w-full justify-center">
                      <span
                        className="w-3 h-3 rounded-xs inline-block border"
                        style={{
                          backgroundColor: fColor.bg,
                          borderColor: fColor.border,
                        }}
                      />
                      <span className="text-xs font-extrabold text-neutral-200">
                        {fColor.nameKo}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 w-full">
                      <button
                        type="button"
                        onClick={() => handleUserMove(cwMove)}
                        disabled={!!activeMove}
                        title={`${face} 시계방향 90° 회전`}
                        className={`py-1.5 rounded-lg text-xs font-extrabold border transition-all cursor-pointer ${
                          isCwRecommended
                            ? "bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-400 scale-105 shadow-lg"
                            : "bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700"
                        }`}
                      >
                        {cwMove}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUserMove(ccwMove)}
                        disabled={!!activeMove}
                        title={`${face}' 반시계방향 90° 회전`}
                        className={`py-1.5 rounded-lg text-xs font-extrabold border transition-all cursor-pointer ${
                          isCcwRecommended
                            ? "bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-400 scale-105 shadow-lg"
                            : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700"
                        }`}
                      >
                        {ccwMove}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUserMove(doubleMove)}
                        disabled={!!activeMove}
                        title={`${face}2 180° 회전`}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          isDoubleRecommended
                            ? "bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-400 scale-105 shadow-lg"
                            : "bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border-neutral-800"
                        }`}
                      >
                        {doubleMove}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* 우측(5칸): 해법 네비게이터 / 단계별 학습 아카데미 / 2D 전개도 탭 */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="bg-neutral-900/70 border-neutral-800 p-4 rounded-2xl flex flex-col min-h-[540px]">
            {/* 상단 탭 스위치 */}
            <div className="grid grid-cols-3 gap-1.5 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 mb-4">
              <button
                type="button"
                onClick={() => setRightTab("solver")}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  rightTab === "solver"
                    ? "bg-amber-500 text-neutral-950 shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Wand2 size={14} />
                <span>해법 가이드</span>
              </button>
              <button
                type="button"
                onClick={() => setRightTab("academy")}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  rightTab === "academy"
                    ? "bg-amber-500 text-neutral-950 shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <BookOpen size={14} />
                <span>공식 학습실</span>
              </button>
              <button
                type="button"
                onClick={() => setRightTab("net")}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  rightTab === "net"
                    ? "bg-amber-500 text-neutral-950 shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Layers size={14} />
                <span>2D 전개도</span>
              </button>
            </div>

            {/* 탭 1: 실시간 해법 가이드 */}
            {rightTab === "solver" && (
              <div className="flex-1 flex flex-col justify-between gap-4">
                {!solution ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-neutral-950/50 rounded-2xl border border-neutral-800/80 gap-4">
                    <div className="p-4 rounded-full bg-amber-500/15 text-amber-400">
                      <Wand2 size={36} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-extrabold text-white">
                        현재 큐브 상태의 맞춤형 해법을 찾아드립니다
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                        큐브를 자유롭게 섞거나 돌려본 뒤 아래 버튼을 누르면,{" "}
                        {checkOrientation
                          ? "그림/화살표 중심 방향 정렬(8단계)까지 포함된"
                          : "누구나 따라할 수 있는 초급 7단계"}{" "}
                        단계별 풀이를 한 수씩 안내합니다.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                      <Button
                        onClick={() => {
                          const s = generateScramble(12)
                          const next = applyMoves(createSolvedCube(), s)
                          setCubies(next)
                          setLastScramble(s)
                          setMoveCount(0)
                          setElapsedSec(0)
                          setTimerActive(true)
                          const computed = solveCubeLayerByLayer(
                            next,
                            checkOrientation,
                          )
                          setSolution(computed)
                          setCurrentStepIdx(0)
                        }}
                        variant="secondary"
                        className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 text-xs cursor-pointer"
                      >
                        <Shuffle size={14} className="mr-1.5" />
                        섞고 바로 해법 보기
                      </Button>
                      <Button
                        onClick={handleFindSolution}
                        className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs cursor-pointer"
                      >
                        <Wand2 size={14} className="mr-1.5" />
                        현재 상태 해법 분석하기
                      </Button>
                    </div>
                  </div>
                ) : solution.isAlreadySolved ||
                  currentStepIdx >= flatSteps.length ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-emerald-950/20 rounded-2xl border border-emerald-500/30 gap-4">
                    <div className="p-3.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 size={36} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-emerald-300">
                        모든 단계가 완성되었습니다!
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-xs">
                        {checkOrientation
                          ? "6개 면의 색상뿐만 아니라 모든 중심 조각의 방향(0°)까지 완벽하게 정렬되었습니다."
                          : "6개 면의 색상이 모두 완벽하게 맞춰졌습니다."}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleScramble(12)}
                        className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs cursor-pointer"
                      >
                        새로 섞기
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setRightTab("academy")}
                        className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs cursor-pointer"
                      >
                        단계별 공식 연습하기
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between gap-3">
                    {/* 전체 단계 배지 목록 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400 font-semibold">
                          풀이 진행도 ({currentStepIdx + 1} / {flatSteps.length}
                          수)
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleFindSolution}
                          className="h-6 px-2 text-[11px] text-amber-400 hover:text-amber-300 hover:bg-neutral-800"
                        >
                          현재 상태 재분석
                        </Button>
                      </div>

                      {/* 진행 바 */}
                      <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                          style={{
                            width: `${Math.round(
                              ((currentStepIdx + 1) / flatSteps.length) * 100,
                            )}%`,
                          }}
                        />
                      </div>

                      {/* 활성 단계 탭 표시 */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {solution.stages.map((st, idx) => {
                          const isCurrent = currentFlatStep?.stageIndex === idx
                          const isDone =
                            currentFlatStep && currentFlatStep.stageIndex > idx
                          return (
                            <span
                              key={st.stageId}
                              className={`text-[11px] px-2 py-0.5 rounded-md font-bold border ${
                                isCurrent
                                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                                  : isDone
                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                    : "bg-neutral-950 text-neutral-500 border-neutral-800"
                              }`}
                            >
                              {isDone ? "✓ " : ""}
                              {st.stageNumber}단계
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    {/* 현재 단계 & 세부 스텝 상세 카드 */}
                    {currentFlatStep && (
                      <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
                        <div>
                          <div className="text-xs font-extrabold text-amber-400">
                            {currentFlatStep.stageTitle}
                          </div>
                          <div className="text-sm font-bold text-white mt-0.5">
                            {currentFlatStep.subStepTitle}
                          </div>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                            {currentFlatStep.subStepDescription}
                          </p>
                        </div>

                        {currentFlatStep.formulaName && (
                          <div className="bg-neutral-900/90 px-3 py-2 rounded-xl border border-neutral-800 flex items-center justify-between">
                            <span className="text-[11px] text-neutral-400 font-semibold">
                              적용 공식:
                            </span>
                            <code className="text-xs font-mono font-bold text-amber-300">
                              {currentFlatStep.formulaName}
                            </code>
                          </div>
                        )}

                        {/* 현재 세부 단계의 회전 기호 시퀀스 하이라이트 */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] text-neutral-400 font-semibold">
                            이번 세부 단계 회전 순서:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {currentFlatStep.subStepMoves.map((m, mIdx) => {
                              const isCurrentMove =
                                mIdx === currentFlatStep.moveInSubStepIndex
                              const isPastMove =
                                mIdx < currentFlatStep.moveInSubStepIndex
                              return (
                                <span
                                  key={`${m}-${mIdx}`}
                                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-extrabold border transition-all ${
                                    isCurrentMove
                                      ? "bg-amber-400 text-neutral-950 border-amber-300 scale-110 shadow-md"
                                      : isPastMove
                                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-700/40 line-through opacity-70"
                                        : "bg-neutral-900 text-neutral-300 border-neutral-800"
                                  }`}
                                >
                                  {m}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 재생 컨트롤러 */}
                    <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-3 space-y-2.5">
                      <div className="grid grid-cols-4 gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleStepBackward}
                          disabled={currentStepIdx <= 0 || !!activeMove}
                          className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs h-9 cursor-pointer"
                        >
                          ◀ 이전 수
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                          className={`text-xs font-extrabold h-9 cursor-pointer ${
                            isAutoPlaying
                              ? "bg-rose-500 hover:bg-rose-400 text-white"
                              : "bg-amber-500 hover:bg-amber-400 text-neutral-950"
                          }`}
                        >
                          {isAutoPlaying ? (
                            <>
                              <Pause size={14} className="mr-1" /> 일시정지
                            </>
                          ) : (
                            <>
                              <Play size={14} className="mr-1" /> 자동 재생
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleStepForward}
                          disabled={!!activeMove || isAutoPlaying}
                          className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs h-9 cursor-pointer"
                        >
                          다음 수 ▶
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleRunCurrentSubStep}
                          disabled={!!activeMove || isAutoPlaying}
                          title="현재 세부 단계의 회전들을 연속으로 실행합니다"
                          className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs h-9 cursor-pointer"
                        >
                          <FastForward size={14} className="mr-1" />
                          단계 실행
                        </Button>
                      </div>

                      {/* 재생 속도 조절 */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-0.5 px-1">
                        <span>애니메이션 속도:</span>
                        <div className="flex gap-1">
                          {[
                            { label: "느리게(학습용)", ms: 340 },
                            { label: "보통", ms: 200 },
                            { label: "빠르게", ms: 105 },
                          ].map((sp) => (
                            <button
                              key={sp.ms}
                              type="button"
                              onClick={() => setAnimSpeedMs(sp.ms)}
                              className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                                animSpeedMs === sp.ms
                                  ? "bg-amber-500/25 text-amber-300 border border-amber-500/40"
                                  : "bg-neutral-900 text-neutral-500 hover:text-neutral-300"
                              }`}
                            >
                              {sp.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 탭 2: 단계별 학습 아카데미 */}
            {rightTab === "academy" && (
              <div className="flex-1 flex flex-col gap-3">
                {/* 단계 선택 버튼 그리드 */}
                <div className="grid grid-cols-2 gap-1.5">
                  {STAGE_GUIDES.map((g) => {
                    const active = selectedAcademyStage === g.stageNumber
                    return (
                      <button
                        key={g.stageNumber}
                        type="button"
                        onClick={() => setSelectedAcademyStage(g.stageNumber)}
                        className={`px-2.5 py-2 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer flex items-center justify-between ${
                          active
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/60"
                            : "bg-neutral-950/70 text-neutral-400 border-neutral-800 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{g.shortTitle}</span>
                        {g.stageNumber === 8 && (
                          <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded">
                            방향큐브
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* 선택된 단계 상세 설명 & 연습/시연 버튼 */}
                {(() => {
                  const guide =
                    STAGE_GUIDES.find(
                      (g) => g.stageNumber === selectedAcademyStage,
                    ) || STAGE_GUIDES[0]
                  return (
                    <div className="flex-1 bg-neutral-950/90 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <div>
                          <span className="text-[11px] font-extrabold text-amber-400 uppercase">
                            STAGE {guide.stageNumber} OF 8
                          </span>
                          <h3 className="text-base font-extrabold text-white mt-0.5">
                            {guide.title}
                          </h3>
                        </div>

                        <div className="bg-neutral-900/90 p-3 rounded-xl border border-neutral-800 space-y-1">
                          <div className="text-[11px] font-bold text-neutral-400">
                            🎯 단계 목표
                          </div>
                          <p className="text-xs text-neutral-200 leading-relaxed">
                            {guide.goal}
                          </p>
                        </div>

                        <div className="bg-neutral-900/90 p-3 rounded-xl border border-neutral-800 flex items-center justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-bold text-neutral-400">
                              🔑 핵심 공식
                            </div>
                            <code className="text-sm font-mono font-extrabold text-amber-300">
                              {guide.keyFormula}
                            </code>
                          </div>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              handleDemonstrateFormula(guide.formulaMoves)
                            }
                            disabled={!!activeMove}
                            className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 text-xs h-8 shrink-0 cursor-pointer"
                          >
                            <SkipForward size={13} className="mr-1" />
                            공식 회전 시연
                          </Button>
                        </div>

                        <div className="space-y-1.5">
                          <div className="text-[11px] font-bold text-neutral-400">
                            💡 핵심 노하우 & 주의사항
                          </div>
                          <ul className="space-y-1.5">
                            {guide.tips.map((tip, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-800/60"
                              >
                                • {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <Button
                          onClick={() => {
                            handleLoadStagePractice(guide.stageNumber)
                          }}
                          className="flex-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs h-9 cursor-pointer"
                        >
                          <Sparkles size={14} className="mr-1.5" />이 단계 상황
                          불러와서 직접 연습하기
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            handleLoadStagePractice(guide.stageNumber)
                            setRightTab("solver")
                          }}
                          className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 text-xs h-9 cursor-pointer"
                        >
                          연습 상태 + 해법 열기
                        </Button>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* 탭 3: 2D 전개도 및 센터 방향 상태 */}
            {rightTab === "net" && (
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-3 flex flex-col items-center justify-center">
                  <CubeNetView
                    cubies={cubies}
                    cubeStyle={cubeStyle}
                    highlightedCubieIds={currentFlatStep?.targetCubieIds}
                    onRequestMove={handleUserMove}
                  />
                </div>

                {/* 6개 면 중심 조각 방향(0°, 90°, 180°, 270°) 상태 모니터 */}
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-300">
                      🧭 6면 중심(센터) 조각 방향 상태
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        checkOrientation
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {checkOrientation
                        ? "현재 모드: 센터 0° 일치 필수"
                        : "현재 모드: 센터 방향 무관"}
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    {ALL_FACES.map((face) => {
                      const rot = centerRotations[face]
                      const fColor = palette[face]
                      return (
                        <div
                          key={face}
                          className={`p-2 rounded-xl border text-center ${
                            rot === 0
                              ? "bg-neutral-900/70 border-neutral-800"
                              : "bg-amber-500/10 border-amber-500/40"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <span
                              className="w-2.5 h-2.5 rounded-xs inline-block"
                              style={{ backgroundColor: fColor.bg }}
                            />
                            <span className="text-xs font-extrabold text-white">
                              {face}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-mono font-bold ${
                              rot === 0 ? "text-emerald-400" : "text-amber-300"
                            }`}
                          >
                            {rot}°
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  )
}
