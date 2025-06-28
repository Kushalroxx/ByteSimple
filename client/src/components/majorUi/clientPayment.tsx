import React from 'react'
import { Badge, Button, Card, CardContent } from '../ui'
import { projectInterface } from '@/lib/interfaces'
import InViewAnimation from './inViewAnimation'

export default function ClientPayment({ project }: { project: projectInterface | null }) {
    const handleUpfrontPayment = () => {

    }
    return (
        project?.finalQuote &&
        <InViewAnimation delay={0.25}>
            <div className="max-w-6xl flex flex-col items-center mx-auto px-4 py-8 border-t">
                <h2 className="text-xl font-semibold mb-4 w-full">Payment</h2>

                <Card className='bg-background w-full md:w-2/3 hover:bg-muted/10'>
                    <CardContent className='space-y-3'>
                    {/* Final Quote */}
                    <div className="flex justify-between items-center">
                        <p className="">Final Quote</p>
                        <p className="text-xl font-bold text-primary">₹{project?.finalQuote.toLocaleString()}</p>
                    </div>

                    {/* Payment Type */}
                    <div className="flex justify-between items-center">
                        <p className="">Payment Type</p>
                        <Badge variant="outline" className="capitalize">{project?.paymentType}</Badge>
                    </div>

                    {/* Payment Status */}
                        <div className="flex justify-between">
                            <p>Upfront Payment (50%)</p>
                            {project?.payment.upfront
                                ? <Badge variant="default">Paid</Badge>
                                : <Button onClick={handleUpfrontPayment}>Pay ₹{Math.floor(project?.finalQuote / 2).toLocaleString()}</Button>
                            }
                        </div>

                        <div className="flex justify-between">
                            <p>Final Payment (50%)</p>
                            {project?.payment.final
                                ? <Badge variant="default">Paid</Badge>
                                : <Badge variant="secondary">Pending</Badge>
                            }
                        </div>
                            </CardContent>
                </Card>
            </div>
        </InViewAnimation >
    )
}
