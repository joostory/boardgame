'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { isSolvable } from '../utils/solver'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import {
  RotateCcw,
  Undo2,
  Play,
  Volume2,
  VolumeX,
  Home,
  HelpCircle,
  Trophy,
  ArrowRight,
  Info
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'

// 1. 색상 정의 및 매핑
type ColorKey = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'pink' | 'teal' | 'indigo' | 'lime';

interface ColorStyle {
  bgClass: string;
  shadowClass: string;
  borderClass: string;
  label: string;
  gradient: string;
}

const COLORS: Record<ColorKey, ColorStyle> = {
  red: {
    bgClass: 'bg-red-600',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(220,38,38,0.4)]',
    borderClass: 'border-red-700',
    label: '빨강',
    gradient: 'from-red-500 to-red-700',
  },
  green: {
    bgClass: 'bg-green-600',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(22,163,74,0.4)]',
    borderClass: 'border-green-700',
    label: '초록',
    gradient: 'from-green-500 to-green-700',
  },
  blue: {
    bgClass: 'bg-blue-600',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.4)]',
    borderClass: 'border-blue-700',
    label: '파랑',
    gradient: 'from-blue-500 to-blue-700',
  },
  yellow: {
    bgClass: 'bg-yellow-400',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(234,179,8,0.4)]',
    borderClass: 'border-yellow-500',
    label: '노랑',
    gradient: 'from-yellow-300 to-yellow-500',
  },
  purple: {
    bgClass: 'bg-purple-600',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(147,51,234,0.4)]',
    borderClass: 'border-purple-700',
    label: '보라',
    gradient: 'from-purple-400 to-purple-600',
  },
  orange: {
    bgClass: 'bg-orange-500',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(249,115,22,0.4)]',
    borderClass: 'border-orange-600',
    label: '주황',
    gradient: 'from-orange-400 to-orange-600',
  },
  pink: {
    bgClass: 'bg-pink-400',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(244,114,182,0.4)]',
    borderClass: 'border-pink-500',
    label: '분홍',
    gradient: 'from-pink-300 to-pink-500',
  },
  teal: {
    bgClass: 'bg-cyan-500',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(6,182,212,0.4)]',
    borderClass: 'border-cyan-600',
    label: '민트',
    gradient: 'from-cyan-400 to-cyan-600',
  },
  indigo: {
    bgClass: 'bg-indigo-800',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_10px_rgba(55,48,163,0.4)]',
    borderClass: 'border-indigo-900',
    label: '남색',
    gradient: 'from-indigo-700 to-indigo-900',
  },
  lime: {
    bgClass: 'bg-lime-400',
    shadowClass: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(163,230,53,0.4)]',
    borderClass: 'border-lime-500',
    label: '연두',
    gradient: 'from-lime-300 to-lime-500',
  },
};

const COLOR_KEYS = Object.keys(COLORS) as ColorKey[];

// 난이도별 설정
type Difficulty = 'easy' | 'normal' | 'hard' | 'expert';

interface DifficultyConfig {
  tubesCount: number;  // 전체 튜브 개수 (M)
  capacity: number;    // 튜브 높이 (N)
  colorsCount: number; // 사용할 색상 개수 (M - 2)
  label: string;
}

const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { tubesCount: 5, capacity: 3, colorsCount: 3, label: '쉬움 (Easy)' },
  normal: { tubesCount: 7, capacity: 4, colorsCount: 5, label: '보통 (Normal)' },
  hard: { tubesCount: 9, capacity: 4, colorsCount: 7, label: '어려움 (Hard)' },
  expert: { tubesCount: 11, capacity: 5, colorsCount: 9, label: '전문가 (Expert)' },
};

export default function BlockSortGame() {
  const { toast } = useToast()
  
  // 게임 설정 상태
  const [difficulty, setDifficulty] = useState<Difficulty>('normal')
  const [level, setLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem('block-sort-level-normal')
      return savedLevel ? parseInt(savedLevel, 10) : 1
    }
    return 1
  })
  
  // 게임 판 상태
  const [tubes, setTubes] = useState<string[][]>([])
  const [initialTubesState, setInitialTubesState] = useState<string[][]>([]) // 재시작용
  const [selectedTubeIndex, setSelectedTubeIndex] = useState<number | null>(null)
  
  // 보조 기능 상태
  const [history, setHistory] = useState<string[][][]>([]) // 되돌리기 스택
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [isWon, setIsWon] = useState<boolean>(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  // 애니메이션 제어 상태
  const [flyingBlock, setFlyingBlock] = useState<{
    color: string;
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null>(null)
  const [isFlying, setIsFlying] = useState<boolean>(false)
  const [animatingMove, setAnimatingMove] = useState<{ src: number; dest: number; color: string } | null>(null)

  // DOM 참조
  const boardRef = useRef<HTMLDivElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // 1. 소리 재생 기능 (AudioContext 기반 전자음 합성)
  const playSound = useCallback((type: 'select' | 'move' | 'win' | 'error') => {
    if (!soundEnabled) return

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      const now = ctx.currentTime

      if (type === 'select') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(300, now)
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08)
        osc.start(now)
        osc.stop(now + 0.08)
      } else if (type === 'move') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(400, now)
        osc.frequency.exponentialRampToValueAtTime(250, now + 0.15)
        gain.gain.setValueAtTime(0.15, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
        osc.start(now)
        osc.stop(now + 0.15)
      } else if (type === 'error') {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(150, now)
        osc.frequency.linearRampToValueAtTime(100, now + 0.25)
        gain.gain.setValueAtTime(0.15, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)
        osc.start(now)
        osc.stop(now + 0.25)
      } else if (type === 'win') {
        // 도-미-솔-도 아르페지오
        const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const oscSeq = ctx.createOscillator()
          const gainSeq = ctx.createGain()
          oscSeq.connect(gainSeq)
          gainSeq.connect(ctx.destination)
          oscSeq.type = 'sine'
          
          const noteStart = now + idx * 0.12
          const noteDuration = 0.3
          
          oscSeq.frequency.setValueAtTime(freq, noteStart)
          gainSeq.gain.setValueAtTime(0, noteStart)
          gainSeq.gain.linearRampToValueAtTime(0.1, noteStart + 0.05)
          gainSeq.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration)
          
          oscSeq.start(noteStart)
          oscSeq.stop(noteStart + noteDuration)
        })
      }
    } catch (e) {
      console.warn('Audio play failed:', e)
    }
  }, [soundEnabled])

  // 2. generatePuzzle 함수 정의 (diff와 lvl을 직접 파라미터로 받을 수 있게 함)
  const generatePuzzle = useCallback((diff: Difficulty = difficulty, lvl: number = level) => {
    setIsGenerating(true)
    const config = DIFFICULTY_CONFIGS[diff]
    const { tubesCount, capacity, colorsCount } = config

    // 사용할 색상들을 랜덤하게 픽
    const shuffledColors = [...COLOR_KEYS].sort(() => Math.random() - 0.5)
    const selectedColors = shuffledColors.slice(0, colorsCount)

    // 블록들의 대용량 목록 만들기 (각 색깔별 N개씩)
    const blocksPool: string[] = []
    selectedColors.forEach(color => {
      for (let i = 0; i < capacity; i++) {
        blocksPool.push(color)
      }
    })

    let attempts = 0
    let generatedTubes: string[][] = []
    let solved = false

    // Solvable할 때까지 루프
    while (!solved && attempts < 200) {
      attempts++
      // 블록 풀 섞기
      const shuffledBlocks = [...blocksPool].sort(() => Math.random() - 0.5)
      
      // 튜브 구성 (마지막 2개는 빈 튜브)
      generatedTubes = Array.from({ length: tubesCount }, () => [])
      
      for (let i = 0; i < colorsCount; i++) {
        generatedTubes[i] = shuffledBlocks.slice(i * capacity, (i + 1) * capacity)
      }
      // 나머지 2개 튜브는 빈 배열 그대로 둠

      // Solver 검증
      solved = isSolvable(generatedTubes, capacity)
    }

    setTubes(generatedTubes)
    setInitialTubesState(JSON.parse(JSON.stringify(generatedTubes)))
    setSelectedTubeIndex(null)
    setHistory([])
    setIsWon(false)
    setIsGenerating(false)
  }, [difficulty, level])

  // level이나 difficulty가 바뀔 때 퍼즐 재생성하는 useEffect 대신 최초 마운트 시 1회 퍼즐 생성
  useEffect(() => {
    queueMicrotask(() => {
      generatePuzzle(difficulty, level)
    })
  }, [])

  // 4. 튜브 클리어 여부 개별 검사
  const isTubeCompleteState = (tube: string[], capacity: number): boolean => {
    if (tube.length === 0) return true
    if (tube.length !== capacity) return false
    return tube.every(color => color === tube[0])
  }

  // 5. 전체 승리 조건 검사
  const checkVictory = useCallback((currentTubes: string[][]) => {
    const config = DIFFICULTY_CONFIGS[difficulty]
    const won = currentTubes.every(tube => 
      tube.length === 0 || isTubeCompleteState(tube, config.capacity)
    )
    if (won) {
      setIsWon(true)
      playSound('win')
      toast({
        title: "🎉 축하합니다!",
        description: `레벨 ${level} (${DIFFICULTY_CONFIGS[difficulty].label}) 클리어!`,
        duration: 3000,
      })
      // 다음 레벨 저장
      localStorage.setItem(`block-sort-level-${difficulty}`, String(level + 1))
    }
  }, [difficulty, level, playSound, toast])

  // 실제 블록 이동 비행 애니메이션 및 상태 반영 함수 (공통 사용)
  const executeMove = useCallback((srcIndex: number, destIndex: number, blockToMove: string) => {
    const boardEl = boardRef.current
    const srcEl = document.getElementById(`tube-wrapper-${srcIndex}`)
    const destEl = document.getElementById(`tube-wrapper-${destIndex}`)

    if (boardEl && srcEl && destEl) {
      const boardRect = boardEl.getBoundingClientRect()
      const srcRect = srcEl.getBoundingClientRect()
      const destRect = destEl.getBoundingClientRect()

      const tubeWidth = srcRect.width
      const blockWidth = 56 // sm:w-16 기준 대략적인 블록 넓이

      const startX = srcRect.left - boardRect.left + (tubeWidth - blockWidth) / 2
      const startY = srcRect.top - boardRect.top - 24

      const endX = destRect.left - boardRect.left + (tubeWidth - blockWidth) / 2
      const endY = destRect.top - boardRect.top - 24

      // 1) 비행 데이터 및 임시 숨김 설정
      setFlyingBlock({
        color: blockToMove,
        start: { x: startX, y: startY },
        end: { x: endX, y: endY }
      })
      setAnimatingMove({ src: srcIndex, dest: destIndex, color: blockToMove })
      setSelectedTubeIndex(null)
      playSound('move')

      // 2) 브라우저 렌더 큐에 맞춰 즉시 transition 시작
      setTimeout(() => {
        setIsFlying(true)
      }, 10)

      // 3) 300ms 비행 후 실제 튜브 상태 업데이트
      setTimeout(() => {
        setTubes(prevTubes => {
          const newTubes = prevTubes.map((tube, idx) => {
            if (idx === srcIndex) {
              return tube.slice(0, -1)
            }
            if (idx === destIndex) {
              return [...tube, blockToMove]
            }
            return tube
          })

          setHistory(prevHist => [...prevHist, JSON.parse(JSON.stringify(prevTubes))])
          
          // 승리 검사는 다음 틱에 수행
          setTimeout(() => checkVictory(newTubes), 10)

          return newTubes
        })

        // 상태 복구
        setFlyingBlock(null)
        setIsFlying(false)
        setAnimatingMove(null)
      }, 300)
    } else {
      // DOM을 못 찾았을 경우 Fallback
      setTubes(prevTubes => {
        const newTubes = prevTubes.map((tube, idx) => {
          if (idx === srcIndex) {
            return tube.slice(0, -1)
          }
          if (idx === destIndex) {
            return [...tube, blockToMove]
          }
          return tube
        })
        setHistory(prevHist => [...prevHist, JSON.parse(JSON.stringify(prevTubes))])
        setSelectedTubeIndex(null)
        playSound('move')
        setTimeout(() => checkVictory(newTubes), 10)
        return newTubes
      })
    }
  }, [playSound, checkVictory])

  // 6. 블록 선택 및 이동 핸들러
  const handleTubeClick = (index: number) => {
    if (isWon || isGenerating || flyingBlock) return

    const config = DIFFICULTY_CONFIGS[difficulty]
    const activeTube = tubes[index]

    // 1) 아무것도 선택하지 않은 상태 (첫 번째 터치)
    if (selectedTubeIndex === null) {
      if (activeTube.length === 0) {
        playSound('error')
        return // 빈 튜브 선택 불가
      }

      const blockToMove = activeTube[activeTube.length - 1]

      // 이동 가능한 적법한 대상 튜브 목록 탐색
      const candidates: { idx: number; type: 'same-pure' | 'same-dirty' | 'empty' }[] = []

      for (let i = 0; i < tubes.length; i++) {
        if (i === index) continue // 자기 자신 제외
        const targetTube = tubes[i]
        if (targetTube.length >= config.capacity) continue // 가득 찬 튜브 제외

        if (targetTube.length === 0) {
          candidates.push({ idx: i, type: 'empty' })
        } else if (targetTube[targetTube.length - 1] === blockToMove) {
          // 이미 튜브 안의 모든 색상이 blockToMove 와 동일한지 체크 (Pure)
          const isPure = targetTube.every(c => c === blockToMove)
          candidates.push({ idx: i, type: isPure ? 'same-pure' : 'same-dirty' })
        }
      }

      // 명확한 자동 목적지 판별
      let targetIndex: number | null = null

      if (candidates.length === 1) {
        // 후보가 단 한 군데뿐인 경우 -> 100% 명확한 이동
        targetIndex = candidates[0].idx
      } else if (candidates.length > 1) {
        // 후보가 여러 개 있을 때, 우선순위 규칙에 따른 유일한 명확지 체크
        const pures = candidates.filter(c => c.type === 'same-pure')
        const dirties = candidates.filter(c => c.type === 'same-dirty')
        const empties = candidates.filter(c => c.type === 'empty')

        if (pures.length === 1) {
          // '같은 색상만 채워져 있는 튜브'가 단 1개 있으면 거기가 우선순위 최상위
          targetIndex = pures[0].idx
        } else if (pures.length === 0 && dirties.length === 1) {
          // 그런 게 없고 '맨 위만 같은 색인 혼합 튜브'가 1개뿐이면 그리로 감
          targetIndex = dirties[0].idx
        } else if (pures.length === 0 && dirties.length === 0 && empties.length > 0) {
          // 다른 쌓인 곳은 없고 비어있는 튜브들만 존재할 경우 (개수가 1개이든 2개이든),
          // 어차피 대칭적이므로 첫 번째 빈 튜브로 자동 이동 실행!
          targetIndex = empties[0].idx
        }
      }

      if (targetIndex !== null) {
        // 명확한 목적지가 있으므로 클릭 한 번으로 자동 이동 실행!
        executeMove(index, targetIndex, blockToMove)
      } else {
        // 명확한 단일 목적지가 없으면 기존처럼 수동 선택 모드 유지
        setSelectedTubeIndex(index)
        playSound('select')
      }
    }
    // 2) 이미 하나의 튜브가 선택되어 있는 상태 (두 번째 터치 - 수동 이동)
    else {
      const srcIndex = selectedTubeIndex
      const srcTube = tubes[srcIndex]

      // 자기 자신을 다시 누른 경우: 선택 해제
      if (srcIndex === index) {
        setSelectedTubeIndex(null)
        playSound('select')
        return
      }

      const blockToMove = srcTube[srcTube.length - 1]
      const destTube = tubes[index]

      // 수동 이동 가능 조건 검사
      const canMove = 
        destTube.length < config.capacity &&
        (destTube.length === 0 || destTube[destTube.length - 1] === blockToMove)

      if (canMove) {
        executeMove(srcIndex, index, blockToMove)
      } else {
        // 이동 실패 시 선택을 대상 튜브로 넘기기
        if (destTube.length > 0) {
          setSelectedTubeIndex(index)
          playSound('select')
        } else {
          playSound('error')
        }
      }
    }
  }

  // 7. 한 수 무르기 (Undo)
  const handleUndo = () => {
    if (history.length === 0 || isWon || isGenerating) return
    const prevTubes = history[history.length - 1]
    setTubes(prevTubes)
    setHistory(prev => prev.slice(0, -1))
    setSelectedTubeIndex(null)
    playSound('move')
  }

  // 8. 레벨 강제 재시작 (Restart)
  const handleRestart = () => {
    if (isGenerating) return
    setTubes(JSON.parse(JSON.stringify(initialTubesState)))
    setSelectedTubeIndex(null)
    setHistory([])
    setIsWon(false)
    playSound('move')
  }

  // 9. 다음 레벨 진입
  const handleNextLevel = () => {
    const nextLvl = level + 1
    setLevel(nextLvl)
    localStorage.setItem(`block-sort-level-${difficulty}`, String(nextLvl))
    generatePuzzle(difficulty, nextLvl)
  }

  // 10. 이전 레벨 진입
  const handlePrevLevel = () => {
    if (level <= 1) return
    const prevLvl = level - 1
    setLevel(prevLvl)
    localStorage.setItem(`block-sort-level-${difficulty}`, String(prevLvl))
    generatePuzzle(difficulty, prevLvl)
  }

  // 11. 난이도 변경
  const handleDifficultyChange = (val: string) => {
    const nextDiff = val as Difficulty
    setDifficulty(nextDiff)
    const savedLevel = localStorage.getItem(`block-sort-level-${nextDiff}`)
    const nextLvl = savedLevel ? parseInt(savedLevel, 10) : 1
    setLevel(nextLvl)
    generatePuzzle(nextDiff, nextLvl)
  }

  // 개별 튜브 렌더링 헬퍼 함수
  const renderTube = (tubeIdx: number) => {
    const tube = tubes[tubeIdx]
    if (!tube) return null

    const config = DIFFICULTY_CONFIGS[difficulty]
    const isSelected = selectedTubeIndex === tubeIdx
    const isComplete = isTubeCompleteState(tube, config.capacity)
    const capacity = config.capacity

    // 튜브 높이에 따른 세로 길이 설정
    const tubeHeightPx = capacity === 3 ? 150 : capacity === 4 ? 200 : 250
    // padding(상하 8px)과 gap-y-1.5(6px * (capacity-1))을 뺀 나머지 공간에서 분할
    const gapTotal = (capacity - 1) * 6
    const blockHeightPx = Math.floor((tubeHeightPx - 8 - gapTotal) / capacity)

    return (
      <div
        key={tubeIdx}
        id={`tube-wrapper-${tubeIdx}`}
        className="flex flex-col items-center group relative cursor-pointer"
        onClick={() => handleTubeClick(tubeIdx)}
      >
        {/* 완성했을 때의 이펙트 */}
        {isComplete && tube.length > 0 && (
          <span className="absolute -top-7 text-yellow-400 animate-bounce z-10">
            <Trophy size={18} fill="currentColor" />
          </span>
        )}

        {/* 튜브 바디: 튜브 위가 뚫려있는 것처럼 보이기 위해 border-t-0 적용 */}
        <div
          style={{ height: `${tubeHeightPx}px` }}
          className={`w-14 sm:w-16 rounded-b-2xl border-x-2 border-b-2 border-t-0 relative flex flex-col-reverse gap-y-1.5 justify-start p-1 transition-all duration-300 ${
            isSelected
              ? 'border-amber-400 bg-neutral-700/50 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105 -translate-y-2'
              : isComplete && tube.length > 0
              ? 'border-emerald-400/80 bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
              : 'border-neutral-600 bg-neutral-800/40 hover:border-neutral-400 hover:bg-neutral-800/60'
          }`}
        >
          {/* 튜브 림 (상단 입구 타원 링): 3D 공간감을 위해 배치 */}
          <div
            className={`absolute -top-1.5 left-[-2px] right-[-2px] h-3.5 rounded-[50%] border-2 pointer-events-none z-10 transition-colors duration-300 ${
              isSelected
                ? 'border-amber-400 bg-transparent shadow-[0_-2px_6px_rgba(245,158,11,0.4)]'
                : isComplete && tube.length > 0
                ? 'border-emerald-400 bg-transparent'
                : 'border-neutral-600 bg-transparent'
            }`}
          />

          {/* 튜브 내부의 블록들 */}
          {Array.from({ length: capacity }).map((_, slotIdx) => {
            const blockColor = tube[slotIdx]
            if (!blockColor) return null

            // 맨 위의 블록이고, 현재 이 튜브가 선택되어 있다면 위로 살짝 튀어나옴
            const isTopBlock = slotIdx === tube.length - 1
            const shouldTranslate = isSelected && isTopBlock

            // 애니메이션 비행 중일 경우, 소스 튜브의 최상단 블록은 숨김 처리
            const isAnimatingSrc = animatingMove?.src === tubeIdx && isTopBlock

            const style = COLORS[blockColor as ColorKey]

            return (
              <div
                key={slotIdx}
                style={{
                  height: `${blockHeightPx}px`,
                  transform: shouldTranslate ? 'translateY(-24px)' : 'none',
                }}
                className={`w-full rounded-xl border transition-all duration-300 ease-out flex items-center justify-center text-[10px] font-bold ${
                  style.bgClass
                } ${style.borderClass} ${style.shadowClass} ${
                  shouldTranslate ? 'shadow-[0_8px_16px_rgba(0,0,0,0.5)] z-20 scale-105' : ''
                } ${
                  isAnimatingSrc ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100'
                }`}
              />
            )
          })}
        </div>

        {/* 튜브 하단 인덱스 라벨 */}
        <span className="mt-2 text-xs text-neutral-500 font-bold group-hover:text-neutral-300 transition-colors">
          {tubeIdx + 1}
        </span>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-amber-500 selection:text-neutral-900 flex flex-col items-center p-4 md:p-8">
      {/* 2. 상단 네비게이션 & 헤더 */}
      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200">
          <Home size={20} />
          <span className="hidden sm:inline text-sm font-medium">메뉴로 가기</span>
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 tracking-tight">
            블록 정렬 퍼즐
          </h1>
          <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 소리 토글 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </Button>

          {/* 도움말 모달 */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <HelpCircle size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-neutral-700 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Info className="text-amber-400" />
                  게임 규칙 안내
                </DialogTitle>
                <DialogDescription className="text-neutral-400 text-sm mt-1">
                  블록 정렬 퍼즐은 모든 블록을 색상별로 분류하여 정리하는 힐링 퍼즐 게임입니다.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-neutral-200 text-sm pt-4">
                <p>
                  1. 튜브를 선택(터치/클릭)한 뒤, 다른 튜브를 선택하면 가장 위에 위치한 블록이 이동합니다.
                </p>
                <p>
                  2. 블록은 **비어 있는 튜브** 또는 **가장 위의 블록과 색상이 동일한 튜브**로만 이동할 수 있습니다.
                </p>
                <p>
                  3. 각 튜브는 정해진 높이(난이도별 3~5개)만큼만 블록을 쌓을 수 있습니다.
                </p>
                <p>
                  4. 모든 튜브를 비우거나, **한 가지 색상의 블록으로 가득 채우면** 게임에서 승리합니다.
                </p>
                <div className="bg-neutral-900/50 p-3 rounded border border-neutral-700/50 flex flex-col gap-1.5 text-xs text-amber-300">
                  <span className="font-semibold text-neutral-300">💡 꿀팁:</span>
                  <span>- 목적지가 **명확하거나 단 한 곳인 경우** 블록 선택 시 자동으로 알아서 이동합니다!</span>
                  <span>- 잘못 움직였다면 **되돌리기(Undo)** 버튼을 눌러 이전 상태로 돌릴 수 있습니다.</span>
                  <span>- 도저히 풀 수 없을 때는 **재시작(Restart)**을 누르면 맵이 처음 상태로 복원됩니다.</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* 3. 컨트롤 패널 */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-800/60 backdrop-blur-md p-4 rounded-2xl border border-neutral-700/50 mb-8 shadow-2xl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">난이도</span>
            <Select value={difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-[140px] bg-neutral-900 border-neutral-700 text-white focus:ring-amber-500">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-700 text-white">
                {Object.entries(DIFFICULTY_CONFIGS).map(([key, config]) => (
                  <SelectItem key={key} value={key} className="focus:bg-neutral-800 focus:text-amber-400 cursor-pointer">
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-700/60">
            <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">레벨</span>
            <span className="text-amber-400 font-bold px-2">{level}</span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevLevel}
                disabled={level <= 1}
                className="h-6 w-6 text-neutral-400 hover:text-white p-0 hover:bg-neutral-800 disabled:opacity-30"
              >
                ◀
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextLevel}
                className="h-6 w-6 text-neutral-400 hover:text-white p-0 hover:bg-neutral-800"
              >
                ▶
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={handleUndo}
            disabled={history.length === 0 || isWon}
            variant="secondary"
            className="flex items-center gap-1 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 disabled:opacity-40 disabled:pointer-events-none text-white h-9 px-4 text-sm"
          >
            <Undo2 size={16} />
            <span>되돌리기 ({history.length})</span>
          </Button>

          <Button
            onClick={handleRestart}
            variant="secondary"
            className="flex items-center gap-1 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-white h-9 px-4 text-sm"
          >
            <RotateCcw size={16} />
            <span>다시 하기</span>
          </Button>

          <Button
            onClick={() => generatePuzzle()}
            variant="default"
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold h-9 px-4 text-sm"
          >
            <Play size={16} fill="currentColor" />
            <span>새 게임</span>
          </Button>
        </div>
      </div>

      {/* 4. 메인 게임 보드 */}
      <Card ref={boardRef} className="w-full max-w-4xl bg-neutral-800/30 backdrop-blur-md border border-neutral-800/80 shadow-3xl p-6 md:p-10 flex flex-col items-center justify-center min-h-[450px] relative rounded-3xl overflow-hidden">
        {/* 생성 중 오버레이 */}
        {isGenerating && (
          <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            <span className="text-neutral-300 font-semibold text-sm">해결 가능한 퍼즐 생성 중...</span>
          </div>
        )}

        {/* 튜브 렌더링 영역 - 2줄 균등 배치 */}
        <div className="flex flex-col gap-y-12 w-full items-center justify-center py-4">
          {/* 첫 번째 줄 (상단) */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 w-full">
            {Array.from({ length: Math.ceil(tubes.length / 2) }).map((_, i) =>
              renderTube(i)
            )}
          </div>
          {/* 두 번째 줄 (하단) */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 w-full">
            {Array.from({ length: Math.floor(tubes.length / 2) }).map((_, i) =>
              renderTube(Math.ceil(tubes.length / 2) + i)
            )}
          </div>
        </div>

        {/* 비행 중인 블록 렌더링 (이동 애니메이션) */}
        {flyingBlock && (
          <div
            style={{
              left: `${isFlying ? flyingBlock.end.x : flyingBlock.start.x}px`,
              top: `${isFlying ? flyingBlock.end.y : flyingBlock.start.y}px`,
              height: `${
                DIFFICULTY_CONFIGS[difficulty].capacity === 3 
                  ? Math.floor((150 - 8 - (3-1)*6)/3) 
                  : DIFFICULTY_CONFIGS[difficulty].capacity === 4 
                  ? Math.floor((200 - 8 - (4-1)*6)/4) 
                  : Math.floor((250 - 8 - (5-1)*6)/5)
              }px`,
              transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            className={`w-14 sm:w-16 rounded-xl border absolute z-50 flex items-center justify-center ${
              COLORS[flyingBlock.color as ColorKey].bgClass
            } ${COLORS[flyingBlock.color as ColorKey].borderClass} ${
              COLORS[flyingBlock.color as ColorKey].shadowClass
            }`}
          />
        )}

        {/* 승리 오버레이 모달 */}
        {isWon && (
          <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-6 p-6 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex p-4 rounded-full bg-amber-500/20 text-amber-400 animate-bounce mb-2">
                <Trophy size={48} fill="currentColor" />
              </div>
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                STAGE CLEARED!
              </h2>
              <p className="text-neutral-400 text-sm max-w-xs mx-auto">
                모든 블록을 완벽하게 정렬했습니다. 뛰어난 퍼즐 감각이시네요!
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="border-neutral-700 text-white bg-neutral-800 hover:bg-neutral-700"
              >
                다시 하기
              </Button>
              <Button
                onClick={handleNextLevel}
                className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold flex items-center gap-1"
              >
                <span>다음 레벨</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </main>
  )
}
