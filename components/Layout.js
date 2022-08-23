import React from 'react'
import Link from 'next/link'

const Layout = ({ children }) => {
  return (
    <>
      <header className='text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link href='/'>
            <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
              <svg
                width='40'
                height='40'
                viewBox='0 0 102 102'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M51.0022 102H0C0 74.0229 23.0207 51.0022 51.0022 51.0022C78.9838 51.0022 102 74.0229 102 102H51.0022Z'
                  fill='#4D4DFF'
                />
                <path
                  d='M51.0022 0H102C102 27.9771 78.9793 51.0022 51.0022 51.0022C23.0251 51.0022 0 27.9771 0 0H51.0022Z'
                  fill='#1AEABE'
                />
              </svg>
              <span className='ml-3 text-xl'>Unlinked</span>
            </a>
          </Link>
          <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'>
            <Link href='/'>
              <a className='mr-5 hover:text-gray-900'>Home</a>
            </Link>
            <a className='mr-5 hover:text-gray-900'>About</a>
            <a className='mr-5 hover:text-gray-900'>Contact Support</a>
            <a className='mr-5 hover:text-gray-900'>Collaborate</a>
          </nav>
          <span className='mr-3 text-lg'>Login</span>
          <Link href='/sign-up'>
            <a className='inline-flex items-center text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-purple-500 rounded text-base mt-4 md:mt-0'>
              Sign Up
            </a>
          </Link>
        </div>
      </header>
      {children}
    </>
  )
}

export default Layout
