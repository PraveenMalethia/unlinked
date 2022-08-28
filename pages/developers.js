import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, EffectCoverflow } from 'swiper'
import { Navbar, Dropdown, Button } from 'flowbite-react'
import SwiperCore, { Navigation, Pagination } from 'swiper/core'
import Developer from '../components/Developer'
import { useRouter } from 'next/router'

export default function Home(props) {
  const router = useRouter()
  const [developers, setDevelopers] = useState(props.developers)
  const [skills, setSkills] = useState('')
  const [controlledSwiper, setControlledSwiper] = useState(null)
  const [experience, setExperience] = useState('')
  const [location, setLocation] = useState('')
  const [update, setUpdate] = useState(false)
  const onUpdate = () => {
    setUpdate(!update)
  }
  useEffect(() => {
    fetchData()
  }, [update])
  useEffect(() => {
    if (skills.length > 0 || location.length > 0) {
      fetchfilteredData()
    }
  }, [skills, experience, location])
  const fetchData = async () => {
    await fetch('/api/get-all-devs')
      .then((response) => response.json())
      .then((result) => {
        setDevelopers(result.data)
      })
  }

  const fetchfilteredData = async () => {
    let response = await fetch(
      '/api/get-filter-devs?' +
        new URLSearchParams({
          skills: skills,
          experience: experience,
          location: location,
        }),
      {
        method: 'GET',
      }
    )
    response = await response.json()
    setDevelopers(response.data)
  }
  return (
    <div>
      <Head>
        <title>Unlinked</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Navbar fluid={false} rounded={true}>
          <Navbar.Brand href='/'>
            <svg
              width='30'
              height='30'
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
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
              Unlinked
            </span>
          </Navbar.Brand>
          <Dropdown label='Select Skills'>
            <Dropdown.Item onClick={() => setSkills('all')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setSkills('Python')}>
              Python
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSkills('JavaScript')}>
              JavaScript
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSkills('BlockChain')}>
              BlockChain
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSkills('Agora')}>
              Agora
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSkills('HarperDB')}>
              HarperDB
            </Dropdown.Item>
          </Dropdown>
          <Dropdown label='Select Location'>
            <Dropdown.Item onClick={() => setLocation('all')}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setLocation('remote')}>
              Remote
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setLocation('on-site')}>
              On-Site
            </Dropdown.Item>
          </Dropdown>
          <Dropdown label='Select Experience'>
            <Dropdown.Item onClick={() => setExperience('all')}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExperience('0-2')}>
              0 - 2 years
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExperience('3-5')}>
              3 - 5 years
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExperience('6-10')}>
              6 - 10 years
            </Dropdown.Item>
          </Dropdown>
          <Button onClick={() => router.push('/pinned-developers')}>
            Pinned Profiles
          </Button>
        </Navbar>
        <div className='px-20 mb-10 mt-10'>
          <form>
            <label
              for='default-search'
              class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'>
              Search
            </label>
            <div class='relative'>
              <div class='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  class='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                class='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search Skills...'
                onChange={(e) => {
                  if (e.target.value && e.target.value.length > 0) {
                    setSkills(e.target.value)
                  } else {
                    setSkills('all')
                  }
                }}
                required
              />
            </div>
          </form>
        </div>
        <Swiper
          effect={'cards'}
          navigation={{
            nextEl: 'p-10 bg-red-500',
            prevEl: 'p-10 bg-red-500',
          }}
          grabCursor={true}
          controller={{ control: controlledSwiper }}
          modules={[EffectCards, Navigation]}
          centeredSlides={true}
          pagination={true}
          className='mySwiper'>
          {developers.map((developer) => (
            <SwiperSlide key={developer.id} className=' bg-white pt-10'>
              <Developer developer={developer} onUpdate={onUpdate} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  let devs
  await fetch('http://localhost:3000/api/get-all-devs')
    .then((response) => response.json())
    .then((result) => {
      devs = result.data
    })
  return {
    props: {
      developers: devs,
    },
  }
}
