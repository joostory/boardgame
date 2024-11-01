import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios'
import { useAtom } from "jotai"
import { commandsAtom } from "@/atom/modoo-atom"
import { ModooCommand } from "@/domain/modoo"
import { ReloadIcon, ResetIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

function CommandCard({command}: {command: ModooCommand}) {
  const [animationName, setAnimationName] = useState('hflip')

  const cardBackground = useMemo(() => {
    switch(command.type) {
      case 'gold':
        return 'bg-gradient-to-r from-amber-200 to-yellow-500'
      case 'silver':
        return 'bg-gradient-to-r from-slate-300 to-slate-500'
      case 'bronze':
        return 'bg-gradient-to-r from-red-500 to-orange-500'
    }
  }, [command])

  useEffect(() => {
    setAnimationName('hflip')
    setTimeout(() => {
      setAnimationName('')
    }, 2000)
  }, [command])

  return (
    <div className="flex justify-center py-5">
      <div className={cn("rounded-md w-[240px] h-[320px] shadow-lg p-4 relative", cardBackground, animationName)}>
        <div className="curved-rectangle absolute top-5 w-[208px] py-3 bg-white bg-opacity-30 text-center rounded shadow">
          <b className='text-lg text-black'>{command.name}</b>
        </div>
        <img
          src='/modoo/chance_background.png'
          className="opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20"
        />
        <div className="rounded-md py-2 px-5 bg-slate-100 flex justify-center text-center items-center w-[208px] h-[100px] absolute bottom-5 bg-opacity-70 shadow">
          <span className="text-sm text-slate-900">{command.description}</span>
        </div>
        {command.storable &&
          <Badge className='absolute bottom-3 right-3'>
            보관가능
          </Badge>
        }
      </div>
    </div>
  )
}

function RandomCommand() {
  const [commands, setCommands] = useAtom(commandsAtom)
  const [command, setCommand] = useState<ModooCommand>()
  const [loading, setLoading] = useState<boolean>(false)

  function selectRandomCommand() {
    const index = Math.floor(Math.random() * commands.length)
    setCommand(commands[index])
  }

  useEffect(() => {
    if (commands && commands.length > 0) {
      selectRandomCommand()
      return
    }

    setLoading(true)
    axios.get('/modoo/api/command')
      .then(r => r.data)
      .then(data => setCommands(data))
      .finally(() => setLoading(false))
  }, [commands])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <ReloadIcon className="animate-spin w-6 h-6 opacity-70" />
      </div>
    )
  }

  return (
    <>
      {command &&
        <CommandCard command={command}/>
      }

      <Button variant={'secondary'} onClick={() => selectRandomCommand()}>
        <ResetIcon /> 다시뽑기
      </Button>
    </>
  )
}

export default function CommandButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={'secondary'} size='xs'>
            찬스카드
          </Button>
        </DialogTrigger>

        <DialogContent aria-description="" aria-describedby="">
          <DialogHeader>
            <DialogTitle>찬스카드</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <RandomCommand />
        </DialogContent>
      </Dialog>
    </>
  )
}
