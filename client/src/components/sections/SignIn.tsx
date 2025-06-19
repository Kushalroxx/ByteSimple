"use client"
import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../ui'
import {z} from "zod"
import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import { Loader } from '../ui'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FcGoogle} from "react-icons/fc"
import Link from 'next/link'

function SignIn({children, open, setOpen}:{children:React.ReactElement|string,
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8,"enter a valid password")
  })

  const onSubmit = async() => {   
    setError("")
    const data = schema.safeParse({email, password})
    if (data.error?.errors[0]?.message) {
      setError(data.error.errors[0].message)
      return;
    }
    try {
      setLoading(true)
      const res = await axios.post(`${serverUrl}/auth/signin`,{
        email,
        password
      },{withCredentials:true})
      console.log(res);
        setLoading(false)
        router.push("/admin/dashboard")
    } catch (error:any) {
      setLoading(false)
      if(error instanceof AxiosError){
        if(error.response?.data?.message){
          setError(error.response.data.message)
          return 
        }else{
          setError(error.response?.data)
        }
      }
    }finally{
      setLoading(false)
    }

  }
  return (
   <AlertDialog open={open} onOpenChange={e=>setOpen(e=>!e)}>
  <AlertDialogTrigger>{children}</AlertDialogTrigger>
  <AlertDialogContent>
  {
    loading? <Loader/>:
    <>
        <CardHeader>
            <AlertDialogTitle className=' text-lg md:text-2xl sm:text-3xl'>
                Sign In
                </AlertDialogTitle>
            </CardHeader>
          <form onSubmit={(e) => e.preventDefault()}>
        <CardContent className=' flex flex-col'>
            <CardTitle className='text-base md:text-lg mb-2'>
                Email
            </CardTitle>
            <Input 
            type='email'
            value={email} 
            onChange={(e) => {
              setError("")
              setEmail(e.target.value)
            }}/>
            <CardTitle className=' text-base md:text-lg mb-2'>
                Password
            </CardTitle>
            <Input
            value={password}
            onChange={(e) => {
              setError("")
              setPassword(e.target.value)
            }}
            type='password'/>
            <p className=' mt-2 text-red-500'>{error}</p>
            <Button onClick={() => onSubmit()} type='submit' className='mt-8 '>Sign In</Button>
            <p className='text-center my-1'>or</p>
            <Link className='w-full'  href={`${serverUrl}/auth/google`}>
            <Button className='w-full'><FcGoogle/>Continue with Google</Button></Link>
        </CardContent>
            </form>
    <AlertDialogFooter>
      <AlertDialogCancel className='absolute top-3 hover:bg-foreground/5 px-2 rounded-lg text-2xl right-5'>×</AlertDialogCancel>
    </AlertDialogFooter>
    </>
  }
  </AlertDialogContent>
          </AlertDialog>
  )
}

export default SignIn
