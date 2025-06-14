import React from 'react'
import ServiceHero from '../majorUi/serviceHero'
import ServiceContainer from '../majorUi/serviceContainer'
import { serviceInterface } from '@/lib/interfaces'
import WhyChoose from '../majorUi/whyChoose'
import ServiceCTA from '../majorUi/serviceCTA'
import IndustriesSection from '../majorUi/industriesSection'

export default function Services({
  services,
}:{
  services?:serviceInterface[]
}) {
  return (
    <div className='flex flex-col gap-16 md:gap-0 md:px-8 px-5 bg-black'>
      <ServiceHero/>
      <ServiceContainer services={services}/>
      <WhyChoose/>
      <IndustriesSection/>
      <ServiceCTA/>
    </div>
  )
}
