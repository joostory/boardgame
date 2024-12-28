import { selectedCountAtom } from "@/atom/memory-atom"
import { useAtomValue } from "jotai"

export default function Counter() {
  const count = useAtomValue(selectedCountAtom)

  return (
    <div className="text-4xl">
      시도: {count}
    </div>
  )
}
