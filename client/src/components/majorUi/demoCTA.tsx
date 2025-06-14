"use client"
import React from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import InViewAnimation from './inViewAnimation'

export default function DemoCTA() {
    const router = useRouter()
  return (
    <div className='h-[74vh] flex flex-col justify-center'>
      <InViewAnimation delay={0.2}>
      <h1 className='text-4xl md:text-7xl font-extrabold text-foreground md:w-[75%]'>Like What You See?</h1>
      </InViewAnimation>
      <InViewAnimation delay={0.3}>
      <p className='text-foreground/80 mt-10 break-words whitespace-normal md:text-lg md:w-[57%]'>Our work speaks for itself. Let’s create something powerful, purposeful, and custom-fit for your goals.</p>
      </InViewAnimation>
      <InViewAnimation delay={0.4}>
      <div className='flex items-center gap-4 mt-8'>
      <Button onClick={() => router.push("/contactus")} className='py-5 md:text-base text-sm font-semibold'>Get a Free Quote</Button>
      <Link className='md:text-base text-sm text-foreground border border-foreground/20 rounded-xl px-3 py-2 hover:bg-foreground/5 hover:border-foreground/30' href="/services">View Services</Link>
      </div>
      </InViewAnimation>
    </div>
  )
}
