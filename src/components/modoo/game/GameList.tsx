import { ModooGameMeta, currentGameState, gamesState, getGame, removeGame } from "@/state/modoo-state"
import { useRecoilState, useSetRecoilState } from "recoil"
import { toDateTimeFormat } from "@/utils/dateFormat"
import { TrashIcon } from "@heroicons/react/24/solid"

export default function GameList() {
  const [games, setGames] = useRecoilState(gamesState)
  const setCurrentGame = useSetRecoilState(currentGameState)

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
      <ul className="divide-y divide-gray-800 w-full max-w-[640px] px-4 py-2 rounded-xl border border-gray-800">
        {games.map(it =>
          <li key={it.id} className="flex justify-between gap-x-6 py-6">
            <div className="flex min-w-0 w-full">
              <div className="min-w-0 flex-auto grow">
                <p className="text-xl font-semibold leading-6">
                  {toDateTimeFormat(new Date(it.started))} 에 시작한 게임
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
