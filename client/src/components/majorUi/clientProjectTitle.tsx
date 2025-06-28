import React from 'react'
import { statusMap } from '@/lib/statusMap'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { projectInterface } from '@/lib/interfaces'
import InViewAnimation from './inViewAnimation'
dayjs.extend(relativeTime)

export default function ClientProjectTitle({project}:{project:projectInterface}) {
  return (
    <InViewAnimation delay={0.2}>
  <div className="max-w-6xl mx-auto px-4 py-6 md:flex md:items-center md:justify-between border-b">
  <div>
    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{project?.projectTitle}</h1>
    <p className="text-sm text-muted-foreground mt-1">
      <span className='font-semibold text-foreground/80'>Last updated:</span> {dayjs(project?.updatedAt).fromNow()}
    </p>
  </div>

  <div className={`mt-4 md:mt-0 flex items-center gap-2 ${statusMap[project?.status]?.color}`}>
    <span className="text-lg">{statusMap[project?.status]?.icon}</span>
    <span className="text-base font-medium">{statusMap[project?.status]?.label}</span>
  </div>
</div>
    </InViewAnimation>
  )
}
