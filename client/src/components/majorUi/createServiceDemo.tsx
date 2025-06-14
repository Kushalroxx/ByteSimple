import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from '../ui'
import { Label } from '@radix-ui/react-label'

export default function CreateServiceDemo({
    setChange,
    editVideo,
    editDemoName,
    editDescription,
    _id
  }:{
    _id?:string,
    editVideo?:string,
    editDemoName?:string,
    editDescription?:string,
    setChange:React.Dispatch<React.SetStateAction<boolean>>
  }) {
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState("")
      const [demoName, setDemoName] = useState("")
      const [video, setVideo] = useState("")
      const [description, setDescription] = useState("")
      const router = useRouter()
      useEffect(() => {
        setDemoName(editDemoName||"")
        setVideo(editVideo||"")
        setDescription(editDescription||"")
      },[editDemoName, editVideo, editDescription])
      const onSubmit = async() => {
        if (editDescription && editVideo&&editDemoName) {
          try {
            setLoading(true) 
            const serviceDemo = await axios.put(`${serverUrl}/admin/service-demo?id=${_id}`,{
              demoName,
              video,
              description
            },
          {
            withCredentials:true
          })
          router.push("/servicedemo")
          setDemoName("")
          setVideo("")
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
              const serviceDemo = await axios.post(`${serverUrl}/admin/service-demo`,{
                  demoName,
                  video,
                  description
              },{withCredentials:true})
              setLoading(false)
              setChange(prev=>!prev)
              
            } catch (error) {
              if (error instanceof AxiosError) {
                console.log(error);
                
                setError(error.response?.data.message)
                if(error.status === 401){
                  router.push("/signin")
                }
              }
            }finally{
            setDemoName("")
            setVideo("")
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
              {editDemoName?"Update":"Create"} Service Demo
              </CardTitle>
          </CardHeader>
          <form 
              onSubmit={(e)=>{e.preventDefault()}}>
          <CardContent 
          className='space-y-4 flex flex-col'>
          <Label 
          htmlFor='DemoNameInput' 
          className='text-lg'>
              Demo Name
              </Label>
        <Input 
        value={demoName}
        onChange={(e)=>{
          setError("")
          setDemoName(e.target.value)
          }}
          id='DemoNameInput' 
          placeholder='Enter the Demo Name' 
          type="text"/>
          <Label 
          htmlFor='VideoInput' 
          className='text-lg'>
              Video
              </Label>
        <Input 
        value={video}
        onChange={(e)=>{
          setError("")
          setVideo(e.target.value)
          }}
          id='VideoInput' 
          placeholder='Enter the actual video url' 
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
          {editDemoName?"Update":"Create"}
        </Button>
        </CardContent>
              </form>
        </Card>
    )
  }
  