"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { userAtom } from '@/lib/atoms'
import { useRouter } from 'nextjs-toploader/app'

export default function SideNav() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useAtom(userAtom)
  const path = usePathname()
  const router = useRouter()
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
  useEffect(() => {
    if(user?.type!=="admin"&& user?.type!=="subAdmin"){
      router.push("/")
    }
  },[user])
  let navOptions = [
        {name:"Dashboard",href:"/admin/dashboard"},
        {name:"Services",href:"/admin/services"},
        {name:"Projects",href:"/admin/projects"},
        {name:"Contacts",href:"/admin/contacts"},
        {name:"ServiceDemo",href:"/admin/servicedemo"},
        {name:"AboutUs",href:"/admin/aboutus"},
        {name:"Blog",href:"/admin/blog"},
    ]
    if (user?.type==="admin") {
      navOptions.push({name:"SubAdmin",href:"/admin/subadmin"})
    }
  return (
    <>
        <Button onClick={() => setOpen(prev => !prev)} className='fixed z-50 md:hidden text-xl h-7 w-3 top-14 left-3'>
        {open ? '×' : '≡'}
      </Button>
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : '-100%' }}
        transition={{ type: 'tween' }}
        className='fixed z-40 md:relative top-0 left-0 h-screen w-3/5 md:w-2/5 lg:w-1/5 bg-black px-4 py-6 flex flex-col gap-4 justify-center md:translate-x-0'
      >
      {
        navOptions && navOptions.map((option)=>{
          return(
            
              <Link className={`w-full font-bold bg-foreground text-background py-2 text-center rounded-2xl` + (path.startsWith(option.href)? " bg-secondary font-semibold text-foreground" : "")} href={option.href} key={option.name}>
              {option.name}
            </Link>
          )
        })}
    </motion.div>
        </>
  )
}
