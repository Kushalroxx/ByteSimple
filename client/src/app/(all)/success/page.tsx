import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col h-screen text-4xl justify-center items-center'>
      <h1>Success!!</h1>
      <Link className='text-base bg-foreground text-background px-3 py-2 rounded-xl mt-4 font-bold hover:bg-foreground/90' href="/">Go To Home</Link>
    </div>
  )
}
