import About from '@/components/sections/about'
import { serverUrl } from '@/lib/exportEnv'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title:"ByteSimple - About us",
  description:"Discover ByteSimple — a team of creators, strategists, and engineers focused on delivering fast, user-centered digital products that drive real business results.",
}
export default function page() {
    return (
      <div className=''>
        <About/>
      </div>
    )
}
