import { currentGameAtom } from "@/atom/modoo-atom"
import { toTimeFormat } from "@/utils/dateFormat"
import { toNumberFormat } from "@/utils/numberformat"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useAtomValue } from "jotai"

export default function GameHistories() {
  const currentGame = useAtomValue(currentGameAtom)
  if (!currentGame) {
    return <></>
  }

  return (
    <div className="my-10 mx-5">
      <ul className="px-4 w-full flex flex-col">
        {currentGame.histories.map((it, index) =>
          <li
            key={index}
            className="grid justify-center items-center flex-shrink-0"
            style={{
              fontSize: 12,
              gridTemplateRows: '10px 20px 10px 1fr',
              gridTemplateColumns: '20px 1fr'}
            }>
            <hr
              style={{height: 10, width: '0.25rem'}}
              className="col-start-1 row-start-1 justify-self-center"
            />
            <div className="col-start-2 row-start-2 p-1">
              {toTimeFormat(new Date(it.time))}
            </div>
            <div className="col-start-1 row-start-2">
              <CheckCircleIcon className="h-5 w-5" />
            </div>
            <div className="col-start-2 row-start-4 p-1">
              {it.fromName} -&gt; {it.toName} : <b className="text-success">{toNumberFormat(it.amount)}</b>
            </div>
            <hr
              style={{height: '100%', width: '0.25rem'}}
              className="col-start-1 row-start-3 row-end-5 justify-self-center"
            />
          </li>
        )}
      </ul>
    </div>
  )
}
