"use client"
import { Button, Card, CardTitle } from '@/components/ui'
import React from 'react'

export default function GlobalError({
    error,
    reset,
}:{
    error:Error,
    reset:()=>void
}) {
  return (
    <div className='bg-background flex justify-center items-center h-screen'>
        <Card className='flex flex-col gap-4 p-9'>
      <CardTitle>Something went wrong!!</CardTitle>
      <Button onClick={()=>{reset()}}>Try again</Button>
      </Card>
    </div>
  )
}
