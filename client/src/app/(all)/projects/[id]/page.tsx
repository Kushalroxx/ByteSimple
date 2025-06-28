import ClientProject from '@/components/sections/clientProject'
import React from 'react'

export default async function page({params}:{params:{id:string}}) {
    const Params = await params
    const id = Params.id 
  return (
    <div>
      <ClientProject id={id}/>
    </div>
  )
}
