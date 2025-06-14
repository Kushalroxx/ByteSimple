"use client"
import React  from 'react'
import InViewAnimation from './inViewAnimation'
import { serviceInterface } from '@/lib/interfaces'
import ServiceCard from './serviceCard'
import { motion,Variants } from 'framer-motion'
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
export default function ServiceContainer(
    {
      services
    }: {
      services?: serviceInterface[]
    }
) {
  
  return (
    <div className=' '>
        <InViewAnimation className='w-full' delay={0.1}>
      <h1 className='text-foreground text-4xl md:text-5xl text-center font-extrabold'>What We Do The Best !!</h1>
      </InViewAnimation>
      <InViewAnimation className='w-full' delay={0.2}>
        <p className='text-muted-foreground mt-2 md:mt-4 break-words whitespace-normal md:text-lg text-center'>Tailored digital solutions to elevate your online presence.</p>
      </InViewAnimation>
      <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className="max-w-[70vw] sm:max-w-[56vw] relative overflow-visible md:max-w-[70vw] md:mx-auto mx-auto mt-12 mb-3">
      <Slider className="slick-dots-visible" {...settings}>
      {
        services && services.map((service, index) => (
          <motion.div className='py-4 px-1' key={index} variants={itemVariants}>
          <ServiceCard key={index} serviceName={service.serviceName} description={service.description} image={service.image} />
          </motion.div>))
      }
      </Slider>
      </motion.div>
    </div>
  )
}
