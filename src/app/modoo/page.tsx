'use client'

import ModooApp from '@/components/modoo/ModooApp'

export default function Modoo() {
  return (
    <main className="min-h-screen">
      <div className='navbar bg-base-100'>
        <a href='/' className='btn btn-ghost test-xl'>보드게임 도우미</a>
      </div>

      <ModooApp />
    </main>
  )
}
