import { gameStartTimeAtom, gameStateAtom } from "@/atom/memory-atom"
import { useAtom, useAtomValue } from "jotai"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

export default function Timer() {
  const [diff, setDiff] = useState("")
  const [startTime, setStartTime] = useAtom(gameStartTimeAtom)
  const gameState = useAtomValue(gameStateAtom)

  useEffect(() => {
    let id = undefined
    if (gameState == 'STARTED') {
      if (!startTime) {
        return
      }

      id = setInterval(() => {
        setDiff(DateTime.now().diff(startTime).toFormat("hh:mm:ss"))
      }, 1000)

      setDiff(DateTime.now().diff(startTime).toFormat("hh:mm:ss"))
    }

    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [startTime, gameState])

  return (
    <div className="text-4xl items-center">
      {diff}
    </div>
  )
}
