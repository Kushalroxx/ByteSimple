"use client"
import React from 'react'
import HomeHero from '../majorUi/homeHero'
import HomeWorkWithUs from '../majorUi/homeWorkWithUs'
import ServiceContainer from '../majorUi/serviceContainer'
import { serviceDemosInterface, serviceInterface } from '@/lib/interfaces'
import ServiceCTA from '../majorUi/serviceCTA'
import DemoVideoSection from '../majorUi/demoVideoSection'
import Footer from './footer'
import TestimonialsSection from '../majorUi/testimonialsSection'
import EngagementModelsSection from '../majorUi/engagementModelsSection'
import TechStack from '../majorUi/techStag'
import Faq from '../majorUi/faq'
import { useAtom } from 'jotai'
import { navOpenAtom } from '@/lib/atoms'

export default function LandingPage({
    services,
    serviceDemo
}:{
    services?:serviceInterface[],
    serviceDemo?:serviceDemosInterface[]
}) {
  const [isopen, setIsOpen] = useAtom(navOpenAtom)
  return (
    <div onClick={e=>{
      e.stopPropagation()
      setIsOpen(false)
    }} className='w-full overflow-x-hidden bg-gradient-to-bl from-black via-gray-900 to-black'>
      <HomeHero/>
      <div className='px-4 md:px-10 space-y-24'>
      <HomeWorkWithUs/>
      <ServiceContainer services={services}/>
      <div className='mt-20'>
        <TestimonialsSection/>
      </div>
      {/* <EngagementModelsSection/> */}
      {/* <TechStack/> */}
      <Faq/>
      <ServiceCTA/>
      </div>
      <Footer/>
    </div>
  )
}
