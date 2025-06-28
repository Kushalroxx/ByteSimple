"use client"
import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../ui'
import {z} from "zod"
import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import { DotLoader } from 'react-spinners'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FcGoogle} from "react-icons/fc"
import Link from 'next/link'
import { useAtom } from 'jotai'
import { userAtom } from '@/lib/atoms'

function SignIn({children, open, setOpen}:{children:React.ReactElement|string,
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useAtom(userAtom)
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
        setLoading(false)
        setOpen(false)
        console.log(res.data);
        setUser(res.data.user)
        if (res.data.user.type==="admin"||res.data.user.type==="subAdmin") {
          router.push("/admin/dashboard")
        }else{
          router.push("/dashboard")
        }
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
        <CardHeader>
            <AlertDialogTitle className=''>
                Hey there! Welcome back 👋
                </AlertDialogTitle>
                 <AlertDialogTitle className='text-muted-foreground text-sm'>
                Please enter your Email and Password to sign in.
                </AlertDialogTitle>
            </CardHeader>
          <form onSubmit={(e) => e.preventDefault()}>
        <CardContent className=' flex flex-col'>
            <CardTitle className='text-base md:text-md mb-2'>
                Email
            </CardTitle>
            <Input 
            type='email'
            value={email} 
            onChange={(e) => {
              setError("")
              setEmail(e.target.value)
            }}/>
            <CardTitle className=' text-base md:text-md my-2'>
                Password
            </CardTitle>
            <Input
            value={password}
            onChange={(e) => {
              setError("")
              setPassword(e.target.value)
            }}
            type='password'/>
            <p className=' text-red-500'>{error}</p>
            <Button disabled={loading} onClick={() => onSubmit()} type='submit' className='mt-4'>{loading?<DotLoader size={20} className=' text-primary'/>:"Sign In"}</Button>
            <Link className='w-full'  href={`${serverUrl}/auth/google`}>
            <Button disabled={loading} className='w-full mt-3'><FcGoogle/>Continue with Google</Button></Link>
        </CardContent>
            </form>
    <AlertDialogFooter>
      <AlertDialogCancel className='absolute top-3 hover:bg-foreground/5 px-2 rounded-lg text-2xl right-5'>×</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
          </AlertDialog>
  )
}

export default SignIn
