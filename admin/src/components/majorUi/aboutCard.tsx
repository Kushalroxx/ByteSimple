"use client"
import React from 'react'
import { Button, Card, CardContent, CardTitle } from '../ui'
import axios, { AxiosError } from 'axios'
import { serverURL } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app' 
import DeleteButton from './deleteButton'

export default function AboutCard({
    setChange,
    _id,
    image,
    description
}:{
    setChange:React.Dispatch<React.SetStateAction<boolean>>,
    _id:string,
    image:string,
    description:string
}) {
  const router = useRouter()
  const handleDelete = async() => {
    try{
      console.log(_id);
      
      const res = await axios.delete(`${serverURL}/admin/about?id=${_id}`,{withCredentials:true})
      setChange(prev=>!prev)
    }catch(error){
      if (error instanceof AxiosError) {
        if(error.status === 401){
          router.push("/signin")
        }
        
      }
      console.log(error);
      
    }
  }
  return (
    <Card className='relative'>
      <Button onClick={()=>router.push(`/aboutus/${_id}`)} className='absolute top-2 right-11 bg-foreground text-background rounded-lg h-7 w-7 text-xs font-extrabold'>✏️</Button>
      <DeleteButton handleDelete={handleDelete}/>

      <CardContent className=''>
        <img alt="aboutImage" src={image} className='h-[300px] rounded-lg '/>
        <CardTitle className='text-wrap mt-3 text-lg'>{description}</CardTitle>
      </CardContent>
    </Card>
  )
}