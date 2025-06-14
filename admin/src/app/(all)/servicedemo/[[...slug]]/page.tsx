import ServiceDemo from "@/components/sections/serviceDemo"
import React from 'react'

export default function page({params}:{params:{slug:string[]}}) {
  return (
    <div className="flex max-h-screen flex-col justify-center items-center">
      <ServiceDemo slug={params.slug}/>
    </div>
  )
}
