import Link from 'next/link'
import React from 'react'
import { siteConfig } from '../../site.config'
import { useAuth } from '@/context/auth'

const Header = () => {
  const { user, logout } = useAuth()

  return <></>
}

export default Header

{
  /* <header className='bg-gradient-to-r from-purple-600 to-blue-400 h-[70px] leading-norma max-md:h-auto'>
      <div className='flex w-full h-[70px] justify-between px-4 py-4 text-center items-center max-md:flex-col max-md:h-auto'>
        <h1 className='font-bold w-full max-md:mb-4'>
          <Link
            href='/'
            className='py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg font-bold text-white hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-lg '
          >
            {siteConfig.siteTitle}
          </Link>
        </h1>
        <nav className='w-full'>
          <ul className='flex w-full'>
            {user && user.authority !== 'guest' ? (
              <>
                <li className='mr-4 py-2 px-3 inline-flex items-center text-sm font-semibold text-white'>
                  おかえりなさい、{user.userName}さん
                </li>
                {user.authority === 'admin' || user.authority === 'user' ? (
                  <>
                    <li className='mr-4'>
                      <Link
                        className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border-2 border-white text-white hover:border-white/70 hover:text-white/70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                        href={'/books/' + user.id.unique_id.number}
                      >
                        ブック管理
                      </Link>
                    </li>
                    <li className='mr-4'>
                      <Link
                        className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border-2 border-white text-white hover:border-white/70 hover:text-white/70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                        href={'/books/' + user.id.unique_id.number}
                      >
                        テストページ一覧
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border-2 border-white text-white hover:border-white/70 hover:text-white/70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                  <button onClick={logout}>ログアウト</button>
                </li>
              </>
            ) : (
              <>
                <li className='py-2 px-3 mx-auto text-sm font-semibold rounded-lg border-2 border-white text-white hover:border-white/70 hover:text-white/70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                  <Link href='/auth/login'>ログイン</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header> */
}
