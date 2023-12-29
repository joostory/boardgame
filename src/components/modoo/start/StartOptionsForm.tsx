import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { currentGameState, gameOptionState } from '@/state/modoo-state'
import Form, { FormItem } from '@/components/common/Form'
import { FormEvent } from 'react'
import StartPlayersForm from '@/components/modoo/start/StartPlayersForm'
import StartMoneyForm from '@/components/modoo/start/StartMoneyForm'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { v4 as uuid } from 'uuid'


export default function StartOptionsForm() {
  const setCurrentGame = useSetRecoilState(currentGameState)
  const gameOption = useRecoilValue(gameOptionState)
  const resetGameOption = useResetRecoilState(gameOptionState)

  function handleFinish(e: FormEvent) {
    e.preventDefault()
    setCurrentGame({
      id: uuid(),
      started: new Date(),
      option: gameOption,
      players: gameOption.players.map(it => ({
        id: uuid(),
        money: gameOption.money,
        name: it.name
      })),
      histories: []
    })
    resetGameOption()
  }

  return (
    <Form onSubmit={handleFinish}>
      <FormItem label='시작금액'>
        <StartMoneyForm />
      </FormItem>
      <FormItem label='참여자'>
        <StartPlayersForm />
      </FormItem>
      <FormItem>
        <button type='submit' className='btn btn-primary w-full'>
          <RocketLaunchIcon className='h-6 w-6' /> 시작하기
        </button>
      </FormItem>
    </Form>
  )
}
