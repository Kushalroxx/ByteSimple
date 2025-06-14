"use client"
import React from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import InViewAnimation from './inViewAnimation'
import { motion } from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'

export default function ServiceHero() {
  const router = useRouter()
  return (
      <div className='md:h-screen h-[78vh] flex flex-col md:flex-row justify-center items-center gap-12 '> 
        <div className='flex flex-col w-full justify-center '>
          <InViewAnimation delay={0.15}>
      <h1 className='text-4xl md:text-7xl font-extrabold text-foreground mb-10 '>Solutions Built to Grow With You</h1>
      </InViewAnimation>
      <InViewAnimation delay={0.3}>
        <>
      <h2 className='text-foreground/80 md:text-lg mb-4  '>We design fast, responsive, and user-friendly websites tailored to your business goals.</h2>
      <h2 className='text-foreground/80 md:text-lg  mb-6 md:mb-8'>Communicates your current niche with room to evolve.</h2>
      <div className='flex items-center gap-4'>
      <Button onClick={() => router.push("/contactus")} className='py-5 md:text-base text-sm font-semibold'>Get a Free Quote</Button>
      <Link className='md:text-base text-sm text-foreground border border-foreground/20 rounded-xl px-3 py-2 hover:bg-foreground/5 hover:border-foreground/30' href="/demos">View Portfolio</Link>
      </div>
      </>
      </InViewAnimation>
      </div>
      <InViewAnimation className='w-full' delay={0.5}>
      <motion.img initial={{scale:0.99}} animate={{scale:1}} transition={{duration:.15,repeat:Infinity,repeatType:"reverse",type:"spring",stiffness: 100, damping: 15}} className='w-full' src={"./assets/serviceSvg.svg"} alt="" />
      </InViewAnimation>
      </div>

  )
}
