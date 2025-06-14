"use client"
import React from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '../ui'
import DeleteButton from './deleteButton'
import { useRouter } from 'nextjs-toploader/app'
import { serverURL } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'

export default function ServiceDemoCard({
    video,
    setChange,
    demoName,
    description,
    _id
}:{
    setChange:React.Dispatch<React.SetStateAction<boolean>>,
    _id?:string,
    demoName:string,
    description:string,
    video:string,
}) {
    const router = useRouter()
    const handleDelete = async() => {
      try{
        const res = await axios.delete(`${serverURL}/admin/service-demo?id=${_id}`,{withCredentials:true})
        setChange(prev=>!prev)
      }catch(error){
        if (error instanceof AxiosError) {
          if(error.status === 401){
            router.push("/signin")
          }
        } 
      }
    }
  return (
    <Card className='relative flex flex-col justify-center items-center'>
        <Button onClick={() => router.push(`/servicedemo/${_id}`)} className='absolute top-2 right-11 bg-foreground text-background rounded-lg h-7 w-7 text-xs font-extrabold'>✏️</Button>
        <DeleteButton handleDelete={handleDelete}/>
        <CardHeader>
            <CardTitle>{demoName}</CardTitle>
        </CardHeader>
        <video
         className='w-sm rounded-lg'
        loop
        muted
        onMouseOver={e=>e.currentTarget.play()}
        onMouseLeave={e=>e.currentTarget.pause()}
        controls={false} 
        src={video} />
            <p className='text-lg text-foreground/87 break-words whitespace-normal'>{description}</p>
      </Card>
  )
}
