import { currentGameAtom } from "@/atom/modoo-atom"
import { Timeline, TimelineItem } from "@/components/common/Timeline"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ModooGameStatus, ModooHistory, getTopPlayer, updatePlayer } from "@/domain/modoo"
import { toTimeFormat } from "@/utils/dateFormat"
import { toNumberFormat } from "@/utils/numberformat"
import { ArrowUturnLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import { useAtom, useAtomValue } from "jotai"

function Amount({amount}: {amount: number}) {
  const className = amount > 0? "text-blue-400" : "text-red-400"
  return (
    <b className={className}>
      {toNumberFormat(amount)}
    </b>
  )
}

function HistoryRollbackButton({history}: {history: ModooHistory}) {
  const [currentGame, setCurrentGame] = useAtom(currentGameAtom)

  function handleRollback() {
    if (!currentGame) {
      return
    }

    console.log(`${history.toName} -> ${history.fromName} : ${history.amount}`)
    const updatedPlayers = [...currentGame.players]

    if (history.toId != 'bank') {
      updatePlayer(updatedPlayers, history.toId, -history.amount)
    }
    if (history.fromId != 'bank') {
      updatePlayer(updatedPlayers, history.fromId, history.amount)
    }

    const updatedHistories = [...currentGame.histories]
    updatedHistories.shift()

    const topPlayer = getTopPlayer(updatedPlayers)
    setCurrentGame({
      ...currentGame,
      players: updatedPlayers,
      histories: updatedHistories,
      topPlayerId: topPlayer.id
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ArrowUturnLeftIcon
          className="h-4 w-4 ml-1 cursor-pointer text-foreground/60 hover:text-primary"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          기록을 되돌리시겠습니까?
        </AlertDialogTitle>

        <AlertDialogFooter>
          <AlertDialogAction onClick={handleRollback}>확인</AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function GameHistories() {
  const currentGame = useAtomValue(currentGameAtom)
  if (!currentGame) {
    return <></>
  }

  return (
    <Timeline>
      {currentGame.histories.map((it, index) =>
        <TimelineItem key={index} title={toTimeFormat(new Date(it.time))}>
          <div className="flex gap-1">
            <span>{it.fromName} -&gt; {it.toName} :</span>
            <Amount amount={it.amount} />
            {currentGame.status != ModooGameStatus.ENDED && index == 0 &&
              <HistoryRollbackButton
                history={it}
              />
            }
          </div>
        </TimelineItem>
      )}
    </Timeline>
  )
}
