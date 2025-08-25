"use client"
import React from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '../ui'
import {motion} from "framer-motion"


export default function ServiceCard({
    title,
    description,
    icon
}:{
    title:string,
    description:string,
    icon:React.JSX.Element
}) {
  return (
    <motion.div
    whileHover={{scale:1.005, y:-2}}
    className='w-full md:h-40'
    transition={{duration:.1,type:"spring",stiffness: 100, damping: 15}}
    >
    <Card className='border-none h-full bg-black/50 backdrop-blur backdrop-opacity-10 shadow-xl shadow-zinc-900/7p0 hover:shadow-lg transition-shadow rounded-2xl'>
      <CardHeader className='flex'>
        <div className='md:text-xl mr-3 mt-2'>
        {
          icon
        }
        </div>
        <div>
        <CardTitle className=" break-words whitespace-normal text-lg md:text-xl font-semibold text-shadow mb-3 ">{title}</CardTitle>
        <p className="text-foreground/55 text-xs md:text-sm break-words whitespace-normal">{description}</p>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        {title.includes("Mobile App") && <p className='text-green-500/80 text-xs md:text-sm font-semibold'>Soon</p>}
      </CardFooter>
        </Card>
    </motion.div>
  )
}
