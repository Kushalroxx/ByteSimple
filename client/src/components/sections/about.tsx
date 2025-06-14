import React from 'react'
import { aboutInterFace } from '@/lib/interfaces';
import InViewAnimation from '../majorUi/inViewAnimation';

export default function About({aboutArr}:{
  aboutArr?:aboutInterFace[]
}) {
  return (
    <div className=' px-6 md:px-10 md:pt-10  '>
      <InViewAnimation delay={0.15}>
      <h3 className='text-lg md:text-xl font-extrabold text-zinc-300'>OH HEY!!</h3>
      </InViewAnimation>
      <InViewAnimation delay={0.4}>
      <h1 className='text-4xl md:text-9xl pt-8 md:pt-14 w-[81%] md:w-3/4 font-extrabold leading-tight'>
      We’re ByteSimple and our Work’s no Joke.
      </h1>
      </InViewAnimation>
      <InViewAnimation delay={0.5}>
      <h1 className=' mt-20 md:mt-36 text-4xl md:text-7xl font-extrabold pb-3'>who we are!!</h1>
      </InViewAnimation>
      {
        aboutArr && aboutArr.map((about) => (
          <InViewAnimation key={about._id} delay={0.6}>
          <div className='flex flex-col md:flex-row justify-center md:gap-12 pt-8 md:pt-14 pb-6 '>
          <img src={about.image} alt="aboutImage" className=' rounded-xl  md:w-1/3 mx-auto md:mx-0' />
          <div className='pt-5 md:pt-14 md:w-2/4 tracking-wide'>
            {about.description}
          </div></div></InViewAnimation>))
  }
    </div>
  )
}
