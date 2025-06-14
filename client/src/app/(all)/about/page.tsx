import About from '@/components/sections/about'
import { serverUrl } from '@/lib/exportEnv'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title:"ByteSimple - About us",
  description:"Discover ByteSimple — a team of creators, strategists, and engineers focused on delivering fast, user-centered digital products that drive real business results.",
}
export default async function page() {
  try {
    const res = await fetch(`${serverUrl}/about`)
    const data = await res.json()
    return (
      <div className=''>
        <About aboutArr={data.about}/>
      </div>
    )
  } catch (error) {
    return (
      <div>
        <About aboutArr={undefined}/>
      </div>
    )
  }
}
