import { PowerIcon } from '@heroicons/react/24/solid'
import GameHistories from "@/components/modoo/game/GameHistories"
import GamePlayers from "@/components/modoo/game/GamePlayers"
import { useResetAtom } from "jotai/utils"
import { currentGameAtom } from "@/atom/modoo-atom"
import { Button } from '@/components/ui/button'

export default function Game() {
  const resetCurrentGame = useResetAtom(currentGameAtom)

  return (
    <div className='max-w-[640px] mx-auto'>
      <div className='text-center'>
        <div className='px-10'>
          <img src='/modoo.png' className='w-full' alt='모두의 마블' />
        </div>
        <h1 className='text-2xl'>모두의 마블 점수 계산기</h1>
        <div className='mt-10'>
          <Button type='button' size={'xl'} variant={'primary'} onClick={resetCurrentGame}>
            <PowerIcon className="h-6 w-6" /> 게임 종료
          </Button>
        </div>
      </div>

      <GamePlayers />

      <GameHistories />
    </div>
  )
}
