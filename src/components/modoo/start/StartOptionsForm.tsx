import { useRecoilState } from 'recoil'
import { gameStepState } from '@/state/modoo-state'
import Form, { FormItem } from '@/components/common/Form'
import { FormEvent } from 'react'
import StartPlayersForm from '@/components/modoo/start/StartPalyersForm'
import StartMoneyForm from '@/components/modoo/start/StartMoneyForm'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'


export default function StartOptionsForm({
  onFinish
}: {
  onFinish: {(): void}
}) {
  const [step, setStep] = useRecoilState(gameStepState)

  function handleFinish(e: FormEvent) {
    e.preventDefault()
    setStep('step2')
    onFinish()
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
