"use client"
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'
import { cn } from '@/lib/utils'

export default function ToolTipProvider({
    onClick,
    children,
    toolTip,
    className,
    disabled,
}:{
    disabled?:boolean
    className?:string
    onClick?:React.MouseEventHandler<HTMLButtonElement>,
    children:React.ReactNode,
    toolTip:string
}) {
  return (
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger disabled={disabled} className={cn(` bg-foreground text-background rounded-sm w-7 h-7 flex justify-center items-center ${className}`)} onClick= {onClick}>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{toolTip}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

  )
}
