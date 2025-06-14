"use client"
import React from 'react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui'
import { JSONContent } from '@tiptap/react'
import Link from 'next/link'
import { MdDelete } from "react-icons/md";
import DeleteButton from './deleteButton';
import axios, { AxiosError } from 'axios'
import { serverURL } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'

export default function BlogCard({_id,title,link,slug, description}:{
    title:string,
    link: string,
    slug: string,
    description:JSONContent,
    _id:string
}) {
  const router = useRouter()
  const firstParagraph = description[0].content?.find((item:any,index:number) =>{
    return item.type === "paragraph"
  })

  const handleDelete = async() => {
    try{
      const res = await axios.delete(`${serverURL}/admin/blogs?id=${_id}`,{withCredentials:true})
      router.refresh()
    }catch(error){
      if (error instanceof AxiosError) {
        if(error.status === 401){
          router.push("/signin")
        }
      } 
    }
  }
  
  return (
    <Card className='relative w-4/5 md:w-2/5 '>
      <DeleteButton handleDelete={()=>{handleDelete()}} />
    <Link  className=' flex flex-col gap-4 p-5 ' href={`/blog/${slug}`}>
      <CardHeader className=' flex justify-center items-center'>
        <img className=' rounded-md' src={link} alt={title} />
      </CardHeader>
      <CardContent className='text-xl flex justify-center items-center'>
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <CardDescription className='flex justify-center items-center'>
        {
          firstParagraph && (
            <p className='break-words whitespace-normal'>{firstParagraph.content[0].text.slice(0,170)+"..."}</p>
          )
            }
      </CardDescription>
    </Link>
    </Card>
  )
}
