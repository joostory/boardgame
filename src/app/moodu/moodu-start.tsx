import { CSSProperties, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { gameOptionsState, gameStepState } from '@/app/moodu/game-state'

function StartMoneyForm() {
  const [gameOptions, setGameOptions] = useRecoilState(gameOptionsState)
  return (
    <input
      className='input input-bordered input-sm'
      type='number'
      value={gameOptions.money}
      onChange={e => {
        setGameOptions({
          ...gameOptions,
          money: parseInt(e.target.value),
        })
      }}
    />
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
        <button className='btn btn-sm ml-1' onClick={handleAdd}>추가</button>
      </div>
      
      {gameOptions.players.map((it, index) =>
        <div key={index}>
          <input className='input input-bordered input-sm' value={it.name} onChange={e => handleChangeName(index, e.target.value)} />
          <button className='btn btn-sm ml-1' onClick={() => handleRemove(index)}>제거</button>
        </div>
      )}
    </div>
  )
}

function StartOptionsForm({
  onFinish
}: {
  onFinish: {(): void}
}) {
  const [step, setStep] = useRecoilState(gameStepState)

  function handleFinish() {
    setStep('step2')
    onFinish()
  }

  return (
    <>
      <div className='px-4 sm:px-0'>
        <h3 className='leading-7'>새로운 게임 시작하기</h3>
        <p className='mt-1 leading-6 text-sm text-gray-500'>새로운 게임을 시작합니다. 시작 옵션을 정해주세요.</p>
      </div>
      
      <div className='mt-6 border-t border-gray-900'>
        <dl className='divide-y divide-gray-900'>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-sm'>
            <dt className=''>시작금액</dt>
            <dd className='col-span-2 text-start'>
              <StartMoneyForm />
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-sm'>
            <dt className=''>참여자</dt>
            <dd className='col-span-2'>
              <StartPlayersForm />
            </dd>
          </div>

          <div className='px-4 py-6 text-sm'>
            <button className='btn btn-primary btn-wide' onClick={handleFinish}>시작하기</button>
          </div>
        </dl>
      </div>
    </>
  )
}

function StartModal({open, onClose}: {open: boolean, onClose: {(): void}}) {
  const modalStyle = useMemo<CSSProperties>(() => {
    if (!open) {
      return ({})
    }

    return ({
      opacity: 1,
      pointerEvents: 'auto'
    })
  }, [open])

  return (
    <dialog className='modal' style={modalStyle}>
      <div
        className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur'
        onClick={onClose}
      />
      <div className='modal-box'>
        <StartOptionsForm onFinish={() => onClose()} />
      </div>
    </dialog>
  )
}

export default function Start() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className='hero'>
      <div className='hero-content'>
        <div className='text-center'>
          <img src='/moodu.png' className='w-full' />
          <h1 className='text-2xl'>모두의 마블 점수 계산기</h1>
          <div className='mt-10'>
            <button className='btn btn-primary btn-wide' onClick={() => setOpenModal(true)}>
              시작하기
            </button>
            <StartModal
              open={openModal}
              onClose={() => setOpenModal(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}