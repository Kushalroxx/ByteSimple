"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SideNav() {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const navOptions = [
        "Dashboard",
        "SubAdmin",
        "Services",
        "Contacts",
        "ServiceDemo",
        "AboutUs",
        "Blog",
    ]
  return (
    <>
        <Button onClick={() => setOpen(prev => !prev)} className='fixed z-50 md:hidden text-xl h-7 w-3 top-1 left-1'>
        {open ? '×' : '≡'}
      </Button>
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : '-100%' }}
        transition={{ type: 'tween' }}
        className='fixed z-40 md:relative top-0 left-0 h-screen w-3/5 md:w-2/5 lg:w-1/5 bg-background px-4 py-6 shadow-xl shadow-foreground/10 flex flex-col gap-4 justify-center md:translate-x-0'
      >
      {
        navOptions.map((option)=>{
          return(
            
              <Link className={`w-full font-bold bg-foreground text-background py-2 text-center rounded-2xl` + (path === `/${option.toLowerCase()}` ? " bg-secondary text-foreground" : "")} href={`/${option.toLowerCase()}`} key={option}>
              {option}
            </Link>
          )
        })}
    </motion.div>
        </>
  )
}
