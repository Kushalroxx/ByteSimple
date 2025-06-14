import SideNav from '@/components/sections/sideNav'
import React from 'react'

export default function Lagout({
    children
}:{
    children:React.ReactNode
}) {
  return (
    <div className='flex'>
         <SideNav/>
         <div className='flex-1'>
        {children}
        </div>      
    </div>
  )
}
