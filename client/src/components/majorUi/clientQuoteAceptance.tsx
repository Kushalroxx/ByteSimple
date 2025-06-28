import { projectInterface } from '@/lib/interfaces'
import React from 'react'
import {
    Button,
    Input,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui'
import InViewAnimation from './inViewAnimation'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'

export default function ClientQuoteAceptance({ project, setProject }: { project: projectInterface | null , setProject: React.Dispatch<React.SetStateAction<projectInterface | null>> }) {
    const [clientQuote, setClientQuote] = React.useState<number|undefined>()
    const router = useRouter()
    const [error, setError] = React.useState<null|string>(null)
    const handleClientAccept = async () => {
        try {
            const res = await axios.post(`${serverUrl}/user/project/client-quote/${project?._id}`, { clientQuote:project?.initialQuote }, { withCredentials: true })
            setProject(res.data.project)
        } catch (error) {
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
    const handleClientQuote = async () => {
        if (!clientQuote) {
            setError("Quote is required")
            return
        }
        try {
            const res = await axios.post(`${serverUrl}/user/project/client-quote/${project?._id}`, { clientQuote }, { withCredentials: true })
            setProject(res.data.project)

        } catch (error) {
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
    return (
        !project?.finalQuote && project?.initialQuote && !project?.clientQuote &&
        <InViewAnimation delay={0.25}>
        <div className="max-w-6xl mx-auto px-4 py-8 border-t">
            <h2 className='text-xl font-semibold text-foreground mb-4'>Respond to Quote</h2>
            <p className='text-muted-foreground font-medium mb-2 '>Initial Quote:  <span className='text-primary'> ₹{project?.initialQuote.toLocaleString()}</span></p>
            {error && <p className='text-red-500 font-medium mb-2'>{error}</p>}
            <div className='flex flex-col md:flex-row gap-4'>
                <form className='flex gap-2 items-center' onSubmit={(e) => e.preventDefault()} action="">
                    <Input onChange={(e) => {
                        setError(null)
                        setClientQuote(parseInt(e.target.value))}} placeholder='Counter Quote' type="number" className='w-full' />
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"outline"} type='submit' className='md:text-base text-sm font-semibold'>Counter Quote</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Your Counter Offer
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                You are about to propose a counter offer of <span className='font-semibold text-foreground/90'>₹ {!!!clientQuote?0:clientQuote.toLocaleString()}</span> to the admin.<br/>Once submitted, you’ll need to wait for admin approval or a final quote.<br/>Are you sure you want to continue?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className=' font-semibold' onClick={e=>handleClientQuote()}>Submit Counter Offer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </form>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className='md:text-base text-sm font-semibold'>Accept Quote</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to accept this quote?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.<br/> Accepting this quote means you agree to the proposed amount and the project will move to the next stage.<br/> Make sure everything looks good before continuing.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className=' font-semibold' onClick={e=>{
                                handleClientAccept()}}>Confirm & Accept Quote</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
        </InViewAnimation>
    )
}
