import StartOptionsForm from '@/components/modoo/start/StartOptionsForm'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import GameList from '@/components/modoo/game/GameList'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'


export default function Start() {
  return (
    <div className='max-w-[640px] mx-auto'>
      <div className='text-center'>
        <div className='px-10'>
          <img src='/modoo.png' className='w-full' alt='모두의 마블' />
        </div>
        <h1 className='text-2xl'>모두의 마블 점수 계산기</h1>
        <div className='mt-10'>
          <Dialog>
            <DialogTrigger>
              <Button size={'lg'}>
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
        </div>
      </div>

      <GameList />
    </div>
  )
}
