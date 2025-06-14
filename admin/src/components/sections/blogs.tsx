import React from 'react'
import CreateBlog from './createBlog'

export default function Blogs({slug}:{slug:string[]}) {
  return (
    <div className='h-screen'>
      <CreateBlog/>
    </div>
  )
}
