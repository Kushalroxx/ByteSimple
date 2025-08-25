"use client"
import React, { useState } from 'react'
import { Button, CardContent, CardHeader, CardTitle, Input, } from '../ui'
import { toast } from 'sonner'
import {z} from "zod"
import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import { DotLoader } from 'react-spinners'
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { FcGoogle} from "react-icons/fc"
import Link from 'next/link'
import { useAtom } from 'jotai'
import { userAtom } from '@/lib/atoms'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function SignIn({setOpen, setIsSignIn}:{
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  setIsSignIn:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useAtom(userAtom)
  const router = useRouter()
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8,"enter a valid password")
  })
  const handleForgotPassword = async() => {
    if (!email) {
      setError("Please enter your email")
      return
    }
    try {
      setLoading(true)
      const res = await axios.post(`${serverUrl}/auth/forgot-password`,{
        email
      })
      setLoading(false)
      toast("Email on its way!", {
  description: "You'll receive a password reset link shortly. Just follow it to create a new password.",
  duration: 5000,
});
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
  }
}
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
      console.log(error);
      
      if(error instanceof AxiosError){
        if(error.response?.data?.message){
          setError(error.response.data.message)
          return 
        }else{
          setError(error.message)
        }
      }
    }finally{
      setLoading(false)
    }
  }
  return (
 <>
  <CardHeader>
    <AlertDialogTitle className="text-lg md:text-xl font-bold">
      Hey there! <br></br> Welcome back 👋
    </AlertDialogTitle>
    <AlertDialogDescription className="text-muted-foreground text-sm mt-1">
      Please enter your Email and Password to sign in.
    </AlertDialogDescription>
  </CardHeader>

  <form onSubmit={(e) => e.preventDefault()}>
    <CardContent className="flex flex-col gap-4">
      <div>
        <CardTitle className="text-base mb-1">Email</CardTitle>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
      </div>

      <div>
        <CardTitle className="flex justify-between items-center mb-1">
          <span>Password</span>
          <span
          onClick={handleForgotPassword}
          className="text-sm text-blue-700 font-light hover:text-blue-600 cursor-pointer px-2"
          >
            forgot password
          </span>
        </CardTitle>
        <div className="relative">
          <Input
            className="pr-10"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowPassword((e) => !e)}
            className="absolute inset-y-0 right-0 px-3"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button disabled={loading} onClick={onSubmit} type="submit">
        {loading ? <DotLoader size={20} className="text-primary" /> : "Sign In"}
      </Button>

      <Link href={`${serverUrl}/auth/google`} className="w-full" passHref>
        <Button
          type="button"
          disabled={loading}
          variant="outline"
          className="w-full mt-1 gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>
      </Link>
    </CardContent>
  </form>
<div className='flex items-center justify-center'>
  <p className="text-sm text-muted-foreground">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsSignIn(false)}>Sign Up</span></p>
</div>
 
</>

  )
}

export default SignIn
