import { currentGameAtom } from "@/atom/modoo-atom"
import { Timeline, TimelineItem } from "@/components/common/Timeline"
import { toTimeFormat } from "@/utils/dateFormat"
import { toNumberFormat } from "@/utils/numberformat"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useAtomValue } from "jotai"

function Amount({amount}: {amount: number}) {
  const className = amount > 0? "text-blue-400" : "text-red-400"
  return (
    <b className={className}>
      {toNumberFormat(amount)}
    </b>
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
          {it.fromName} -&gt; {it.toName} : <Amount amount={it.amount} />
        </TimelineItem>
      )}
    </Timeline>
  )
}
