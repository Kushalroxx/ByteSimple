import AllBlogs from '@/components/majorUi/allBlogs'
import Editor from '@/components/majorUi/editorAdmin';
import { serverUrl } from '@/lib/exportEnv';
import axios, { AxiosError } from 'axios';
import React from 'react'

export const revalidate  = 0;
export default async function page({params}:{params:{slug:string[]}}) {
  if(params.slug && params.slug[0]){
    let blog
  try {
    const res = await axios.get(`${serverUrl}/blog/${params.slug[0]}`,{withCredentials:true})
    blog = res.data.blog
  } catch (error) {
  }
  return(
    <Editor editable={true} _id={blog?._id} editDescription={blog?.description} editTitle={blog?.blogName} editUrl={blog?.links[0]}/>
  )
  }
  return (
    <>
      <AllBlogs/>
    </>
  )
}
