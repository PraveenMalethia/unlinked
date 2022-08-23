import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
const SignUp = () => {
  const [user, setUser] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
  }
  return (
    <Layout>
      <Head>
        <title>Unlinked</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section class='text-gray-600 body-font relative'>
        <div class='container px-5 py-24 mx-auto'>
          <div class='flex flex-col text-center w-full mb-12'>
            <h1 class='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
              Sign Up
            </h1>
          </div>
          <div class='lg:w-1/2 md:w-2/3 mx-auto'>
            <div class='flex flex-wrap -m-2'>
              <div class='p-2 w-1/2'>
                <div class='relative'>
                  <label for='name' class='leading-7 text-sm text-gray-600'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    onChange={(e) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        name: e.target.value,
                      }))
                    }
                    name='name'
                    class='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  />
                </div>
              </div>
              <div class='p-2 w-1/2'>
                <div class='relative'>
                  <label for='email' class='leading-7 text-sm text-gray-600'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    onChange={(e) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        email: e.target.value,
                      }))
                    }
                    name='email'
                    class='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  />
                </div>
              </div>
              <div class='p-2 w-1/2'>
                <div class='relative'>
                  <label
                    for='Experience'
                    class='leading-7 text-sm text-gray-600'>
                    Experience
                  </label>
                  <input
                    type='text'
                    id='Experience'
                    placeholder='eg: 0-10'
                    onChange={(e) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        experience: e.target.value,
                      }))
                    }
                    name='Experience'
                    class='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  />
                </div>
              </div>
              <div class='p-2 w-1/2'>
                <div class='relative'>
                  <label
                    for='github Link'
                    class='leading-7 text-sm text-gray-600'>
                    Github Link
                  </label>
                  <input
                    type='url'
                    id='github Link'
                    onChange={(e) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        github: e.target.value,
                      }))
                    }
                    name='github Link'
                    class='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  />
                </div>
              </div>
              <div class='p-2 w-full'>
                <div class='relative'>
                  <label for='message' class='leading-7 text-sm text-gray-600'>
                    About You
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    onChange={(e) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        about: e.target.value,
                      }))
                    }
                    class='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'></textarea>
                </div>
              </div>
              <div class='p-2 w-full'>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
                  Register as Developer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SignUp
