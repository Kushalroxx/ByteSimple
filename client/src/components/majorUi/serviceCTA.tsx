"use client"
import React from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import InViewAnimation from './inViewAnimation'

export default function ServiceCTA() {
  const router = useRouter()
  return (
    <div className=' flex flex-col justify-center items-center h-[60vh] md:h-[70vh] bg-gradient-to-br from-pink-950 via-indigo-700 rounded-3xl to-indigo-950 my-10 px-5 md:!px-20 text-center'>
      <InViewAnimation>
      <h1 className='text-3xl md:text-4xl font-extrabold text-foreground'>Let’s Build Something Great Together</h1>
      </InViewAnimation>
      <InViewAnimation >
      <p className='text-foreground/80 mt-6 md:mt-8 break-words whitespace-normal md:text-lg'>Whether you're just starting or ready to scale, we’re here to craft a web solution that works for you.</p>
      </InViewAnimation>
      <InViewAnimation className='flex items-center gap-4 mt-10 md:mt-12'>
      <Button onClick={() => router.push("/contactus")} className=' py-4 md:py-6 md:text-base text-sm font-semibold  transition-all duration-300 hover:shadow-lg shadow-xl shadow-black/40'>Let’s Get Started</Button>
      </InViewAnimation>
    </div>
  )
}
