import Services from '@/components/sections/servicesAdmin'
import React from 'react'

export default function page({params}:{params:{slug:string[]}}) {
  return (
    <div>
      <Services slug={params.slug}/>
    </div>
  )
}
