'use client'

import MooduApp from '@/app/components/MooduApp'

export default function Moodu() {
  return (
    <main className="min-h-screen">
      <div className='navbar bg-base-100'>
        <a href='/' className='btn btn-ghost test-xl'>보드게임 도우미</a>
      </div>

      <MooduApp />
    </main>
  )
}
