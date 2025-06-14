"use client"
import React from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import InViewAnimation from './inViewAnimation'

export default function ServiceCTA() {
  const router = useRouter()
  return (
    <div className=' flex flex-col justify-center h-[70vh] md:h-screen'>
      <InViewAnimation delay={.25}>
      <h1 className='text-4xl md:text-7xl font-extrabold text-foreground md:w-[75%]'>Let’s Build Something Great Together</h1>
      </InViewAnimation>
      <InViewAnimation delay={.4}>
      <p className='text-foreground/80 mt-10 break-words whitespace-normal md:text-lg md:w-[57%]'>Whether you're just starting or ready to scale, we’re here to craft a web solution that works for you.</p>
      </InViewAnimation>
      <InViewAnimation delay={.5} className='flex items-center gap-4 mt-8'>
        <>
      <Button onClick={() => router.push("/contactus")} className='py-5 md:text-base text-sm font-semibold'>Get a Free Quote</Button>
      <Button variant={"outline"} className='py-5 md:text-base text-sm font-semibold' onClick={()=>router.push("/demos")}>View Portfolio</Button>
      </>
      </InViewAnimation>
    </div>
  )
}
