"use client"
import React from 'react'
import { Card, CardHeader } from '../ui'
import InViewAnimation from './inViewAnimation'
import { motion, Variants } from 'framer-motion'
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

const chooseUsData = [
  {
    title:"Results-Driven Approach",
    description:"We focus on business outcomes, not just pretty pixels. Strategy, purpose, and measurable results. ",
    image:"./assets/data.svg"
  },
  {
    title:"Experienced Team",
    description:"Designers, developers, and strategists with real-world experience.",
    image:"./assets/team.svg"
  },
  {
    title:"Fast Turnaround",
    description:"We work in agile sprints to deliver results quickly and efficiently.",
    image:"./assets/time.svg"
  },
  {
    title:"Transparent Process",
    description:"lear timelines, open communication, no surprises.",
    image:"./assets/process.svg"
  },
  {
    title:"Customer-Centric Approach",
    description:"We listen, understand, and adapt to your needs.",
    image:"./assets/listen.svg"
  },
  {
    title:"Reliable Support",
    description:"Ongoing maintenance, updates, and real-time support.",
    image:"./assets/support.svg"
  }
]
const containerVariants:Variants = {
  hidden:{
    opacity:0
  },
  visible:{
    opacity:1,
    transition:{
      delayChildren:0.2,
      staggerChildren:0.1,
  }
}
}
const itemVariants:Variants = {
  hidden:{opacity:0, y:20},
  visible:{opacity:1,y:0}
}
export default function WhyChoose() {
  return (
    <div className='mt-20 md:px-8 px-5'>
      <InViewAnimation className='w-full' delay={0.1}>
      <h1 className='text-foreground text-4xl md:text-5xl text-center font-extrabold '>What Sets Us Apart !!</h1>
      </InViewAnimation>
      <InViewAnimation className='w-full' delay={0.2}>
      <p className='text-foreground/80 mt-2 mb-12 break-words whitespace-normal text-center'>We’re not just a company, we’re a partner in your digital journey.</p>
      </InViewAnimation>
      <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className="sm:max-w-[56vw] max-w-[70vw] md:max-w-[70vw] relative overflow-visible md:mx-auto mx-auto mt-8 mb-3">
      <Slider className="slick-dots-visible" {...settings}>
      {
        chooseUsData && chooseUsData.map((chooseUs, index) => (
            <motion.div className='w-[80%] p-4 sm:w-[60%] md:w-[22%]' key={index} variants={itemVariants}>
          <Card key={index} className='w-[95%] sm:w-4/5 md:w-[290px] shadow-foreground/20 shadow-md hover:shadow-lg transition-shadow duration-300'>
            <CardHeader className=' flex flex-col justify-center items-center'>
          <img src={chooseUs.image} alt="aboutImage" className=' rounded-xl mx-auto md:mx-0' />
          <h1 className='text-foreground text-xl mt-8 mb-1 md:text-2xl font-extrabold'>{chooseUs.title}</h1>
          <p className='text-foreground/80 break-words whitespace-normal text-sm md:text-base '>{chooseUs.description}</p>
          </CardHeader>
          </Card></motion.div>))
      }
      </Slider>
      </motion.div>
    </div>
  )
}
