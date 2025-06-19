"use client"
import React from 'react'
import { Button, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui'
import InViewAnimation from './inViewAnimation'

export default function ProjectFilter({
    onSelect, 
    onInputChange
}:{
    onSelect:(value:string) => void, 
    onInputChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
      <InViewAnimation delay={0.3}>
      <div className='flex items-center pt-8'>
        <label className='md:pr-2 text-sm md:text-base' htmlFor="filter">Filter projects:</label>
          <Select onValueChange={onSelect}>
            <SelectTrigger id='filter' className='bg-transparent border border-foreground/20 px-3 py-1 rounded-md hover:bg-foreground/5 hover:border-foreground/30'><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent >
                <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='reviewed'>Reviewed</SelectItem>
                <SelectItem value='quoted'>Quoted</SelectItem>
                <SelectItem value='client-countered'>Client Countered</SelectItem>
                <SelectItem value='final-countered'>Final Countered</SelectItem>
                <SelectItem value='approved'>Approved</SelectItem>
                <SelectItem value='in-progress'>In Progress</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
                <SelectItem value='cancelled'>Cancelled</SelectItem>
                </SelectGroup>
            </SelectContent>
            
        </Select>
        <Input  onChange={onInputChange} placeholder='Search projects by name' className='w-1/2 lg:w-1/3 ml-8 md:ml-12'  />
      </div>
      </InViewAnimation>
  )
}
