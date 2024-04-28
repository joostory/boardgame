import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { ReactNode } from "react"

export function Timeline({children}: {children: ReactNode}) {
  return (
    <div className="my-10 mx-5">
      <ul className="px-4 w-full flex flex-col">
        {children}
      </ul>
    </div>
  )
}

export function TimelineItem({
  title, children
}: {
  title: ReactNode,
  children: ReactNode
}) {
  return (
    <li
      className="grid justify-center items-center flex-shrink-0"
      style={{
        fontSize: 12,
        gridTemplateRows: '10px 20px 10px 1fr',
        gridTemplateColumns: '20px 1fr'}
      }>
      <hr
        style={{height: 10, width: '0.25rem'}}
        className="col-start-1 row-start-1 justify-self-center bg-black opacity-80"
      />
      <div className="col-start-2 row-start-2 p-1">
        {title}
      </div>
      <div className="col-start-1 row-start-2">
        <CheckCircleIcon className="h-5 w-5" />
      </div>
      <div className="col-start-2 row-start-4 p-1">
        {children}
      </div>
      <hr
        style={{height: '100%', width: '0.25rem'}}
        className="col-start-1 row-start-3 row-end-5 justify-self-center bg-black opacity-80"
      />
    </li>
  )
}
