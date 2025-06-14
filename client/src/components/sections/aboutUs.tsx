"use client"
import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Loader } from '../ui'
import CreateAbout from '../majorUi/createAbout'
import AboutCard from '../majorUi/aboutCard'
import { useAtom } from 'jotai'
import { aboutAtom } from '@/lib/atoms'

export default function AboutUs({slug}:{slug:string[]}) {
  const router = useRouter()
  const [change, setChange] = React.useState<boolean>(false)
  const [aboutData, setAboutData] = useAtom(aboutAtom)
  useEffect(() => {
    const getAbout = async () => {
      try {
        const res = await axios.get(`${serverUrl}/about`,{
          withCredentials:true
        })
        setAboutData(res.data.about&&res.data.about)
        console.log(res.data);
        
      } catch (error) {
        if (error instanceof AxiosError) {
          if(error.status === 404) {
            setAboutData("")
          }
          if(error.status === 401){
            router.push("/signin")
          }}
            
      }
    }
    getAbout()
  },[change])
  if (aboutData === null) {
  return(<Loader/>)
}
if (slug&&slug.length>0) {
  const about = aboutData && aboutData.find((data)=>{
    return data._id===slug[0]
  })
  return (
    <div className='flex flex-wrap justify-center gap-2 pt-7 bg-background/90 items-start h-screen w-full px-2'>
      {
        about&&
        <CreateAbout _id={slug[0]} setChange={setChange} editImage={about.image} editDescription={about.description}/>
     }
      </div>
)}
  return (
    <div className='overflow-y-scroll flex flex-wrap justify-center gap-4 py-7 bg-background/90 items-center h-screen w-full px-2'>
      {
        aboutData===""?
        <div className='flex flex-col justify-center items-center pt-2 pr-4'>
        <h1 className='text-3xl text-foreground font-extrabold'>Your about will be shown here</h1>
      </div>
      :
      aboutData.map((data)=>{
        return(
          <AboutCard setChange={setChange} _id={data._id} key={data._id} image={data.image} description={data.description}/>
        )
      })
  }
  <CreateAbout setChange={setChange}/>
    </div>
  )
}
