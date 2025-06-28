import AdminProject from '@/components/sections/adminProject'
import React from 'react'

export default async function page({params}:{params:{id:string}}) {
  const Params = await params
  const id = Params.id
  return (
    <div>
      <AdminProject id={id}/>
    </div>
  )
}
