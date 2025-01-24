import Link from 'next/link'


interface BoardGame {
  title: string
  iconPath: string
  path: string
}

const GAME_LIST: BoardGame[] = [
  {title: '모두의 마블', iconPath: '/modoo/modoo.png', path: '/modoo'},
  {title: '메모리 게임', iconPath: '/memory/memory_icon.png', path: '/memory'},
]

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div>
        <div className='text-center'>
          <h1 className='text-4xl font-bold'>보드게임 도우미</h1>
          <p className='py-6 mb-6'>
            보드게임을 위한 도구들입니다.
          </p>
        </div>

        <div className='flex gap-4 max-w-[620px]'>
          {GAME_LIST.map(it =>
            <Link key={it.path} href={it.path} className='transition-all flex items-center justify-center rounded-lg bg-neutral-800 w-[200px] h-[200px] shadow-xs hover:shadow-lg hover:scale-105 hover:bg-neutral-700'>
              <img src={it.iconPath} className='w-[180px]' alt={it.title} />
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
