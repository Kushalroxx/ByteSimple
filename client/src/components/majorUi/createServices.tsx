"use client"
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea } from '../ui'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'

export default function CreateServices({
  editServiceName,
  setChange,
  editImage,
  editDescription,
  _id
}:{
  editServiceName?:string,
  _id?:string,
  editImage?:string,
  editDescription?:string,
  setChange:React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [serviceName, setServiceName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter()
    useEffect(() => {
      setServiceName(editServiceName||"")
      setImage(editImage||"")
      setDescription(editDescription||"")
    },[editImage, editDescription, editServiceName])
    const onSubmit = async() => {
      if (editDescription && editImage && editServiceName) {
        try {
          setLoading(true)
        await axios.put(`${serverUrl}/admin/service?id=${_id}`,{
            serviceName,
            image,
            description
          },
        {
          withCredentials:true
        })
        router.push("/services")
        setImage("")
        setServiceName("")
        setDescription("")
        } catch (error) {
          if (error instanceof AxiosError) {
            setError(error.response?.data.message)
            if(error.status === 401){
              router.push("/signin")
            }            
          }
        }finally{
          setLoading(false)
        }
        return
      }
        try {
            setLoading(true)
            await axios.post(`${serverUrl}/admin/service`,{
                serviceName,
                image,
                description
            },{withCredentials:true})
            setLoading(false)
            setChange(prev=>!prev)
            
          } catch (error) {
            console.log(error);
            
            if (error instanceof AxiosError) {
              setError(error.response?.data.message)
              if(error.status === 401){
                router.push("/signin")
              }
            }
          }finally{
          setImage("")
          setDescription("")
          setLoading(false)
        }
    }
  return (
    
        <Card 
        className='flex flex-col gap-4 w-full md:3/4 lg:w-1/2'>
        <CardHeader>
        <CardTitle 
        className='text-3xl font-extrabold'>
            {editImage?"Update":"Create"} services
            </CardTitle>
        </CardHeader>
        <form 
            onSubmit={(e)=>{e.preventDefault()}}>
        <CardContent 
        className='space-y-4 flex flex-col'>
        <Label 
        htmlFor='serviceNameInput' 
        className='text-lg'>
            Service Name
            </Label>
      <Input 
      value={serviceName}
      onChange={(e)=>{
        setError("")
        setServiceName(e.target.value)
        }}
        id='serviceNameInput' 
        placeholder='Enter the service name' 
        type='text'/>
        <Label 
        htmlFor='imageInput' 
        className='text-lg'>
            Image
            </Label>
      <Input 
      value={image}
      onChange={(e)=>{
        setError("")
        setImage(e.target.value)
        }}
        id='imageInput' 
        placeholder='Enter the actual image url' 
        type='url'/>
      <Label 
      htmlFor='descriptionInput' 
      className='text-lg'>
        Description
      </Label>
      <Textarea
      value={description}
      onChange={(e)=>{
        setError("")
        setDescription(e.target.value)
      }} 
      id='descriptionInput' 
      placeholder='Enter the description' 
      className='max-h-[200px] w-full' 
      style={{fontSize:"17px"}}/>
      <Label>{error}</Label>
      <Button 
      onClick={()=>{onSubmit()}}
      type='submit' 
      className=''>
        {editImage?"Update":"Create"}
      </Button>
      </CardContent>
            </form>
      </Card>
  )
}
