"use client"
import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui'
import {motion} from "framer-motion"

export default function ServiceCard({
    serviceName,
    description,
    image
}:{
    serviceName:string,
    description:string,
    image:string
}) {
  return (
    <motion.div
    whileHover={{scale:1.005}}
    className='h-full w-[95%] sm:w-4/5 md:w-[290px]'
    transition={{duration:.1,type:"spring",stiffness: 100, damping: 15}}
    >
    <Card className='flex justify-center items-center  shadow-foreground/20 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <CardHeader className='flex flex-col justify-center items-center w-full'>
        <img className="rounded-lg mb-5 w-full" src={image} alt="blogImage" />
        <CardTitle className=" break-words whitespace-normal text-xl md:text-2xl font-extrabold text-shadow">{serviceName}</CardTitle>
        <p className="text-foreground/55 text-sm md:text-base break-words whitespace-normal">{description}</p>
      </CardHeader>
    </Card>
    </motion.div>
  )
}
