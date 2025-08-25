import DisplayBlog from '@/components/majorUi/displayBlog'
import Blogs from '@/components/sections/blogs'
import { serverUrl } from '@/lib/exportEnv'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: { params: { slug?: string } }): Promise<Metadata> {
  params = await params
  if (!params?.slug) {
    return {
      title: "ByteSimple - All Blogs",
      description: "Explore insightful articles, updates, and stories from the byteSimple blog. Stay informed and inspired with our latest content.",
      openGraph: {
        title: "ByteSimple - All Blogs",
        description: "Explore insightful articles, updates, and stories from the ByteSimple blog. Stay informed and inspired with our latest content.",
        type: "website",
      },
      twitter: {
        title: "ByteSimple - All Blogs",
        description: "Explore insightful articles, updates, and stories from the ByteSimple blog. Stay informed and inspired with our latest content.",
        card: "summary_large_image",
      },
    };
  }
    try {
      const res = await fetch(`${serverUrl}/blog/${params.slug}`,{next:{revalidate:604800}})
      const data = await res.json()
      const blog = data.blog  
      console.log(blog.description[0].content[0].content);
      
      return {
        title: `${blog.blogName} - ByteSimple`,
        description:blog.description[0]?.content[0]?.content?.map((e:any)=>e.text),
        
        openGraph: {
          images:blog.links[0],
          title: `${blog.blogName} - ByteSimple`,
          description:blog.description[0]?.content[0]?.content?.map((e:any)=>e.text),
          type: 'article',
        },
        twitter:{
          images:blog.links[0],
          title: `${blog.blogName} - ByteSimple`,
          description:blog.description[0]?.content[0]?.content?.map((e:any)=>e.text),
        }
      }
    } catch (error) {
      return {
        title: 'Blog not found',
        description: 'The requested blog could not be found.',
      }
    }
  }
export default async function page({params, searchParams}:{
    params:{slug:string[]},
    searchParams: {page?:string}
}) {
  searchParams = await searchParams
    const page = parseInt(searchParams?.page||"1")
    params = await params
  return (
    <div className=''>
    {params?.slug&& params.slug.length>0?
    <DisplayBlog slug={params.slug[0]}/>:
      <Blogs page={page}/>
    }
    </div>
  )
}
