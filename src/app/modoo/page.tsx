import ModooApp from '@/components/modoo/ModooApp'
import Link from 'next/link'

export default function Modoo() {
  return (
    <main className="min-h-screen">
      <div className='bg-base-100 container flex h-14 max-w-screen-2xl items-center'>
        <Link href='/' className='btn btn-ghost test-xl'>보드게임 도우미</Link>
      </div>

      <ModooApp />
    </main>
  )
}
