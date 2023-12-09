import { useRecoilState } from 'recoil'
import { gameOptionsState, gameStepState } from '@/app/state/game-state'
import Modal from '@/app/components/common/Modal'
import Form, { FormItem } from '@/app/components/common/Form'
import { FormEvent } from 'react'


function StartMoneyForm() {
  const [gameOptions, setGameOptions] = useRecoilState(gameOptionsState)
  return (
    <div className='join'>
      <input
        className='input input-bordered join-item w-full'
        type='number'
        value={gameOptions.money}
        onChange={e => {
          setGameOptions({
            ...gameOptions,
            money: parseInt(e.target.value),
          })
        }}
      />
      <div className='join-item flex justify-center items-center w-14 bg-slate-900'>원</div>
    </div>
  )
}

function StartPlayersForm() {
  const [gameOptions, setGameOptions] = useRecoilState(gameOptionsState)

  function handleAdd() {
    setGameOptions({
      ...gameOptions,
      players: [
        ...gameOptions.players,
        {name: `참여자 ${gameOptions.players.length + 1}`}
      ]
    })
  }

  function handleChangeName(index: number, value: string) {
    const newPlayers = [...gameOptions.players]
    newPlayers.splice(index, 1, {name: value})
    setGameOptions({
      ...gameOptions,
      players: newPlayers
    })
  }

  function handleRemove(index: number) {
    const newPlayers = [...gameOptions.players]
    newPlayers.splice(index, 1)
    setGameOptions({
      ...gameOptions,
      players: newPlayers
    })
  }

  return (
    <div className='text-start grid gap-4'>
      <div>
        <span>{gameOptions.players.length} 명</span>
        <button type='button' className='btn btn-sm ml-1' onClick={handleAdd}>추가</button>
      </div>

      {gameOptions.players.map((it, index) =>
        <div key={index}>
          <input className='input input-bordered input-sm' value={it.name} onChange={e => handleChangeName(index, e.target.value)} />
          <button type='button' className='btn btn-sm ml-1' onClick={() => handleRemove(index)}>제거</button>
        </div>
      )}
    </div>
  )
}

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
        <button type='submit' className='btn btn-primary btn-wide'>시작하기</button>
      </FormItem>
    </Form>
  )
}
