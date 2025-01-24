import Link from "next/link"
import { ReactNode } from "react"

function SubHeader() {
  return (
    <div className='bg-base-100 container flex items-center h-14 max-w-(--breakpoint-2xl) gap-5'>
      <Link href="/" className="flex items-center gap-2">
        <img src="/app.png" className="w-6 h-6" />
        <strong>보드게임</strong>
      </Link>
    </div>
  )
}

interface SubPageLayoutProps {
  children?: ReactNode
}

export default function SubPageLayout({children}: SubPageLayoutProps) {
  return (
    <main className="min-h-screen">
      <SubHeader />

      {children}
    </main>
  )
}
