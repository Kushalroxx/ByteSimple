"use client"
import React from 'react'
import InViewAnimation from './inViewAnimation'
import { Variants, motion } from 'framer-motion'
import { Card, CardHeader } from '../ui'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
     responsive: [
    {
      breakpoint: 1260,
      settings: {
        slidesToShow: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 844,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
  };

const trustBuilders = [
  {
    title:"Fast Turnaround",
    description:"We deliver in agile sprints so you see results quickly — no endless waiting.",
    image:"./assets/timeHome.svg"
  },
  {
    title:"Tailored Solutions",
    description:"We design fast, responsive, and user-friendly websites tailored to your business goals.",
    image:"./assets/solutionHome.svg"
  }
  ,
  {
    title:"Practical Strategy",
    description:"We don’t just build — we help shape smart, scalable MVPs tailored to your goals.",
    image:"./assets/strategyHome.svg"
  },
  {
    title:"Clear Communication",
    description:"Regular updates, honest timelines, and no jargon — we speak human, not just developer.",
    image:"./assets/communicationHome.svg"
  }
]
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}
export default function HomeWorkWithUs() {
  return (
    <div className=' bg-black pt-20 md:pt-28 '>
      <InViewAnimation delay={0.25}>
      <h1 className='text-foreground text-4xl md:text-5xl text-center font-extrabold'>Why Work With Us</h1>
      </InViewAnimation>
      <InViewAnimation delay={0.4}>
      <p className='text-muted-foreground pt-2 mt-2 break-words whitespace-normal md:text-lg text-center'>Whether you're launching a product or building for a client, we bring clarity, design, and reliable code to the table.</p>
      </InViewAnimation>
        <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className="max-w-[70vw] sm:max-w-[56vw] relative overflow-visible md:max-w-[70vw] md:mx-auto mx-auto mt-12 mb-3">
          <Slider className="slick-dots-visible" {...settings}>
        {
          trustBuilders && trustBuilders.map((trustBuilder, index) => (
            <motion.div whileHover={{scale: 1.005}} className='!w-[95%] sm:!w-4/5 md:!w-[290px] py-4 px-1' key={index} variants={itemVariants}>
            <Card className='w-full h-full shadow-foreground/20 shadow-sm hover:shadow-md transition-shadow duration-300'>
              <CardHeader className=''>
                <img src={trustBuilder.image} alt="aboutImage" className=' rounded-xl mx-auto md:mx-0' />
                <h1 className='text-foreground text-xl mt-8 mb-1 md:text-2xl font-extrabold'>{trustBuilder.title}</h1>
                <p className='text-foreground/80 break-words whitespace-normal text-sm md:text-base '>{trustBuilder.description}</p>
              </CardHeader>
            </Card>
            </motion.div>))
        }
        </Slider>
        </motion.div>
    </div>
  )
}
