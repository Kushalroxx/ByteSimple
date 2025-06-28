import React from 'react'
import { Badge } from '../ui'
import { projectInterface } from '@/lib/interfaces'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { statusMap } from '@/lib/statusMap'
dayjs.extend(relativeTime)

export default function ClientMoniteringAndCodeLink({project}:{project:projectInterface|null}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 border-t">
  <h2 className="text-xl font-semibold mb-6">Project Progress</h2>

  {/* Status */}
  <div className="flex items-center gap-2 mb-4">
    <Badge variant="outline" className="capitalize">
      Current Status: <span className={`${project?.status&&statusMap[project?.status].color}`}>{project?.status&&statusMap[project?.status].label}</span>
    </Badge>
    <span className="text-muted-foreground text-sm">
      Last updated {dayjs(project?.updatedAt).fromNow()}
    </span>
  </div>

  {/* Timeline */}
  <div className="space-y-4">
    {project?.message.map((msg, i) => (
      <div key={i} className="bg-muted p-4 rounded-lg shadow-sm border">
        <p className="text-sm text-muted-foreground">{dayjs(msg.timestamp).format('MMM D, YYYY • h:mm A')}</p>
        <p className="text-base font-medium mt-1">{msg.from === "admin" ? "Admin" : "You"}</p>
        <p className="text-sm mt-1">{msg.message}</p>
      </div>
    ))}
  </div>

  {/* Code Delivery */}
  {
  project?.delivery?.codeLink && 
    <div className="mt-8 max-w-3xl mx-auto flex justify-between items-center p-6 bg-muted/20 hover:bg-muted/30 border border-green-500 rounded-lg">
        <div>
      <h3 className="text-lg font-semibold mb-2">Project Delivery</h3>
      <p className="text-sm text-muted-foreground">Code & resources have been delivered:</p>
      </div>
      <a
        href={"project.delivery.codeLink"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-2 block"
      >
        View Delivery Link
      </a>
      {
      project?.delivery?.notes && 
        <p className="text-sm mt-2 text-muted-foreground italic">Note: {project.delivery.notes}</p>
}
    </div>
  }
</div>

  )
}
