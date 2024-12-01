import { currentGameAtom } from "@/atom/modoo-atom"
import Form, { FormItem } from "@/components/common/Form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ModooGameStatus } from "@/domain/modoo"
import { setGame } from "@/storage/modoo-storage"
import { ChevronLeftIcon, PowerIcon, SparklesIcon } from "@heroicons/react/24/solid"
import { useAtom, useAtomValue } from "jotai"
import { useResetAtom } from "jotai/utils"
import { FormEvent, useState } from "react"


function GameEndButton() {
  const [open, setOpen] = useState<boolean>(false)
  const resetCurrentGame = useResetAtom(currentGameAtom)
  const currentGame = useAtomValue(currentGameAtom)
  const [topPlayerId, setTopPlayerId] = useState<string | undefined>(currentGame?.topPlayerId)
  const [message, setMessage] = useState<string>("")

  if (!currentGame) {
    return <></>
  }

  function handleOpenChange(v: boolean) {
    setOpen(v)
    setTopPlayerId(currentGame?.topPlayerId)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setOpen(false)
    setGame(currentGame!!.id, {
      ...currentGame!!,
      status: ModooGameStatus.ENDED,
      topPlayerId: topPlayerId!!,
      message: message,
    })
    resetCurrentGame()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type='button' size={'xl'} variant={'primary'}>
          <PowerIcon className="h-6 w-6" /> 게임 종료
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게임을 종료하시겠습니까?</DialogTitle>
        </DialogHeader>

        <Form onSubmit={handleSubmit}>
          <FormItem label="승리">
            <Select value={topPlayerId} onValueChange={v => setTopPlayerId(v)}>
              <SelectTrigger>
                <SelectValue placeholder='승리한 참여자' />
              </SelectTrigger>
              <SelectContent>
                {currentGame && currentGame.players
                  .map(it =>
                    <SelectItem key={it.id} value={it.id}>{it.name}</SelectItem>
                  )
                }
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem label="설명">
            <Textarea
              placeholder="게임에 대해서 설명을 남겨보세요."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <Button type='submit' size={'xl'} variant={'primary'} className="w-full" disabled={topPlayerId == undefined}>
              <PowerIcon className="h-6 w-6" /> 게임 종료
            </Button>
          </FormItem>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function GameHeaderButton() {
  const resetCurrentGame = useResetAtom(currentGameAtom)
  const currentGame = useAtomValue(currentGameAtom)

  if (currentGame && currentGame.status == ModooGameStatus.ENDED) {
    return (
      <Button type='button' size={'xl'} variant={'primary'} onClick={resetCurrentGame}>
        <ChevronLeftIcon className="h-6 w-6" /> 처음으로
      </Button>
    )
  } else {
    return (
      <GameEndButton />
    )
  }
}

function GameMessage() {
  const currentGame = useAtomValue(currentGameAtom)

  if (!currentGame || currentGame.status != ModooGameStatus.ENDED || !currentGame.message) {
    return <></>
  }

  return (
    <Alert>
      <SparklesIcon className="h-4 w-4 text-red-400" />
      <AlertTitle>종료된 게임입니다</AlertTitle>
      <AlertDescription>{currentGame.message}</AlertDescription>
    </Alert>
  )
}

export default function GameHeader() {
  return (
    <div className="mx-5 mb-10">
      <div className='flex flex-col items-center'>
        <div className='px-10'>
          <img src='/modoo/modoo.png' className='w-full' alt='모두의 마블' />
        </div>
        <h1 className='text-2xl mt-2'>
          모두의 마블 점수 계산기
        </h1>
      </div>

      <div className="my-5 flex flex-col items-center">
        <GameHeaderButton />
      </div>

      <GameMessage />
    </div>
  )
}
