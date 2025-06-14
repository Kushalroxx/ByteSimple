"use client"
import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Loader } from '../ui'
import ServiceDemoCard from '../majorUi/serviceDemoCard'
import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import { serviceDemosInterface } from '@/lib/interfaces'
import CreateServiceDemo from '../majorUi/createServiceDemo'

export default function ServiceDemo({
  slug
}:{slug:string[]
}) {
  const [change, setChange] = React.useState(false)
  const [serviceDemo, setServiceDemo] = React.useState<serviceDemosInterface[]|null|"">(null)
  const router =useRouter()
  useEffect(() => {
    const getServiceDemo = async() => {
      try{
        const res = await axios.get(`${serverUrl}/service-demo`,{withCredentials:true})
        setServiceDemo(res.data.serviceDemo)
      }catch(error){
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            setServiceDemo("")
            
          }
          if(error.status === 401){
            router.push("/signin")
          }
        }
    }
  }
  getServiceDemo()
  },[change])
  if (serviceDemo === null) {
    return (
      <Loader/>
    )
  }
  if (slug && slug.length>0) {
    const service =serviceDemo&& serviceDemo.find((demo) => demo._id === slug[0])
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        {
          service &&
          <CreateServiceDemo editDemoName={service.demoName} editVideo={service.video} editDescription={service.description} setChange={setChange} _id={slug[0]}/>
        }
      </div>
    )
  }
  return (
    <>
      <div className='overflow-y-scroll  flex flex-wrap justify-center gap-4 pt-7 bg-background/90 items-center h-screen w-full px-2'>
        {
          serviceDemo === ""?
          <div className='flex  justify-center mr-9 items-center '>
          <CardTitle className='text-xl'>
            Your Service Demo will be shown here
          </CardTitle>
          </div>
          :
          serviceDemo.map((demo)=>{
            return(
              <ServiceDemoCard setChange={setChange} key={demo._id} _id={demo._id} demoName={demo.demoName} description={demo.description} video={demo.video}/>
            )
          })
        }
        <CreateServiceDemo setChange={setChange}/>
      </div>
    </>
  )
}
