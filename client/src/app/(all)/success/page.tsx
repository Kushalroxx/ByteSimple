import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col h-screen text-xl justify-center items-center px-6'>
      <h1 className='text-center'>Your message has been received. Our team will contact you shortly.</h1>
      <Link className='text-base bg-foreground text-background px-3 py-2 rounded-xl mt-10 font-semibold hover:bg-foreground/90' href="/">Go To Home</Link>
    </div>
  )
}
