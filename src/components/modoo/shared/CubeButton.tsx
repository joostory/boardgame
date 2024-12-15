import CubeSpace from "@/components/modoo/shared/CubeSpace"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


export default function CubeButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={'secondary'} size='xs'>
            주사위
          </Button>
        </DialogTrigger>

        <DialogContent aria-description="" aria-describedby="">
          <DialogHeader>
            <DialogTitle>주사위 던지기</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <CubeSpace />
        </DialogContent>
      </Dialog>
    </>
  )
}
