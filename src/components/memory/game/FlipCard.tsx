import { revealedCardValuesAtom, selectedCardsAtom, selectedCountAtom } from "@/atom/memory-atom"
import { MemoryCard } from "@/domain/memory"
import { cn } from "@/lib/utils"
import { useAtom } from "jotai"

export default function FlipCard({item}: {item: MemoryCard}) {
  const [selectedCards, setSelectedCards] = useAtom(selectedCardsAtom)
  const [revealedValues, setRevealedValues] = useAtom(revealedCardValuesAtom)
  const [count, setCount] = useAtom(selectedCountAtom)
  const selected = selectedCards.findIndex(it => it.id == item.id) >= 0
  const revealed = revealedValues.findIndex(it => it == item.value) >= 0


  function handleSelect() {
    if (selectedCards.length >= 2) {
      return
    }

    if (selectedCards.length == 0) {
      setCount(count + 1)
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
