import { useEffect, useMemo, useState } from "react"
import { memoryCardsAtom, revealedCardValuesAtom, selectedCardsAtom } from "@/atom/memory-atom"
import { MemoryCard } from "@/domain/memory"
import { cn } from "@/lib/utils"
import { useAtom } from "jotai"
import { nanoid } from "nanoid"
import { Button } from "@/components/ui/button"
import { RocketLaunchIcon } from "@heroicons/react/24/solid"
import { DateTime } from 'luxon'

const VALUES = "🐵🐶🦁🐏🐯🐱🐔🐻🐢🐧🦄🐘🐇🐸🐭🐮"

function FlipCard({item}: {item: MemoryCard}) {
  const [selectedCards, setSelectedCards] = useAtom(selectedCardsAtom)
  const [revealedValues, setRevealedValues] = useAtom(revealedCardValuesAtom)
  const selected = selectedCards.findIndex(it => it.id == item.id) >= 0
  const revealed = revealedValues.findIndex(it => it == item.value) >= 0


  function handleSelect() {
    if (selectedCards.length >= 2) {
      return
    }

    setSelectedCards([...selectedCards, item])
  }

  return (
    <div className={cn("rounded-md w-[120px] h-[160px] transition-all flip-card cursor-pointer", (selected || revealed) && "flip")} onClick={handleSelect}>
      <div className="flip-card-inner rounded-md">
        <div className="flip-card-back rounded-md flex items-center justify-center bg-neutral-800 shadow-md">
          <img src="/memory/memory_background.png" className="w-24 h-24" />
        </div>
        <div className={cn("flip-card-front rounded-md bg-neutral-600 shadow-md", revealed && "bg-blue-500")}>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl">
            {item.value}
          </span>
        </div>
      </div>
    </div>
  )
}

function Timer({startTime}: {startTime: DateTime}) {
  const [diff, setDiff] = useState("")

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(DateTime.now().diff(startTime).toFormat("hh:mm:ss"))
    }, 1000)

    setDiff(DateTime.now().diff(startTime).toFormat("hh:mm:ss"))

    return () => {
      clearInterval(id)
    }
  }, [startTime])

  return (
    <div className='flex flex-col justify-center m-2 items-center'>
      <div className="text-4xl">
        {diff}
      </div>
    </div>
  )
}

export default function MemoryGame() {
  const [cards, setCards] = useAtom(memoryCardsAtom)
  const [selectedCards, setSelectedCards] = useAtom(selectedCardsAtom)
  const [revealedValues, setRevealedValues] = useAtom(revealedCardValuesAtom)
  const [gameState, setGameState] = useState('READY')
  const [startTime, setStartTime] = useState<DateTime>()

  function resetGame() {
    let list: MemoryCard[] = []
    for (const it of VALUES) {
      list.push({
        id: nanoid(),
        value: it,
        revealed: false
      })
      list.push({
        id: nanoid(),
        value: it,
        revealed: false
      })
    }
    list.sort(() => Math.random() - 0.5)
    setCards(list)
    setRevealedValues([])
    setSelectedCards([])
  }

  function startGame() {
    resetGame()
    setGameState('STARTED')
    setStartTime(DateTime.now())
  }

  useEffect(() => {
    if (selectedCards.length < 2) {
      return
    }

    setTimeout(() => {
      if (selectedCards[0].value == selectedCards[1].value) {
        setRevealedValues([...revealedValues, selectedCards[0].value])
      }
      setSelectedCards([])
    }, 1000)
  }, [selectedCards])

  return (
    <div className="mt-5 mb-10 mx-auto">
      <div className="mb-10">
        <div className='flex gap-4 justify-center items-center mb-5'>
          <div>
            <img src='/memory/memory_icon.png' className='w-16' alt='모두의 마블' />
          </div>
          <h1 className='text-4xl'>
            메모리 게임
          </h1>
        </div>
        <div className='flex justify-center'>
          <Button size={'lg'} variant={'primary'} onClick={() => startGame()}>
            <RocketLaunchIcon className='h-5 w-5' /> 새로운 게임 시작하기
          </Button>
        </div>
      </div>

      {gameState == 'STARTED' &&
        <div>
          <div>
            <Timer startTime={startTime} />
          </div>
          <div className="flex flex-wrap gap-4 justify-center mx-5">
            {cards.map(it =>
              <FlipCard key={it.id} item={it} />
            )}
          </div>
        </div>
      }
    </div>

  )
}
