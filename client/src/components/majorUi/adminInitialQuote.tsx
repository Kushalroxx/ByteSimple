import { projectInterface } from '@/lib/interfaces'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Input } from '../ui'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'

export default function AdminInitialQuote({project,
    setProject
}:{project:projectInterface|null,
    setProject:React.Dispatch<React.SetStateAction<projectInterface|null>>
}) {
    const [quote, setQuote] = React.useState<null|number>(null)
    const [error, setError] = React.useState<null|string>(null)
    const router = useRouter()
    const handleInitialQuote = async () => {
        if(!quote){
            setError("Quote is required")
            return
        }
        try {
            const res = await axios.post(`${serverUrl}/super-admin/project/${project?.clientQuote ? "final-quote" : "quote"}/${project?._id}`, project?.clientQuote?{ finalQuote:quote }:{ initialQuote:quote }, { withCredentials: true })
            setProject(res.data.project)
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.status === 400) {
                    setError(error.response?.data.message)
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
    if (!project) {
        return
    }
  return (
     <div className='max-w-6xl mx-auto px-4 py-8'>
        {(!project.initialQuote||!project.finalQuote) &&
    <>
    <div className="border-t">
    <h2 className="text-xl mt-4 font-semibold text-foreground mb-4">{project.clientQuote ? "Final Quote" : "Initial Quote"}</h2>
    {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
    <form className='flex items-center md:w-1/2 gap-4' onSubmit={(e) => e.preventDefault()} action="">
    <Input onChange={(e) => {
        setError(null)
        setQuote(parseInt(e.target.value))}} placeholder={`Create ${project.clientQuote ? "Final" : "Initial"} Quote`} type="number" className='w-full' />
     <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"outline"} type='submit' className='md:text-base text-sm font-semibold'>Create Quote</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm {project.clientQuote ? "Final" : "Initial"} Quote
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                You are about to create a {project.clientQuote ? "final" : "initial"} Quote of <span className='font-semibold text-foreground/90'>₹ {!!!quote?0:quote.toLocaleString()}</span> to the {project.clientQuote ? "client" : "admin"}.<br/>Once submitted, you’ll need to wait for client approval or a counter quote.<br/>Are you sure you want to continue?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className=' font-semibold' onClick={handleInitialQuote}>Submit {project.clientQuote ? "Final" : "Initial"} Quote</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
    </form>
    </div>
    </>
    }
     </div>
  )
}
