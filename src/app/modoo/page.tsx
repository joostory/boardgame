import ModooApp from '@/components/modoo/ModooApp'

export default function Modoo() {
  return (
    <main className="min-h-screen">
      <div className='bg-base-100 container flex h-14 max-w-screen-2xl items-center'>
        <a href='/' className='btn btn-ghost test-xl'>보드게임 도우미</a>
      </div>

      <ModooApp />
    </main>
  )
}
