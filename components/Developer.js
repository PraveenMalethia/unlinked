import React from 'react'
const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Authorization', 'Basic UGFydmVlbjoxMjM0')

const Developer = ({ developer, onUpdate }) => {
  const saveForLater = async (id) => {
    let saved = localStorage.getItem('saved')
    if (!saved) {
      localStorage.setItem('saved', JSON.stringify([]))
    }
    saved = JSON.parse(localStorage.getItem('saved'))
    if (!saved.includes(id)) {
      saved.push(id)
      localStorage.setItem('saved', JSON.stringify(saved))
      var raw = JSON.stringify({
        operation: 'update',
        schema: 'hackathon',
        table: 'developers',
        records: [
          {
            id: id,
            pinned:
              developer.pinned !== null ? parseInt(developer.pinned + 1) : 1,
          },
        ],
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      await fetch(
        'https://managerapp-praveen.harperdbcloud.com',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => onUpdate())
        .catch((error) => console.log('error', error))
    } else {
      alert('Already Pinned')
    }
  }
  return (
    <div className='relative max-w-lg mx-auto md:max-w-4xl min-w-0 break-words bg-white w-full mb-6 border-4 border-blue-500 rounded-xl mt-16'>
      <div className='px-6'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full flex justify-center'>
            <div className='relative'>
              <img
                src={'/' + developer.profile_pic}
                className='shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]'
              />
            </div>
          </div>
          <div className='w-full text-center mt-20'>
            <div className='flex justify-center lg:pt-4 pt-8 pb-0'>
              <div className='p-3 text-center'>
                <span className='text-xl font-bold block uppercase tracking-wide text-slate-700'>
                  {developer.pinned}
                </span>
                <span className='text-sm text-slate-400'>Pinned</span>
              </div>
              <div className='p-3 text-center'>
                <span className='text-xl font-bold block uppercase tracking-wide text-slate-700'>
                  {developer.projects.length}
                </span>
                <span className='text-sm text-slate-400'>Projects</span>
              </div>

              <div className='p-3 text-center'>
                <span className='text-xl font-bold block uppercase tracking-wide text-slate-700'>
                  {developer.experience} years
                </span>
                <span className='text-sm text-slate-400'>Experience</span>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center mt-2'>
          <h3 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>
            {developer.name}
          </h3>
          <div className='text-xs mt-0 mb-2 text-slate-400 font-bold uppercase'>
            <i className='fas fa-map-marker-alt mr-2 text-slate-400 opacity-75'></i>
            Location prefered : {developer.location}
          </div>
          <div className='text-xs mt-0 mb-2 text-slate-400 font-bold uppercase'>
            <i className='fas fa-map-marker-alt mr-2 text-slate-400 opacity-75'></i>
            <a href={developer.github} target='_blank'>
              Open Github
            </a>
          </div>
        </div>
        <div className='mt-6 py-6 border-t border-slate-200 text-center'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full px-4'>
              <p className='font-light leading-relaxed text-slate-600 mb-4'>
                An artist of considerable range, Mike is the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                and records all of his own music, giving it a warm.
              </p>
              <a
                href='#/'
                onClick={() => saveForLater(developer.id)}
                className='font-normal bg-purple-500 rounded py-2 px-4 text-white'>
                Save For Later
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <section>
          <section className='text-gray-600 body-font'>
            <div className='container px-5 py-4 mx-auto'>
              <div className='p-5 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col'>
                <div className='flex-grow sm:text-left text-center mt-6 sm:mt-0'>
                  <h1 className='text-black text-2xl title-font font-bold mb-2'>
                    Skills
                  </h1>
                  <div className='py-4'>
                    {developer.skills &&
                      developer.skills.map((skill, index) => (
                        <div key={index} className=' inline-block mr-2'>
                          <div className='flex  pr-2 h-full items-center'>
                            <svg
                              className='text-yellow-500 w-6 h-6 mr-1'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              strokeWidth='2'
                              stroke='currentColor'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'>
                              <path stroke='none' d='M0 0h24v24H0z' />
                              <circle cx='12' cy='12' r='9' />
                              <path d='M9 12l2 2l4 -4' />
                            </svg>
                            <p className='title-font font-medium'>{skill}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <h1 className='text-black text-2xl title-font font-bold mb-2'>
                    Projects
                  </h1>
                  <div className='md:flex font-bold text-gray-800'>
                    <div className='w-full md:w-full flex space-x-3'>
                      {developer.projects &&
                        developer.projects.map((project, index) => (
                          <div key={index} className='w-full'>
                            <h2 className='text-gray-500'>{project.title}</h2>
                            <p>Role - {project.role}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <a className='mt-3 text-indigo-500 inline-flex items-center'>
                    Learn More
                    <svg
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='w-4 h-4 ml-2'
                      viewBox='0 0 24 24'>
                      <path d='M5 12h14M12 5l7 7-7 7'></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className='flex justify-content-center'>
            <span className='flex mx-auto'>Swipe Right to see more . . .</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Developer
