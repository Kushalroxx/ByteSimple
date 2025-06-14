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
import HowWeWork from '../majorUi/howWeWork'
import EngagementModelsSection from '../majorUi/engagementModelsSection'
import TechStack from '../majorUi/techStag'
import Faq from '../majorUi/faq'

export default function LandingPage({
    services,
    serviceDemo
}:{
    services?:serviceInterface[],
    serviceDemo?:serviceDemosInterface[]
}) {
  return (
    <div className='w-full overflow-x-hidden'>
      <HomeHero/>
      <div className='px-4 md:px-10 mt-30 bg-black'>
      <ServiceContainer services={services}/>
      <HomeWorkWithUs/>
      <div className='mt-20'>
        <TestimonialsSection/>
      </div>
      <HowWeWork/>
      <EngagementModelsSection/>
      <TechStack/>
      <Faq/>
      <ServiceCTA/>
      </div>
      <Footer/>
    </div>
  )
}
