import { useAtom, useAtomValue } from "jotai"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { gameStartTimeAtom, gameStateAtom } from "@/atom/memory-atom"

export default function Timer() {
  const [diff, setDiff] = useState("")
  const [startTime, _setStartTime] = useAtom(gameStartTimeAtom)
  const gameState = useAtomValue(gameStateAtom)

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined
    if (gameState === "STARTED") {
      if (!startTime) {
        return
      }

      id = setInterval(() => {
        setDiff(DateTime.now().diff(startTime).toFormat("hh:mm:ss"))
      }, 1000)

      queueMicrotask(() => {
        setDiff(DateTime.now().diff(startTime).toFormat("hh:mm:ss"))
      })
    }

    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [startTime, gameState])

  return <div className="text-4xl items-center">{diff}</div>
}
