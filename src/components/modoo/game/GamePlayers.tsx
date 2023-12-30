import { ReceiveButton, SendButton } from "@/components/modoo/game/GameActionButton"
import { ModooPlayer, currentGameState } from "@/state/modoo-state"
import { toNumberFormat } from "@/utils/numberformat"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

function PlayerItem({player}: {player: ModooPlayer}) {
  const currentGame = useRecoilValue(currentGameState)
  const isWinner = useMemo(() => {
    const sorted = [...currentGame.players].sort((a, b) => b.money - a.money)
    const winner = sorted[0]
    const looser = sorted[sorted.length - 1]
    return player.money == winner.money && player.money > looser.money
  }, [currentGame, player])

  return (
    <div className="flex min-w-0 gap-x-4 w-full">
      <div className="min-w-0 flex-auto grow">
        <div className="flex w-full gap-x-2">
          {isWinner &&
            <SparklesIcon className="h-5 w-5 text-red-400" />
          }
          <p className="text-xl font-semibold leading-6">
            {player.name}
          </p>
        </div>
        <p className="mt-2 truncate text-3xl leading-8 text-yellow-100">
          {toNumberFormat(player.money)}
        </p>
      </div>
      <div className="shrink-0 flex flex-row items-center gap-x-1">
        <SendButton player={player} />
        <ReceiveButton player={player} />
      </div>
    </div>
  )
}

export default function GamePlayers() {
  const currentGame = useRecoilValue(currentGameState)

  return (
    <div className="flex justify-center items-center my-5 mx-5">
      <ul className="divide-y divide-gray-800 w-full max-w-[640px] px-4 py-2 rounded-xl border border-gray-800">
        {currentGame.players.map(it =>
          <li key={it.id} className="flex justify-between gap-x-6 py-6">
            <PlayerItem player={it} />
          </li>
        )}
      </ul>
    </div>
  )
}
