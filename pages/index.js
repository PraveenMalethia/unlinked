import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    fetch('/api/get-all-devs')
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      })
  }, [])
  return (
    <Layout>
      <Head>
        <title>Unlinked</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <section className='text-gray-600 body-font'>
          <div className='container px-5 py-24 mx-auto'>
            <div className='text-center mb-20'>
              <h1 className='sm:text-2xl lg:text-4xl font-medium title-font text-gray-900 mb-4'>
                <span className='text-indigo-600'>Search</span> ,
                <span className='text-purple-500'>Swipe</span> ,{' '}
                <span className='text-green-500'>Hire</span>
              </h1>
              <p className='text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s'>
                Hiring got a whole lot easier. We provide you a platform where
                you can hire people and get hired as well. Unlinked ranks people
                with a special algorithm developed as per recuriters need.
              </p>
              <div className='flex mt-6 justify-center'>
                <div className='w-16 h-1 rounded-full bg-indigo-600 inline-flex'></div>
              </div>
            </div>
            <div class='flex justify-center'>
              <Link href='/developers'>
                <a class='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
                  Get Started
                </a>
              </Link>
              <button class='ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg'>
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
    </Layout>
  )
}
