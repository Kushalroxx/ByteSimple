"use client"
import React from 'react'
import { motion, useInView } from "framer-motion"

export default function InViewAnimation({
  children,
  delay,
  className
}:{
  children?:React.ReactElement, 
  delay?:number,
  className?:string}) {
    const ref = React.useRef(null)
    const isInView = useInView(ref, { once: true })

  return (
    <motion.div
    className={className}
    initial={{ opacity: 0,y:10 }}
    animate={{ opacity: isInView ? 1 : 0 ,y:isInView ? 0 : 10}}
    transition={{delay:delay}}
    ref={ref}>
      {children}
    </motion.div>
  )
}
