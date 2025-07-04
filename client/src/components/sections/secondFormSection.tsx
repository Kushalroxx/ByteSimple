import { Label } from '@radix-ui/react-label'
import React from 'react'
import {
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '../ui'

export default function SecondFormSection({
  designPreference,
  setDesignPreference,
  projectType,
  setProjectType,
  urgency,
  setUrgency,
  projectLink,
  setProjectLink
}:{
  projectLink:string,
  setProjectLink:React.Dispatch<React.SetStateAction<string>>,
  designPreference:string,
  setDesignPreference:React.Dispatch<React.SetStateAction<string>>,
  projectType:string,
  setProjectType:React.Dispatch<React.SetStateAction<string>>,
  urgency:string,
  setUrgency:React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div>
      <div className='w-full space-y-6'>
        <div className='flex flex-col gap-1'>
          <Label className='text-sm md:text-base font-semibold text-foreground '>Design Preference</Label>
          <Textarea value={designPreference} onChange={(e) => setDesignPreference(e.target.value)} className=" md:min-h-[90px] rounded-lg text-base" placeholder='Enter design preference' />
        </div>
        <div className='flex flex-col sm:flex-row gap-8'>
        <div className=' flex items-center gap-4'>
          <Label className='text-sm md:text-base font-semibold text-foreground '>Project Type:</Label>
          <Select value={projectType} onValueChange={(value) => {
            setProjectLink("")
            setProjectType(value)}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
              <SelectLabel>Project Type</SelectLabel>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="fullstack">Full Stack</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="feature">Add Feature</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=' flex items-center gap-4'>
          <Label className='text-sm md:text-base font-semibold text-foreground '>Urgency:</Label>
          <Select value={urgency} onValueChange={(value) => setUrgency(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
              <SelectLabel>Urgency</SelectLabel>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="not-urgent">Not Urgent</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        </div>
       {
        projectType === 'feature' && (
           <div className='flex flex-col gap-1'>
          <Label className='text-sm md:text-base font-semibold text-foreground '>Project Link</Label>
          <Input value={projectLink} onChange={(e) => setProjectLink(e.target.value)} className=" rounded-lg text-base" placeholder='Enter Your project link' />
        </div>
        )
       }
      </div>
    </div>
  )
}
