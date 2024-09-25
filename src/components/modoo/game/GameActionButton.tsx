import Form, { FormItem } from "@/components/common/Form"
import { FormEvent, useCallback, useMemo, useState } from "react"
import { ArrowRightEndOnRectangleIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid'
import MoneyInput from "@/components/common/MoneyInput"
import { ModooPlayer, getTopPlayer, updatePlayer } from "@/domain/modoo"
import { useAtomValue } from "jotai"
import { currentGameAtom } from "@/atom/modoo-atom"
import { useAtomCallback } from "jotai/utils"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"

function MoneyTitle({remain}: {remain?: number}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">금액</div>
      {remain &&
        <div className="text-center text-foreground/60">
          ({Number(remain).toLocaleString()} 원)
        </div>
      }
    </div>
  )
}

export function SendButton({player}: {player: ModooPlayer}) {
  const [open, setOpen] = useState<boolean>(false)
  const [money, setMoney] = useState(300000)
  const [selectedPlayerId, setSelectedPlayerId] = useState('bank')
  const currentGame = useAtomValue(currentGameAtom)
  const validated = money > 0

  const sendMoney = useAtomCallback(
    useCallback((get, set, to: string, money: number) => {
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

      const topPlayer = getTopPlayer(updatedPlayers)

      set(currentGameAtom, {
        ...currentGame,
        players: updatedPlayers,
        histories: updatedHistories,
        topPlayerId: topPlayer.id
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <ArrowRightEndOnRectangleIcon
            className="w-8 h-8 p-1 text-blue-400 hover:text-blue-600"
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
            <FormItem label={<MoneyTitle remain={player.money - money} />}>
              <MoneyInput
                value={money}
                onChange={setMoney}
              />
            </FormItem>
            <FormItem>
              <Button type='submit' className="w-full" size={'lg'} variant={'primary'} disabled={!validated}>
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
  const validated = money > 0

  const updateMoney = useAtomCallback(
    useCallback((get, set) => {
      const currentGame = get(currentGameAtom)
      if (!currentGame) {
        console.log("NO currentGame")
        return
      }

      const players = currentGame.players
      const updatedPlayers = [...players]
      updatePlayer(updatedPlayers, player.id, money)

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

      const topPlayer = getTopPlayer(updatedPlayers)

      set(currentGameAtom, {
        ...currentGame,
        players: updatedPlayers,
        histories: histories,
        topPlayerId: topPlayer.id
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <ArrowLeftEndOnRectangleIcon
            className="w-8 h-8 p-1 text-red-400 hover:text-red-600"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{player.name} : 은행에서 돈 받기</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleSubmit}>
            <FormItem label={<MoneyTitle remain={player.money + money} />}>
              <MoneyInput
                value={money}
                onChange={setMoney}
              />
            </FormItem>
            <FormItem>
              <Button type='submit' className="w-full" variant={'primary'} size='lg' disabled={!validated}>
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6" /> 받기
              </Button>
            </FormItem>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
