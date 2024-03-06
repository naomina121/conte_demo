import Link from 'next/link'
import React from 'react'
import { siteConfig } from '../../site.config'
import { useAuth } from '@/context/auth'

const Footer = () => {
  const { user, logout } = useAuth()
  return (
    <footer className='bg-gradient-to-r from-purple-600 to-blue-400 py-4 leading-normal w-full text-center mt-[120px] h-[120px] block'>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <button
                  className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border-2 border-white text-white hover:border-white/70 hover:text-white/70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                  onClick={logout}
                >
                  ログアウト
                </button>
              </li>
            </>
          ) : (
            <>
              <li className='py-2 px-3 mt-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border-2 border-white text-white hover:border-white/70 hover:text-white/70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                <Link href='/auth/login/'>ログイン</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <small className='text-white'>
        ©
        <Link
          href='/'
          className='py-2 px-3 mt-2 inline-flex justify-center items-center gap-2 rounded-lg font-bold text-white hover:bg-white/[.1] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm'
        >
          {siteConfig.siteTitle}
        </Link>
      </small>
    </footer>
  )
}

export default Footer
