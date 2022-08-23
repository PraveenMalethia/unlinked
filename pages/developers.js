import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, EffectCoverflow } from 'swiper'
import { Navbar, Dropdown } from 'flowbite-react'
import SwiperCore, { Navigation, Pagination } from 'swiper/core'
import Developer from '../components/Developer'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'

const cards = [
  'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg',
]

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`

export default function Home(props) {
  const [developers, setDevelopers] = useState(props.developers)
  const [skills, setSkills] = useState('')
  const [controlledSwiper, setControlledSwiper] = useState(null)
  const [experience, setExperience] = useState('')
  const [location, setLocation] = useState('')
  const [update, setUpdate] = useState(false)
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props2, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
      if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i) => {
        if (index !== i) return // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1 // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600)
    }
  )
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
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand href='/'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='mr-3 h-6 sm:h-9'
              alt='Flowbite Logo'
            />
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
                    stroke-width='2'
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
      <div>
        {props2.map(({ x, y, rot, scale }, i) => (
          <animated.div
            key={i}
            style={{
              transform: interpolate(
                [x, y],
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
            }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${cards[i]})`,
              }}
            />
          </animated.div>
        ))}
      </div>
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
