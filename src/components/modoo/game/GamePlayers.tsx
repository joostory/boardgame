import { currentGameAtom } from "@/atom/modoo-atom"
import { ReceiveButton, SendButton } from "@/components/modoo/game/GameActionButton"
import { ModooGameStatus, ModooPlayer } from "@/domain/modoo"
import { toNumberFormat } from "@/utils/numberformat"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { useAtomValue } from "jotai"

function PlayerItem({player}: {player: ModooPlayer}) {
  const currentGame = useAtomValue(currentGameAtom)

  if (!currentGame) {
    return <></>
  }

  return (
    <div className="flex min-w-0 gap-x-4 w-full">
      <div className="min-w-0 flex-auto grow">
        <div className="flex w-full gap-x-2">
          {currentGame.topPlayerId == player.id &&
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
      {currentGame.status != ModooGameStatus.ENDED &&
        <div className="shrink-0 flex flex-row items-center gap-x-1">
          <SendButton player={player} />
          <ReceiveButton player={player} />
        </div>
      }
    </div>
  )
}

export default function GamePlayers() {
  const currentGame = useAtomValue(currentGameAtom)
  if (!currentGame) {
    return <></>
  }

  return (
    <div className="flex justify-center items-center my-5 mx-5">
      <ul className="divide-y w-full max-w-[640px] px-4 py-2 rounded-xl border">
        {currentGame.players.map(it =>
          <li key={it.id} className="flex justify-between gap-x-6 py-6">
            <PlayerItem player={it} />
          </li>
        )}
      </ul>
    </div>
  )
}
