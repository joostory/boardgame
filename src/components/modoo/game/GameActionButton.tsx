import Form, { FormItem } from "@/components/common/Form"
import Modal from "@/components/common/Modal"
import { MooduPlayer, gameHistoriesState, gamePlayersState } from "@/state/modoo-state"
import { FormEvent, useState } from "react"
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil"
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

export function SendButton({player}: {player: MooduPlayer}) {
  const [open, setOpen] = useState<boolean>(false)
  const [money, setMoney] = useState('300000')
  const [selectedPlayerId, setSelectedPlayerId] = useState('bank')
  const [players, setPlayers] = useRecoilState(gamePlayersState)
  const setHistories = useSetRecoilState(gameHistoriesState)

  const sendMoney = useRecoilCallback(({snapshot}) => async (to: string, money: number) => {

    function updatePlayer(updatedPlayers: MooduPlayer[], id: string, money: number): MooduPlayer {
      const index = updatedPlayers.findIndex(it => it.id == id)
      const updatedPlayer = players[index]

      updatedPlayers.splice(index, 1, {
        ...updatedPlayer,
        money: updatedPlayer.money + money
      })
      return updatedPlayer
    }

    const updatedPlayers = [...await snapshot.getPromise(gamePlayersState)]
    updatePlayer(updatedPlayers, player.id, -money)
    let toName
    if (to != 'bank') {
      toName = updatePlayer(updatedPlayers, to, money).name
    } else {
      toName = '은행'
    }
    setPlayers(updatedPlayers)

    const histories = await snapshot.getPromise(gameHistoriesState)
    setHistories([
      {
        fromId: player.id,
        fromName: player.name,
        toId: to,
        toName: toName,
        amount: money,
        time: new Date()
      },
      ...histories
    ])
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
      <ArrowRightOnRectangleIcon
        className="w-8 h-8 p-1 text-primary"
        onClick={() => setOpen(true)}
      />
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
  const setHistories = useSetRecoilState(gameHistoriesState)

  const updateMoney = useRecoilCallback(({snapshot}) => async () => {
    const players = await snapshot.getPromise(gamePlayersState)
    const index = players.findIndex(it => it.id == player.id)
    const targetPlayer = players[index]
    const updatedPlayers = [...players]
    const numberMoney = parseInt(money)
    updatedPlayers.splice(index, 1, {
      ...targetPlayer,
      money: targetPlayer.money + numberMoney
    })
    setPlayers(updatedPlayers)

    const histories = await snapshot.getPromise(gameHistoriesState)
    setHistories([
      {
        fromId: 'bank',
        fromName: '은행',
        toId: player.id,
        toName: player.name,
        amount: numberMoney,
        time: new Date()
      },
      ...histories
    ])
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateMoney()
    setOpen(false)
  }

  return (
    <>
      <ArrowLeftOnRectangleIcon
        className="w-8 h-8 p-1 text-accent"
        onClick={() => setOpen(true)}
      />

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
