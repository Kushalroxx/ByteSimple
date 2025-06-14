"use client"
import React from 'react'
import InViewAnimation from './inViewAnimation'
import { motion } from 'framer-motion'
import { Button } from '../ui'
import Link from 'next/link'

export default function DemosHero() {
  return (
    <div className='h-[90vh] flex flex-col md:flex-row pt-10 md:pt-0 md:justify-between gap-16'>
      <div className='flex flex-col justify-center '>
      <InViewAnimation delay={0.25}>
      <h1 className='text-4xl md:text-7xl font-extrabold text-foreground '>See Our Work in Action</h1>
      </InViewAnimation>
      <InViewAnimation delay={0.4}>
      <p className='text-foreground/80 mt-4 md:mt-6 break-words whitespace-normal md:text-lg'>Explore real demos of what we build for businesses like yours.</p>
      </InViewAnimation>
      <InViewAnimation delay={0.55}>
      <div className='flex items-center gap-4 mt-8'>
      <Link href={"/contactus"}><Button className='py-5 md:text-base text-sm font-semibold flex  items-center w-full'>Get a Free Quote</Button></Link>
      <Link className='md:text-base text-sm text-foreground border border-foreground/20 rounded-xl px-3 py-2 hover:bg-foreground/5 hover:border-foreground/30' href="/services">View Services</Link>
      </div>
      </InViewAnimation>
      </div>
      <div className='flex flex-col justify-center'>
      <InViewAnimation delay={0.5}>
      <motion.img animate={{scale:1.007}} transition={{delay:0.5,type:"spring",repeat:Infinity,repeatType:"reverse",stiffness: 100, damping: 15}} src="./assets/herodemo.svg" alt="demosHero" className='w-full md:w-[85%] mt-8 md:mt-10 mx-auto md:mx-0' />
      </InViewAnimation>
      </div>
      
    </div>
  )
}
