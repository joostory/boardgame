import { toDateFormat, toTimeFormat } from "@/utils/dateFormat"
import { TrashIcon } from "@heroicons/react/24/solid"
import { ModooGameMeta } from "@/domain/modoo"
import { useAtom, useSetAtom } from "jotai"
import { currentGameAtom, gamesAtom } from "@/atom/modoo-atom"
import { getGame, removeGame } from "@/storage/modoo-storage"

export default function GameList() {
  const [games, setGames] = useAtom(gamesAtom)
  const setCurrentGame = useSetAtom(currentGameAtom)

  if (games.length == 0) {
    return <></>
  }

  function handleView(gameMeta: ModooGameMeta) {
    setCurrentGame(getGame(gameMeta.id))
  }

  function handleRemove(gameMeta: ModooGameMeta) {
    if (!confirm('게임기록을 제거하시겠습니까?')) {
      return
    }
    setGames([...games].filter(it => it.id != gameMeta.id))
    removeGame(gameMeta.id)
  }

  return (
    <div className="flex justify-center items-center my-5 mx-5">
      <ul className="w-full max-w-[640px]">
        {games.toReversed().map(it =>
          <li key={it.id} className="flex justify-between rounded-xl py-6 px-6 text-slate-400 transition-all shadow-lg hover:shadow-neutral-900 mb-4">
            <div className="flex min-w-0 w-full">
              <div className="min-w-0 flex-auto grow">
                <p className="text-xl font-semibold leading-6">
                  <span className="mr-1 text-3xl text-yellow-600">{toDateFormat(new Date(it.started))}</span>
                  <span className="text-sm mr-1 text-yellow-700">{toTimeFormat(new Date(it.started))}</span>
                  <span className="text-md">에 시작한 게임</span>
                </p>
              </div>
              <div className="shrink-0 flex flex-row items-center gap-x-2">
                <button className="btn btn-sm btn-info text-xs" onClick={() => handleView(it)}>
                  게임보기
                </button>
                <button className="btn btn-sm btn-error" onClick={() => handleRemove(it)}>
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
