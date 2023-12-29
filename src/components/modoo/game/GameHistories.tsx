import { currentGameState } from "@/state/modoo-state"
import { toTimeFormat } from "@/utils/dateFormat"
import { toNumberFormat } from "@/utils/numberformat"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useRecoilValue } from "recoil"

export default function GameHistories() {
  const currentGame = useRecoilValue(currentGameState)

  return (
    <div className="flex justify-center my-10 mx-5">
      <ul className="timeline timeline-vertical timeline-compact px-4 w-full max-w-[640px]">
        {currentGame.histories.map((it, index) =>
          <li key={index} style={{fontSize: 12}}>
            <hr style={{height: 10}} />
            <div className="timeline-start">
              {toTimeFormat(new Date(it.time))}
            </div>
            <div className="timeline-middle">
              <CheckCircleIcon className="h-5 w-5" />
            </div>
            <div className="timeline-end ">
              {it.fromName} -&gt; {it.toName} : <b className="text-success">{toNumberFormat(it.amount)}</b>
            </div>
            <hr />
          </li>
        )}
      </ul>
    </div>
  )
}
