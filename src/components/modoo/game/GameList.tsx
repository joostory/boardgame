import { toDateFormat, toTimeFormat } from "@/utils/dateFormat"
import { TrashIcon } from "@heroicons/react/24/solid"
import { ModooGameMeta } from "@/domain/modoo"
import { useAtom, useSetAtom } from "jotai"
import { currentGameAtom, gamesAtom } from "@/atom/modoo-atom"
import { getGame, removeGame } from "@/storage/modoo-storage"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "@/components/ui/alert-dialog"

function RemoveGameButton({onRemove}: {onRemove: {(): void}}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={'sm'} variant={'danger'}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          게임기록을 제거하시겠습니까?
        </AlertDialogTitle>
        <AlertDialogDescription>
          게임기록 제거는 되돌릴 수 없습니다.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction onClick={onRemove}>확인</AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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
    setGames([...games].filter(it => it.id != gameMeta.id))
    removeGame(gameMeta.id)
  }

  return (
    <div className="my-5 mx-5">
      <ul className="w-full">
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
                <Button size={'sm'} className="text-xs" variant={'secondary'} onClick={() => handleView(it)}>
                  게임보기
                </Button>
                <RemoveGameButton
                  onRemove={() => handleRemove(it)}
                />
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
