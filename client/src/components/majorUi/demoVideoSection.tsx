"use client"
import React from 'react'
import InViewAnimation from './inViewAnimation'
import { motion } from 'framer-motion'
import { serviceDemosInterface } from '@/lib/interfaces'
import { Card, CardHeader } from '../ui'
import Link from 'next/link'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
}
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}
export default function DemoVideoSection({
  serviceDemos
}:{
  serviceDemos?:serviceDemosInterface[]
}) {  
  return (
    <div className='mt-20 md:mt-0'>
        <InViewAnimation delay={0.3}>
      <h1 className='text-4xl md:text-5xl font-extrabold text-foreground text-center'>Our Capabilities, Visualized !!</h1>
      </InViewAnimation>
      <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className='flex flex-wrap max-w-7xl gap-6 justify-center mt-16'>
      {
        serviceDemos && serviceDemos.map((demo, index) => (
          <motion.div variants={itemVariants} whileHover={{scale:1.005}} className='w-full md:w-[33%] ' key={index} >
          <Card key={index} className='shadow-foreground/20 hover:shadow-lg transition-shadow duration-300  shadow-md'>
            <CardHeader className=' flex flex-col justify-center items-center w-full h-full'>
          <video src={demo.video} autoPlay={false} className=' rounded-xl mx-auto md:mx-0' controls></video>
          <h1 className='text-foreground text-xl mt-6 md:text-2xl font-extrabold'>
            {demo.demoName}
          </h1>
          <p className='text-foreground/80 break-words whitespace-normal text-sm md:text-lg'>{demo.description}</p>
          {
            !!demo.link && <Link className='rounded-md hover:bg-zinc-800 border border-zinc-700 px-3 py-1 mt-6' href={demo.link}>Visit It</Link>
          }
          </CardHeader>
          </Card></motion.div>
          ))
      }
      </motion.div>
    </div>
  )
}
