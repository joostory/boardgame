import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className='text-center'>
        <div className='max-w-md'>
          <h1 className='text-4xl font-bold'>보드게임 도우미</h1>
          <p className='py-6 mb-6'>
            보드게임을 위한 도구들입니다.
          </p>
          <div className='rounded-lg bg-base-300'>
            <a href="/modoo">
              <img src='/modoo.png' className='w-full' alt='모두의 마블' />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
