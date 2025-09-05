import React from 'react'
import Editor from './editor'
import { serverUrl } from '@/lib/exportEnv'
import axios from 'axios'
import { blogInterface } from '@/lib/interfaces'
import { Card, CardContent, CardTitle } from '../ui'

export default async function DisplayBlog({slug}:{
    slug:string
}) {
    let blog: blogInterface|undefined = undefined
    try {
        const res = await fetch(`${serverUrl}/blog/${slug}`,{next:{revalidate:604800}})
        const data =  await res.json()
        blog = data.blog
        
         
    } catch (error) {
        console.log(error);
        
    }
    if (!blog) {
        return(
            <CardTitle>blog not found</CardTitle>
        )
    }
    
  return (
    <div className='min-h-screen pt-24'>
        
        <Editor blog={blog} editable={false}/>      
    </div>
  )
}
