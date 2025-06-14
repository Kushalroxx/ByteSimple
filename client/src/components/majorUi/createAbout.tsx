"use client"
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea } from '../ui'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'

export default function CreateAbout({
  setChange,
  editImage,
  editDescription,
  _id
}:{
  _id?:string,
  editImage?:string,
  editDescription?:string,
  setChange:React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter()
    useEffect(() => {
      setImage(editImage||"")
      setDescription(editDescription||"")
    },[editImage, editDescription])
    const onSubmit = async() => {
      if (editDescription && editImage) {
        try {
          setLoading(true) 
          const about = await axios.put(`${serverUrl}/admin/about?id=${_id}`,{
            image,
            description
          },
        {
          withCredentials:true
        })
        router.push("/aboutus")
        setImage("")
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
            const about = await axios.post(`${serverUrl}/admin/about`,{
                image,
                description
            },{withCredentials:true})
            setLoading(false)
            setChange(prev=>!prev)
            
          } catch (error) {
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
            {editImage?"Update":"Create"} About
            </CardTitle>
        </CardHeader>
        <form 
            onSubmit={(e)=>{e.preventDefault()}}>
        <CardContent 
        className='space-y-4 flex flex-col'>
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
