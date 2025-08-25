"use client"
import React  from 'react'
import InViewAnimation from './inViewAnimation'
import { serviceInterface } from '@/lib/interfaces'
import ServiceCard from './serviceCard'
import { motion,Variants } from 'framer-motion'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaMobileAlt, FaPalette, FaTools } from "react-icons/fa";
import { FaSearch, FaEnvelopeOpenText } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RiCodeBoxFill } from "react-icons/ri";

const containerVariants:Variants = {
  hidden:{
    opacity:0
  },
  visible:{
    opacity:1,
    transition:{
      delayChildren:0.1,
      staggerChildren:0.1,
  }
}
}
const itemVariants:Variants = {
  hidden:{opacity:0, y:20},
  visible:{opacity:1,y:0}
}
const webServices = [
  {
    title: "Responsive Design",
    description: "Web interfaces that look sharp on phones, tablets, and desktops.",
    icon: <FaMobileAlt/>,
  },
  {
    title: "UI/UX Strategy",
    description: "Thoughtful designs that enhance user interaction and retention.",
    icon: <FaPalette/>,
  },
  {
    title: "Custom Web Apps",
    description: "Dynamic tools tailored to your business workflows.",
    icon: <FaTools/>,
  },
];
const DigitalServices = [
  {
    title: "Search Engine Optimization (SEO)",
    description: "Rank higher on Google and get noticed.",
    icon: <FaSearch/>,
  },
  {
    title: "Social Media Management",
    description: "Grow your brand and connect with your audience.",
    icon: <FiShare2/>,
  },
  {
    title: "Email Marketing",
    description: "Send emails that your customers actually want to read.",
    icon: <FaEnvelopeOpenText/>,
  },
];
const DevServices = [
  {
    title: "Mobile App Development",
    description: "Create sleek, user-friendly apps for your customers.",
    icon: <FaMobileAlt/>,
  },
  {
    title: "Custom Software Development",
    description: "Build solutions that fit your unique needs.",
    icon: <RiCodeBoxFill/>,
  },
];
export default function ServiceContainer(
    {
      services
    }: {
      services?: serviceInterface[]
    }
) {
  
  return (
    <div id='services'>
        <InViewAnimation className='w-full' >
      <h1 className='text-foreground text-4xl md:text-5xl text-center font-extrabold mt-32 md:mt-52'>How We Help You Grow</h1>
      </InViewAnimation>
      <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className="">
        <h1 className='text-foreground text-3xl md:text-4xl text-center font-bold mt-28 md:mt-32'>Web design & Development</h1>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full mx-auto items-center mt-12 justify-center'>
        {
          webServices.map((webService, index) => (
            <motion.div className='' key={index} variants={itemVariants}>
            <ServiceCard key={index} title={webService.title} description={webService.description} icon={webService.icon} />
            </motion.div>
          ))
        }
        </div>
      </motion.div>
      <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className="">
        <h1 className='text-foreground text-3xl md:text-4xl text-center font-bold mt-32'>Digital Marketing & Strategy</h1>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full mx-auto items-center mt-12 justify-center'>
        {
          DigitalServices.map((webService, index) => (
            <motion.div className='' key={index} variants={itemVariants}>
            <ServiceCard key={index} title={webService.title} description={webService.description} icon={webService.icon} />
            </motion.div>
          ))
        }
        </div>
      </motion.div>
      <motion.div variants={containerVariants} initial="hidden"  whileInView={"visible"} viewport={{once:true}} className="">
        <h1 className='text-foreground text-3xl md:text-4xl text-center font-bold mt-32'>Software & App Development</h1>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full mx-auto items-center mt-12 justify-center'>
        {
          DevServices.map((webService, index) => (
            <motion.div className='' key={index} variants={itemVariants}>
            <ServiceCard key={index} title={webService.title} description={webService.description} icon={webService.icon} />
            </motion.div>
          ))
        }
        </div>
      </motion.div>
    </div>
  )
}
