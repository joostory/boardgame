import StartOptionsForm from '@/components/modoo/start/StartOptionsForm'
import { EllipsisVerticalIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import GameList from '@/components/modoo/game/GameList'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ChangeEvent, useRef, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { downlaodFile } from '@/lib/downloadFile'
import { useAtom } from 'jotai'
import { gameOptionAtom, gamesAtom } from '@/atom/modoo-atom'
import { getGame, setGame } from '@/storage/modoo-storage'
import { Input } from '@/components/ui/input'

function StartGameButton() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'xl'} variant={'primary'}>
          <RocketLaunchIcon className='h-6 w-6' /> 새로운 게임 시작하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새로운 게임 시작하기</DialogTitle>
          <DialogDescription>새로운 게임을 시작합니다. 시작 옵션을 정해주세요.</DialogDescription>
        </DialogHeader>

        <StartOptionsForm />
      </DialogContent>
    </Dialog>
  )
}

function StartMenuButton() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [games, setGames] = useAtom(gamesAtom)
  const [gameOption, setGameOption] = useAtom(gameOptionAtom)

  function handleExport() {
    const json = {
      "list": games,
      "option": gameOption,
      "games": games.map(it => getGame(it.id))
    }

    downlaodFile(JSON.stringify(json))
  }

  function handleImport(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (!e.target.files || e.target.files.length == 0) {
      return
    }

    if (!confirm("게임데이터 가져오기를 하면 이전데이터는 모두 삭제되고 가져온 데이터로 대체됩니다. 계속하시겠습니까?")) {
      return
    }

    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const json = JSON.parse(reader.result as string)
      setGameOption(json.option)
      setGames(json.list)
      json.games.forEach((it: any) => {
        setGame(it.id, it)
      })
    }
    reader.readAsText(file)

    e.target.value = ''
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size='xl' className='px-1'>
            <EllipsisVerticalIcon className='w-6 h-full' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleExport}>
            내보내기
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => inputRef.current?.click()}>
            가져오기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className='fixed top-[-100px]'>
        <Input
          type='file'
          ref={inputRef}
          onChange={handleImport}
        />
      </div>
    </>

  )
}

export default function Start() {
  return (
    <div className='max-w-[640px] mx-auto pb-20'>
      <div className='text-center'>
        <div className='px-10'>
          <img src='/modoo.png' className='w-full' alt='모두의 마블' />
        </div>
        <h1 className='text-2xl'>모두의 마블 점수 계산기</h1>
        <div className='mt-10 flex justify-center gap-1'>
          <StartGameButton />
          <StartMenuButton />
        </div>
      </div>

      <GameList />
    </div>
  )
}
