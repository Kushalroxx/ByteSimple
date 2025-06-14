import AboutUs from '@/components/sections/aboutUs'
import React from 'react'

export default async function page({params}:{params:{slug:string[]}}) {
  return (
    <div>
      <AboutUs slug={params.slug}/>
    </div>
  )
}
