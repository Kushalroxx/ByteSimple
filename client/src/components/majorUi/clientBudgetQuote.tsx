import { projectInterface } from '@/lib/interfaces'
import React from 'react'
import { Badge } from '../ui'
import InViewAnimation from './inViewAnimation'

export default function ClientBudgetQuote({project}:{project:projectInterface|null}) {
    if (!project) {
        return
    }
  return (
    <InViewAnimation delay={0.25}>
    <div className="max-w-6xl mx-auto px-4 py-8">
  <h2 className="text-xl font-semibold text-foreground mb-4">Quote & Budget</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {/* Budget Range */}
    <div className="p-4 border rounded-lg shadow-sm hover:bg-muted/50">
      <p className="text-muted-foreground text-sm mb-1">Yours Budget Range</p>
      <p className="text-lg font-semibold text-primary">
        ₹{project.budget.min.toLocaleString()} - ₹{project.budget.max.toLocaleString()}
      </p>
    </div>

    {/* Payment Type */}
    <div className="p-4 border rounded-lg shadow-sm hover:bg-muted/50">
      <p className="text-muted-foreground text-sm mb-1">Payment Type</p>
      <Badge variant="outline" className="capitalize">{project.paymentType}</Badge>
    </div>

    {/* Initial Quote */}
    {
        project.initialQuote &&
        <div className="p-4 border rounded-lg shadow-sm hover:bg-muted/50">
      <p className="text-muted-foreground text-sm mb-1">Initial Quote (Admin)</p>
      <p className="text-lg font-semibold">₹{project.initialQuote.toLocaleString() || "—"}</p>
    </div>
    }

    {/* Client Quote */}
    {project.clientQuote && (
      <div className="p-4 border rounded-lg shadow-sm hover:bg-muted/50">
        <p className="text-muted-foreground text-sm mb-1">Client Counter Quote</p>
        <p className="text-lg font-semibold">₹{project.clientQuote.toLocaleString()}</p>
      </div>
    )}

    {/* Final Quote */}
    {project.finalQuote && (
      <div className="p-4 border border-green-600 rounded-lg shadow-sm bg-green-200 hover:bg-green-200/90">
        <p className="text-muted text-sm mb-1">Final Quote (Agreed)</p>
        <p className="text-lg font-semibold text-green-600">₹{project.finalQuote.toLocaleString()}</p>
      </div>
    )}
  </div>
</div>
    </InViewAnimation>
  )
}
