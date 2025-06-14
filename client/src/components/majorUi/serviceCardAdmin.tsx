import React from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '../ui'
import DeleteButton from './deleteButton'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'

export default function ServiceCard({
    _id,
    setChange,
    serviceName,
    description,
    image
}:{
    _id?:string,
    setChange:React.Dispatch<React.SetStateAction<boolean>>,
    serviceName:string,
    description:string,
    image:string
}) {
  const router = useRouter()
  const handleDelete = async() => {
    try{
      const res = await axios.delete(`${serverUrl}/admin/service?id=${_id}`,{withCredentials:true})
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
    <Card className='w-full md:w-2/5 relative'>
      <Button onClick={() => router.push(`/admin/services/${_id}`)} className='absolute top-2 right-11 bg-foreground text-background rounded-lg h-7 w-7 text-xs font-extrabold'>✏️</Button>
      <DeleteButton handleDelete={handleDelete}/>
      <CardHeader className='flex justify-center items-center'>
        <img className='w-full md:w-[89%] rounded-md' src={image} alt="Service Image" />
      </CardHeader>
      <CardContent className=' space-y-1.5'>
        <CardTitle className='text-2xl'>{serviceName}</CardTitle>
        <p className='text-foreground/87 text-wrap'>{description}</p>
      </CardContent>
    </Card>
  )
}
