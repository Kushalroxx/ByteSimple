"use client"
import { serverUrl } from '@/lib/exportEnv'
import { projectInterface } from '@/lib/interfaces'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import React, { useEffect } from 'react'
import { Loader } from '../ui'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ClientProjectTitle from '../majorUi/clientProjectTitle'
import ClientProjectDetails from '../majorUi/clientProjectDetails'
import ClientBudgetQuote from '../majorUi/clientBudgetQuote'
import ClientQuoteAceptance from '../majorUi/clientQuoteAceptance'
import ClientPayment from '../majorUi/clientPayment'
import ClientMoniteringAndCodeLink from '../majorUi/clientMoniteringAndCodeLink'
import MsgBubble from '../majorUi/msgBubble'
dayjs.extend(relativeTime)

export default function ClientProject({ id }: { id: string }) {
    const [project, setProject] = React.useState<projectInterface | null>(null)
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    useEffect(() => {
        const getClientProject = async () => {
            try {
                const res = await axios.get(`${serverUrl}/user/projects/${id}`, { withCredentials: true })
                console.log(res.data.project);

                setProject(res.data.project)
            } catch (error) {

                if (error instanceof AxiosError) {
                    if (error.status === 500) {

                    }
                    if (error.status === 404) {
                        router.push("/not-found")
                    }
                    if (error.status === 401) {
                        router.push("/")
                    }
                }
            }
        }
        getClientProject()
    }, [])
    return (
        !project ?
            <div  className='h-screen flex justify-center items-center'>
                <Loader />
            </div> :
            <div onClick={() => setOpen(false)} className='md:mt-10 mb-10 min-h-screen'>
                <ClientProjectTitle project={project} />
                <ClientProjectDetails project={project} />
                <ClientBudgetQuote project={project} />
                <ClientQuoteAceptance project={project} setProject={setProject} />
                <ClientPayment project={project} />
                <ClientMoniteringAndCodeLink project={project} />
                <MsgBubble open={open} setOpen={setOpen} project={project}  />
            </div>
    )
}
