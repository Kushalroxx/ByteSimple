"use client"
import { serverUrl } from '@/lib/exportEnv'
import { projectInterface } from '@/lib/interfaces'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import React, { useEffect } from 'react'
import { Loader, ScrollArea } from '../ui'
import ClientProjectTitle from '../majorUi/clientProjectTitle'
import ClientProjectDetails from '../majorUi/clientProjectDetails'
import ClientBudgetQuote from '../majorUi/clientBudgetQuote'
import MsgBubble from '../majorUi/msgBubble'
import AdminInitialQuote from '../majorUi/adminInitialQuote'

export default function AdminProject({ id }: { id: string }) {
    const router = useRouter()
    const [project, setProject] = React.useState<projectInterface | null>(null)
    const [open, setOpen] = React.useState(false)
    useEffect(() => {
        const getClientProject = async () => {
            try {
                const res = await axios.get(`${serverUrl}/super-admin/project/${id}`, { withCredentials: true })
                console.log(res.data);
                
                setProject(res.data.project)
            } catch (error) {
                console.log(error);
                
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
    },[])
    return (
        !project ?
            <div className='h-screen flex justify-center items-center'>
                <Loader />
            </div> :
            <ScrollArea onClick={() => setOpen(false)} className='md:mt-10 mb-10 h-[87vh] overflow-y-auto'>
                <ClientProjectTitle project={project} />
                <ClientProjectDetails project={project} />
                <ClientBudgetQuote project={project} />
                <MsgBubble open={open} setOpen={setOpen} project={project}  />
                <AdminInitialQuote project={project} setProject={setProject} />
            </ScrollArea>
    )
}
