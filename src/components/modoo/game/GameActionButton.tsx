import Form, { FormItem } from "@/components/common/Form"
import Modal from "@/components/common/Modal"
import { MooduPlayer, gamePlayersState } from "@/state/modoo-state"
import { FormEvent, useState } from "react"
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil"
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

export function SendButton({player}: {player: MooduPlayer}) {
  const [open, setOpen] = useState<boolean>(false)
  const [money, setMoney] = useState('300000')
  const [selectedPlayerId, setSelectedPlayerId] = useState('bank')
  const [players, setPlayers] = useRecoilState(gamePlayersState)

  const sendMoney = useRecoilCallback(({snapshot}) => async (to: string, money: number) => {

    function updatePlayer(updatedPlayers: MooduPlayer[], id: string, money: number) {
      const index = updatedPlayers.findIndex(it => it.id == id)
      const updatedPlayer = players[index]

      updatedPlayers.splice(index, 1, {
        ...updatedPlayer,
        money: updatedPlayer.money + money
      })
    }

    const updatedPlayers = [...await snapshot.getPromise(gamePlayersState)]
    updatePlayer(updatedPlayers, player.id, -money)
    if (to != 'bank') {
      updatePlayer(updatedPlayers, to, money)
    }

    setPlayers(updatedPlayers)
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    sendMoney(selectedPlayerId, parseInt(money))
      .then(() => {
        console.log('done')
        setOpen(false)
      })
  }

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={() => setOpen(true)}>
        <ArrowRightOnRectangleIcon className="w-6 h-6" />
      </button>
      {open &&
        <Modal
          title={`${player.name} : 돈 보내기`}
          open={open} onClose={() => setOpen(false)}
        >
          <Form onSubmit={handleSubmit}>
            <FormItem label='보낼 곳'>
              <select
                className="select select-bordered w-full"
                value={selectedPlayerId} onChange={e => setSelectedPlayerId(e.target.value)}
              >
                <option value='bank'>은행</option>
                {players
                  .filter(it => it.id != player.id)
                  .map(it =>
                    <option key={it.id} value={it.id}>{it.name}</option>
                  )
                }
              </select>
            </FormItem>
            <FormItem label="금액">
              <div className="join">
                <input
                  type='number' className="input input-bordered join-item w-full"
                  value={money} onChange={e => setMoney(e.target.value)}
                />
                <div className="join-item flex justify-center items-center w-14 bg-base-300">
                  원
                </div>
              </div>
            </FormItem>
            <FormItem>
              <button type='submit' className="btn btn-primary w-full">
                <ArrowRightOnRectangleIcon className="w-6 h-6" /> 보내기
              </button>
            </FormItem>
          </Form>
        </Modal>
      }
    </>
  )
}

export function ReceiveButton({player}: {player: MooduPlayer}) {
  const [open, setOpen] = useState<boolean>(false)
  const [money, setMoney] = useState('300000')
  const setPlayers = useSetRecoilState(gamePlayersState)

  const updateMoney = useRecoilCallback(({snapshot}) => async () => {
    const players = await snapshot.getPromise(gamePlayersState)
    const index = players.findIndex(it => it.id == player.id)
    const updatedPlayers = [...players]
    updatedPlayers.splice(index, 1, {
      ...players[index],
      money: players[index].money + parseInt(money)
    })
    setPlayers(updatedPlayers)
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateMoney()
    setOpen(false)
  }

  return (
    <>
      <button className="btn btn-sm btn-accent" onClick={() => setOpen(true)}>
        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
      </button>

      {open &&
        <Modal
          title={`${player.name} : 은행에서 돈 받기`}
          open={open} onClose={() => setOpen(false)}
        >
          <Form onSubmit={handleSubmit}>
            <FormItem label="금액">
              <div className="join">
                <input
                  type='number' className="input input-bordered join-item w-full"
                  value={money} onChange={e => setMoney(e.target.value)}
                />
                <div className="join-item flex justify-center items-center w-14 bg-base-300">
                  원
                </div>
              </div>
            </FormItem>
            <FormItem>
              <button type='submit' className="btn btn-primary w-full">
                <ArrowLeftOnRectangleIcon className="w-6 h-6" /> 받기
              </button>
            </FormItem>
          </Form>
        </Modal>
      }
    </>
  )
}
