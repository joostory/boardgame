import React from "react"
import LandList from "@/components/modoo/shared/LandList"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


export default function LandButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button size={'xs'} variant={'secondary'}>
            지역카드
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>지역카드</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <LandList />
        </DialogContent>
      </Dialog>
    </>
  )
}
