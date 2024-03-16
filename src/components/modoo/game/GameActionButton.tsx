import Form, { FormItem } from "@/components/common/Form"
import Modal from "@/components/common/Modal"
import { FormEvent, useCallback, useState } from "react"
import { ArrowRightEndOnRectangleIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import MoneyInput from "@/components/common/MoneyInput"
import { ModooPlayer } from "@/domain/modoo"
import { useAtom, useAtomValue } from "jotai"
import { currentGameAtom } from "@/atom/modoo-atom"
import { useAtomCallback } from "jotai/utils"

export function SendButton({player}: {player: ModooPlayer}) {
  const [open, setOpen] = useState<boolean>(false)
  const [money, setMoney] = useState(300000)
  const [selectedPlayerId, setSelectedPlayerId] = useState('bank')
  const currentGame = useAtomValue(currentGameAtom)

  const sendMoney = useAtomCallback(
    useCallback((get, set, to: string, money: number) => {
      function updatePlayer(players: ModooPlayer[], id: string, money: number): ModooPlayer {
        const index = players.findIndex(it => it.id == id)
        const updatedPlayer = players[index]

        players.splice(index, 1, {
          ...updatedPlayer,
          money: updatedPlayer.money + money
        })
        return updatedPlayer
      }

      const currentGame = get(currentGameAtom)
      if (!currentGame) {
        console.log("NO currentGame")
        return
      }

      const updatedPlayers = [...currentGame.players]
      updatePlayer(updatedPlayers, player.id, -money)
      let toName
      if (to != 'bank') {
        toName = updatePlayer(updatedPlayers, to, money).name
      } else {
        toName = '은행'
      }
      const updatedHistories = [
        {
          fromId: player.id,
          fromName: player.name,
          toId: to,
          toName: toName,
          amount: money,
          time: new Date()
        },
        ...currentGame.histories
      ]

      set(currentGameAtom, {
        ...currentGame,
        players: updatedPlayers,
        histories: updatedHistories
      })
    }, [currentGame])
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    sendMoney(selectedPlayerId, money)
    setOpen(false)
  }

  return (
    <>
      <ArrowRightEndOnRectangleIcon
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
                {currentGame && currentGame.players
                  .filter(it => it.id != player.id)
                  .map(it =>
                    <option key={it.id} value={it.id}>{it.name}</option>
                  )
                }
              </select>
            </FormItem>
            <FormItem label="금액">
              <MoneyInput
                value={money}
                onChange={setMoney}
              />
            </FormItem>
            <FormItem>
              <button type='submit' className="btn btn-primary w-full">
                <ArrowRightEndOnRectangleIcon className="w-6 h-6" /> 보내기
              </button>
            </FormItem>
          </Form>
        </Modal>
      }
    </>
  )
}

export function ReceiveButton({player}: {player: ModooPlayer}) {
  const [open, setOpen] = useState<boolean>(false)
  const [money, setMoney] = useState(300000)
  const currentGame = useAtomValue(currentGameAtom)

  const updateMoney = useAtomCallback(
    useCallback((get, set) => {
      const currentGame = get(currentGameAtom)
      if (!currentGame) {
        console.log("NO currentGame")
        return
      }

      const players = currentGame.players
      const index = players.findIndex(it => it.id == player.id)
      const targetPlayer = players[index]
      const updatedPlayers = [...players]
      updatedPlayers.splice(index, 1, {
        ...targetPlayer,
        money: targetPlayer.money + money
      })
      const histories = [
        {
          fromId: 'bank',
          fromName: '은행',
          toId: player.id,
          toName: player.name,
          amount: money,
          time: new Date()
        },
        ...currentGame.histories
      ]

      set(currentGameAtom, {
        ...currentGame,
        players: updatedPlayers,
        histories: histories
      })
    }, [currentGame])
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateMoney()
    setOpen(false)
  }

  return (
    <>
      <ArrowLeftEndOnRectangleIcon
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
              <MoneyInput
                value={money}
                onChange={setMoney}
              />
            </FormItem>
            <FormItem>
              <button type='submit' className="btn btn-accent w-full">
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6" /> 받기
              </button>
            </FormItem>
          </Form>
        </Modal>
      }
    </>
  )
}
