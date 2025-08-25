"use client"
import React from 'react'
import InViewAnimation from './inViewAnimation'
import { Variants, motion } from 'framer-motion'
import { Button, Card, CardDescription, CardHeader } from '../ui'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from 'next/navigation'

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
    title: "Fast Turnaround",
    description:
      "We understand time is money. Our agile development approach means your project moves quickly from idea to launch — with regular progress updates, early access to features, and no unnecessary delays. You get to market faster without compromising on quality.",
    image: "./assets/timeHome.svg",
  },
  {
    title: "Tailored Solutions",
    description:
      "No cookie-cutter templates here. Every website we build is customized to reflect your brand, target audience, and business objectives. Whether it's a sleek portfolio or a scalable e-commerce platform, we make sure it’s built to solve your unique challenges.",
    image: "./assets/solutionHome.svg",
  },
  {
    title: "Practical Strategy",
    description:
      "We don’t just build websites — we help you validate and scale ideas. From MVP planning to performance optimization, we apply real-world strategies to ensure every decision supports long-term growth, not just launch day success.",
    image: "./assets/strategyHome.svg",
  },
  {
    title: "Clear Communication",
    description:
      "No confusing tech talk or vague timelines. We keep you in the loop with regular updates, honest estimates, and open feedback loops. Our process is transparent, collaborative, and designed to give you confidence at every stage of the project.",
    image: "./assets/communicationHome.svg",
  }
];

export default function HomeWorkWithUs() {
  const router = useRouter()
  return (
    <div id='caseStudies' className=' pt-20 md:pt-28 px-2'>
      <InViewAnimation >
      <h1 className='text-foreground text-4xl md:text-5xl text-center font-extrabold'>We Don’t Just Build Websites — We Build Solutions</h1>
      </InViewAnimation>
      <InViewAnimation >
      <p className='text-muted-foreground mt-8 break-words whitespace-normal md:text-lg text-center'>From startups to growing brands, we deliver scalable and performant websites tailored to your business. We bring a no-fluff, high-impact approach to every project — with clean code, fast loading speeds, and SEO in mind.</p>
      </InViewAnimation>
        <div className="max-w-6xl mx-auto pt-28 mb-3 space-y-36">
        {
          trustBuilders && trustBuilders.map((trustBuilder, index) => (
            <InViewAnimation whileHover={{scale: 1.005}} key={index} >
            <div>
              <CardHeader className='flex flex-col md:flex-row justify-center items-center md:gap-16 gap-8'>
                <img src={trustBuilder.image} alt="aboutImage" className='w-[90%] md:w-[340px]' />
              <CardDescription>
                 <h1 className='text-foreground text-2xl mb-4 md:mb-6 md:text-3xl font-extrabold tracking-tight'>{trustBuilder.title}</h1>
                <p className='text-foreground/60 break-words whitespace-normal text-sm md:text-base tracking-tight'>{trustBuilder.description}</p>
                <div className='md:mt-10 mt-8 flex items-center gap-5'>
                <span>Ready for real result ?</span> <Button onClick={e=>{router.push("/contact")}} 
                className='font-semibold text-sm  px-3 '>Book a call NOW!</Button>
                </div>
              </CardDescription>
              </CardHeader>
            </div>
            </InViewAnimation>))
        }
        </div>
    </div>
  )
}
