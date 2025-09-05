import React from 'react'
import HomeText from './homeText'
import InViewAnimation from './inViewAnimation'
import { WavyBackground } from '../ui/wavy-background'

export default function HomeHero() {

  return (
    <>
    <div className='relative overflow-hidden h-[88vh] mt-8'>
          <WavyBackground blur={10} speed='fast' className='overflow-hidden absolute z-0' >
          <section className=" relative flex flex-col justify-center items-center z-20 ">
            <HomeText />
          </section>
      </WavyBackground>
        </div>
      <InViewAnimation className='flex z-20 justify-center pt-10 '>
        <img className='w-[90%] md:w-5xl rounded-3xl' src="/assets/homeLogo.webp" />
      </InViewAnimation>
    </>

  )
}
