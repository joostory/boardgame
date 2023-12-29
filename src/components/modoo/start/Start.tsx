import { useState } from 'react'
import StartOptionsForm from '@/components/modoo/start/StartOptionsForm'
import Modal from '@/components/common/Modal'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import GameList from '@/components/modoo/game/GameList'


export default function Start() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <>
      <div className='hero'>
        <div className='hero-content'>
          <div className='text-center'>
            <img src='/modoo.png' className='w-full' />
            <h1 className='text-2xl'>모두의 마블 점수 계산기</h1>
            <div className='mt-10'>
              <button className='btn btn-primary btn-wide' onClick={() => setOpenModal(true)}>
                <RocketLaunchIcon className='h-6 w-6' /> 시작하기
              </button>
              <Modal
                title='새로운 게임 시작하기'
                subTitle='새로운 게임을 시작합니다. 시작 옵션을 정해주세요.'
                open={openModal} onClose={() => setOpenModal(false)}
              >
                <StartOptionsForm />
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <GameList />
    </>
  )
}
