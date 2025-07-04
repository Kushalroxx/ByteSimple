import { projectInterface } from '@/lib/interfaces'
import React from 'react'
import { Badge } from '../ui'
import InViewAnimation from './inViewAnimation'

export default function ClientProjectDetails({project}:{project:projectInterface|null}) {
  return (
    <InViewAnimation delay={0.29}>
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">Project Description</h2>
                    <p className="text-muted-foreground">{project?.projectDescription}</p>
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">Tech Stack</h2>
                    {
                        project?.techPreference &&
                        <div className="flex flex-wrap gap-2">
                        {project?.techPreference.map((tech, i) => (
                            <Badge className='hover:bg-muted' key={i} variant="outline">{tech}</Badge>
                        ))}
                    </div>
                    }
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">Design Preference</h2>
                    <p className="text-muted-foreground italic">
                        {project?.designPreference || "No specific preference"}
                    </p>
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">Urgency & Type</h2>
                    <div className="flex gap-4">
                        <Badge variant="secondary">{project?.urgency}</Badge>
                        <Badge variant="default">{project?.projectType}</Badge>
                    </div>
                </div>

                {
                    project?.projectLink &&
                    <div className="md:col-span-2 space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">Project Link</h2>
                        <a
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {project.projectLink}
                        </a>
                </div>
                }
            </div>
            </InViewAnimation>
  )
}
