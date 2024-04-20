import Form, { FormItem } from "@/components/common/Form"
import Modal from "@/components/common/Modal"
import { FormEvent, useCallback, useState } from "react"
import { ArrowRightEndOnRectangleIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import MoneyInput from "@/components/common/MoneyInput"
import { ModooPlayer } from "@/domain/modoo"
import { useAtomValue } from "jotai"
import { currentGameAtom } from "@/atom/modoo-atom"
import { useAtomCallback } from "jotai/utils"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"

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
    }, [player])
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    sendMoney(selectedPlayerId, money)
    setOpen(false)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <ArrowRightEndOnRectangleIcon
            className="w-8 h-8 p-1 text-primary"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{player.name} : 돈 보내기</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleSubmit}>
            <FormItem label='보낼 곳'>
              <Select value={selectedPlayerId} onValueChange={v => setSelectedPlayerId(v)}>
                <SelectTrigger>
                  <SelectValue placeholder='보낼 곳' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='bank'>은행</SelectItem>
                  {currentGame && currentGame.players
                    .filter(it => it.id != player.id)
                    .map(it =>
                      <SelectItem key={it.id} value={it.id}>{it.name}</SelectItem>
                    )
                  }
                </SelectContent>
              </Select>
            </FormItem>
            <FormItem label="금액">
              <MoneyInput
                value={money}
                onChange={setMoney}
              />
            </FormItem>
            <FormItem>
              <Button type='submit' className="w-full">
                <ArrowRightEndOnRectangleIcon className="w-6 h-6" /> 보내기
              </Button>
            </FormItem>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function ReceiveButton({player}: {player: ModooPlayer}) {
  const [open, setOpen] = useState<boolean>(false)
  const [money, setMoney] = useState(300000)

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
    }, [player, money])
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateMoney()
    setOpen(false)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <ArrowLeftEndOnRectangleIcon
            className="w-8 h-8 p-1"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{player.name} : 은행에서 돈 받기</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleSubmit}>
            <FormItem label="금액">
              <MoneyInput
                value={money}
                onChange={setMoney}
              />
            </FormItem>
            <FormItem>
              <Button type='submit' className="w-full">
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6" /> 받기
              </Button>
            </FormItem>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
