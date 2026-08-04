import { RocketLaunchIcon } from "@heroicons/react/24/solid"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { DateTime } from "luxon"
import { nanoid } from "nanoid"
import { useEffect } from "react"
import {
  gameStartTimeAtom,
  gameStateAtom,
  memoryCardsAtom,
  revealedCardValuesAtom,
  selectedCardsAtom,
  selectedCountAtom,
} from "@/atom/memory-atom"
import Counter from "@/components/memory/game/Counter"
import FlipCard from "@/components/memory/game/FlipCard"
import Timer from "@/components/memory/game/Timer"
import { Button } from "@/components/ui/button"
import type { MemoryCard } from "@/domain/memory"

const VALUES = "🐵🐶🦁🐏🐯🐱🐔🐻🐢🐧🦄🐘🐇🐸🐭🐮"

function GameContent() {
  const cards = useAtomValue(memoryCardsAtom)

  return (
    <div>
      <div className="flex justify-center items-center m-2 gap-5">
        <Timer />
        <Counter />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mx-5">
        {cards.map((it) => (
          <FlipCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  )
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function MemoryGame() {
  const setCards = useSetAtom(memoryCardsAtom)
  const [selectedCards, setSelectedCards] = useAtom(selectedCardsAtom)
  const [revealedValues, setRevealedValues] = useAtom(revealedCardValuesAtom)
  const setSelectedCount = useSetAtom(selectedCountAtom)
  const [gameState, setGameState] = useAtom(gameStateAtom)
  const [startTime, setStartTime] = useAtom(gameStartTimeAtom)

  function resetGame() {
    const list: MemoryCard[] = []
    for (const it of VALUES) {
      list.push({
        id: nanoid(),
        value: it,
        revealed: false,
      })
      list.push({
        id: nanoid(),
        value: it,
        revealed: false,
      })
    }
    // 피셔-예이츠 셔플 알고리즘을 사용하여 배열을 섞음
    const shuffledList = shuffleArray(list)
    setCards(shuffledList)
    setSelectedCount(0)
    setRevealedValues([])
    setSelectedCards([])
  }

  function startGame() {
    resetGame()
    setGameState("STARTED")
    setStartTime(DateTime.now())
  }

  useEffect(() => {
    if (revealedValues.length * 2 === VALUES.length) {
      setGameState("DONE")
    }
  }, [revealedValues, setGameState])

  useEffect(() => {
    if (selectedCards.length < 2) {
      return
    }

    setTimeout(() => {
      if (selectedCards[0].value === selectedCards[1].value) {
        setRevealedValues([...revealedValues, selectedCards[0].value])
      }
      setSelectedCards([])
    }, 1000)
  }, [selectedCards, setSelectedCards, setRevealedValues, revealedValues])

  return (
    <div className="mt-5 mb-10 mx-auto">
      <div className="mb-10">
        <div className="flex gap-4 justify-center items-center mb-5">
          <div>
            <img
              src="/memory/memory_icon.png"
              className="w-16"
              alt="모두의 마블"
            />
          </div>
          <h1 className="text-4xl">메모리 게임</h1>
        </div>
        <div className="flex justify-center">
          <Button size={"lg"} variant={"primary"} onClick={() => startGame()}>
            <RocketLaunchIcon className="h-5 w-5" /> 새로운 게임 시작하기
          </Button>
        </div>
      </div>

      {(gameState === "STARTED" || gameState === "DONE") && !!startTime && (
        <GameContent />
      )}
    </div>
  )
}
