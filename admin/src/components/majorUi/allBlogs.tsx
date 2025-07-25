import { serverURL } from '@/lib/exportEnv'
import axios from 'axios'
import React from 'react'
import BlogCard from './blogCard'
import { allBlogsInterface } from '@/lib/interfaces'
import { CardTitle } from '../ui'
import Link from 'next/link'

export const revalidate  = 0
export default async function AllBlogs() {
    let blogs 
   try {
    const res =  await axios.get(`${serverURL}/blogs`)
    blogs = res.data.blogs as allBlogsInterface[]
   } catch (error) {
    console.log(error);
    
   }
   console.log(blogs);
   
  return (
    < div className='max-h-screen overflow-y-auto'>
      <div className=' flex justify-center mt-3'>
      <CardTitle className=''>Want to Create?<Link className=' hover:text-blue-500 hover:underline' href={"/blog/create"}> click here ...</Link></CardTitle>
      </div>
    <div className='flex flex-wrap justify-center items-center gap-2 p-2'>
      {
        blogs && blogs.map((blog)=>{
          return(
            <BlogCard _id={blog._id} slug={blog.slug} title={blog.blogName} link={blog.links[0]} description={blog.description} key={blog._id}/>
          )
        })}
    </div>
        </div>
  )
}
