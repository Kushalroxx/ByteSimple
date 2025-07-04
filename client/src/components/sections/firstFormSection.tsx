import React from 'react'
import { Input, Label, Textarea } from '../ui'

export default function FirstFormSection({
    projectName, 
    setProjectName, 
    projectDesc, 
    setProjectDesc
}:{
    projectName:string,
    setProjectName:React.Dispatch<React.SetStateAction<string>>,
    setProjectDesc:React.Dispatch<React.SetStateAction<string>>,
    projectDesc:string
}) {
  return (
    <div className="space-y-6 w-full">
  <div className="flex flex-col">
    <Label className="text-sm md:text-base font-semibold mb-1 text-foreground">
      Project Name
    </Label>
    <Input
      placeholder="Enter project name"
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      className="rounded-lg text-base"
    />
  </div>

  <div className="flex flex-col">
    <Label className="text-sm md:text-base font-semibold mb-1 text-foreground">
      Description
    </Label>
    <Textarea
      placeholder="Describe your project..."
      value={projectDesc}
      onChange={(e) => setProjectDesc(e.target.value)}
      className=" md:min-h-[120px] rounded-lg text-base"
    />
  </div>
</div>
  )
}
