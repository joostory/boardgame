import Form, { FormItem } from '@/components/common/Form'
import { FormEvent } from 'react'
import StartPlayersForm from '@/components/modoo/start/StartPlayersForm'
import StartMoneyForm from '@/components/modoo/start/StartMoneyForm'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { v4 as uuid } from 'uuid'
import { useAtomValue, useSetAtom } from 'jotai'
import { currentGameAtom, gameOptionAtom } from '@/atom/modoo-atom'
import { Button } from '@/components/ui/button'


export default function StartOptionsForm() {
  const setCurrentGame = useSetAtom(currentGameAtom)
  const gameOption = useAtomValue(gameOptionAtom)

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
        <Button type='submit' className='w-full'>
          <RocketLaunchIcon className='h-6 w-6' /> 시작하기
        </Button>
      </FormItem>
    </Form>
  )
}
