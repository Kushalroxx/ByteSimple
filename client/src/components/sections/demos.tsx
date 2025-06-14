import React from 'react'
import DemosHero from '../majorUi/demosHero'
import DemoVideoSection from '../majorUi/demoVideoSection'
import { serviceDemosInterface } from '@/lib/interfaces'
import DemoCTA from '../majorUi/demoCTA'

export default function Demos({
  serviceDemos
}:{
  serviceDemos?:serviceDemosInterface[]
}) {
  return (
    <div className='flex flex-col pb-10 md:gap-16 md:px-8 px-5'>
      <DemosHero/>
      <DemoVideoSection serviceDemos={serviceDemos}/>
      <DemoCTA/>
    </div>
  )
}
