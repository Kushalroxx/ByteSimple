import Navbar from '@/components/majorUi/navbar'
import Footer from '@/components/sections/footer'
import React from 'react'

export default function layout({children}:{children:React.ReactElement}) {
  return (
    <div className='bg-background relative '>   
    <div className='h-screen'>
      {children}
      <Footer/>
    </div>
    </div>
  )
}
