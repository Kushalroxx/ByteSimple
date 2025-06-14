import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui'

export default function DashboardCards({
    name, 
    count
}:{
    name:string,
    count:number
}) {
  return (
      <Card className='flex flex-col gap-4 w-[200px] md:w-[280px] h-[200px]'>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
            {count}
        </CardContent>
      </Card>
  )
}
