"use client"
import React, { useEffect } from 'react'
import { CardTitle, Loader } from '../ui'
import axios, { AxiosError } from 'axios'
import { serverURL } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'
import { serviceIntqerface } from '@/lib/interfaces'
import ServiceCard from '../majorUi/serviceCard'
import CreateServices from '../majorUi/createServices'

export default function Services({slug}:{slug:string[]}) {
    const router = useRouter()
    const [change, setChange] = React.useState(false)
    const [services, setServices] = React.useState<serviceIntqerface[]|null|"">(null)
    useEffect(()=>{
        const getServices = async()=>{
            try {
                const res = await axios.get(`${serverURL}/service`,{
                    withCredentials:true                   
                })
                setServices(res.data.services)
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.status === 404) {
                        setServices("")
                    }
                    if (error.status === 401) {
                        router.push("/signin")
                    }
                }
            }
        }
        getServices()
    },[change])
    if (services === null) {
        return (
            <Loader/>
        )
    }
    if (slug && slug.length>0) {
        const service = services && services.find(service=>{
            return service._id === slug[0]
        })
        return(
            <div className='flex h-screen justify-center items-center'>
                {
                service &&
                <CreateServices _id={slug[0]} setChange={setChange} editServiceName={service.serviceName} editImage={service.image} editDescription={service.description}/>
                }
            </div>
        )
    }
  return (
    <div className='overflow-y-scroll  flex flex-wrap justify-center gap-4 pt-7 bg-background/90 items-center h-screen w-full px-2'>
        {
            services===""?
            <div className='flex  justify-center mr-9 items-center '>
                <CardTitle className='text-3xl'>Your services will shown here</CardTitle>
            </div>
            :
            services.map((service)=>{
            return(
                    <ServiceCard _id={service._id} setChange={setChange} key={service._id} serviceName={service.serviceName} description={service.description} image={service.image} />
                )

            })
        }
        <CreateServices setChange={setChange}/>
    </div>
  )
}
