import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ResetIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

function getRandomCubeValue() {
  return Math.round(Math.random() * 100) % 6 + 1
}

function Cube({value}: {value: number}) {
  const [showClass, setShowClass] = useState<string>(`show-${value}`)

  useEffect(() => {
    [...Array(12)].forEach((_, index) => {
      setTimeout(() => {
        setShowClass(`show-${getRandomCubeValue()}`)
      }, index * 300)
    })
    setTimeout(() => {
      setShowClass(`show-${value}`)
    }, 3600)

  }, [value])

  return (
    <div className="scene mx-auto my-10">
      <div className={cn("cube", showClass)}>
        <div className="cube__face cube__face--front">1</div>
        <div className="cube__face cube__face--back">2</div>
        <div className="cube__face cube__face--right">3</div>
        <div className="cube__face cube__face--left">4</div>
        <div className="cube__face cube__face--top">5</div>
        <div className="cube__face cube__face--bottom">6</div>
      </div>
    </div>
  )
}

function CubeSpace() {
  const [cubeNumber, setCubeNumber] = useState<number>(1)

  function handleReset() {
    setCubeNumber(getRandomCubeValue())
  }

  return (
    <>
      <Cube value={cubeNumber}/>

      <Button variant={'secondary'} onClick={handleReset}>
        <ResetIcon /> 다시 던지기
      </Button>
    </>
  )
}

export default function CubeButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={'secondary'} size='xs'>
            주사위
          </Button>
        </DialogTrigger>

        <DialogContent aria-description="" aria-describedby="">
          <DialogHeader>
            <DialogTitle>주사위 던지기</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <CubeSpace />
        </DialogContent>
      </Dialog>
    </>
  )
}
