import React from 'react'
import { Input, Textarea } from '../ui'
import { Label } from '@radix-ui/react-label'

export default function ThirdFormSection({
  techPreference,
  setTechPreference,
  maxBudget,
  minBudget,
  setMaxBudget,
  setMinBudget
}:{
  techPreference:string,
  setTechPreference:React.Dispatch<React.SetStateAction<string>>, 
  minBudget:string,
  maxBudget:string,
  setMinBudget:React.Dispatch<React.SetStateAction<string>>,
  setMaxBudget:React.Dispatch<React.SetStateAction<string>> 
}) {
  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col gap-1'>
        <Label className='text-sm md:text-base font-semibold text-foreground '>Tech Preference</Label>
        <Textarea value={techPreference} onChange={(e) => setTechPreference(e.target.value)} className=" md:min-h-[90px] rounded-lg text-base" placeholder='Enter tech preference(eg: React, Next.js)' />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='text-sm md:text-base font-semibold text-foreground '>Budget</Label>

        <div className='flex gap-4'>
        <div className='flex items-center gap-4'>
        <Label className='text-sm md:text-base font-semibold text-foreground '>Min:</Label>
        <Input type="number" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} className="rounded-lg text-base" placeholder='Enter budget min' />
        </div>
        <div className='flex items-center gap-4'>
          <Label className='text-sm md:text-base font-semibold text-foreground '>Max:</Label>
        <Input type="number" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} className=" rounded-lg text-base" placeholder='Enter budget max' />
        </div>
        </div>
      </div>
    </div>
  )
}
