import Script from 'next/script'
import React, { ReactElement } from 'react'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className='relative h-full bg-gray-200'>
        <Header />
        <div className='h-full w-full flex flex-col'>
          <main className='flex-auto w-full h-full min-h-[100vh] 0px]'>{children}</main>
        </div>
        <Footer />
      </div>
      <Script src='/js/jquery.min.js' />
      <Script src='/js/jquery.scrolly.min.js' />
      <Script src='/js/browser.min.js' />
      <Script src='/js/breakpoints.min.js' />
      <Script src='/js/util.js' />
      <Script src='/js/main.js' />
    </>
  )
}

export default Layout
