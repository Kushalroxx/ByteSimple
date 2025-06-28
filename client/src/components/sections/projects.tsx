"use client"
import React, { useEffect, useState } from 'react'
import { Button, Loader } from '../ui'
import { FaPlus } from "react-icons/fa6";
import axios, { AxiosError } from 'axios';
import { serverUrl } from '@/lib/exportEnv';
import { useRouter } from 'nextjs-toploader/app';
import { projectInterface } from '@/lib/interfaces';
import DisplayProjects from '../majorUi/displayProjects';
import InViewAnimation from '../majorUi/inViewAnimation';
import ProjectFilter from '../majorUi/projectFilter';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/atoms';

export default function Projects() {
    const [projects, setProjects] = useState<null|projectInterface[]>(null)
    const [shownProjects, setShownProjects ] = useState<null|projectInterface[]>(null)
    const [user, setUser] = useAtom(userAtom)
    const router = useRouter()
    useEffect(() => {
        async function fetchProjects(){
            try {
                console.log(user);
                
                if (!user) {
                    return
                }
                if (user?.type==="admin") {
                    const res = await axios.get(`${serverUrl}/super-admin/projects`,{withCredentials:true})
                    setProjects(res.data.projects)
                    setShownProjects(res.data.projects)
                }
                if (user.type==="user") {   
                    const res = await axios.get(`${serverUrl}/user/projects`,{withCredentials:true}) 
                    setProjects(res.data.projects)
                    setShownProjects(res.data.projects)
                }
            } catch (error) {
                console.log(error);
                
                if (error instanceof AxiosError) {
                    if(error.status === 401){
                        // router.push("/")
                    }
                    if(error.status === 404){
                        setProjects([])
                    }
                }
            }
        }
        fetchProjects()
    },[user])
    const onSelect = (value:string) => {
        if (value === "all") {
                setShownProjects(projects)
            } else {
                setShownProjects(projects&&projects.filter((project:projectInterface) => project.status === value))
            }
    }
    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setShownProjects(projects&&projects.filter((project) => project.projectTitle.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    if (projects===null) {
        return(
            <div className='h-[90vh] flex justify-center items-center'>
                <Loader/>
            </div>
        )
    }
  return (
    <div className='min-h-[90vh]'>
        <InViewAnimation delay={0.25}>
        <div className=' mt-3 md:pt-10 pb-10 flex  gap-8 justifybetween items-center'>
        <h1 className='text-4xl md:text-5xl font-extrabold'>Projects</h1>
        <Button onClick={() => router.push("/projects/new")} variant={"outline"} className='md:text-lg font-semibold py-5 text-sm'>
           <FaPlus className='w-7 h-7'/>
            Create project
        </Button>
        </div>
        </InViewAnimation>
        <ProjectFilter
        onSelect={onSelect}
        onInputChange={onInputChange}
        />
        <DisplayProjects projects={shownProjects} />
    </div>
  )
}
