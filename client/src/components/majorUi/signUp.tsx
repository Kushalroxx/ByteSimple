"use client"
import React, { useState } from 'react'
import { Button, CardContent, CardHeader, CardTitle, Input, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui'
import {z} from "zod"
import { serverUrl } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import { DotLoader } from 'react-spinners'
import { FcGoogle} from "react-icons/fc"
import Link from 'next/link'
import { useAtom } from 'jotai'
import { userAtom } from '@/lib/atoms'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import OtpComp from './otpComp'

function SignUp({
    setOpen,
    setIsSignIn
}:{
  setIsSignIn:React.Dispatch<React.SetStateAction<boolean>>,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otpOpen, setOtpOpen] = useState(false)
  const schema = z.object({
    name: z.string().min(3,"Enter a valid name"),
    email: z.string().email(),
    password: z.string().min(8,"Enter a valid password"),
    confirmPassword: z.string().min(8,"Enter a valid password").refine((value) => value === password, "Passwords don't match")
  })

    const onSubmit = async() => {
    setError("")
    const data = schema.safeParse({email, password, name, confirmPassword})
    if (data.error?.errors[0]?.message) {
      setError(data.error.errors[0].message)
      return;
    }
    try {
      setLoading(true)
      const res = await axios.post(`${serverUrl}/auth/signup`,{
        name,
        email,
        password
      },{withCredentials:true})
        setLoading(false)
        setOtpOpen(true)
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
 <>
 <OtpComp email={email} password={password} name={name} setOpen={setOpen} otpOpen={otpOpen} setOtpOpen={setOtpOpen}/>
  <CardHeader>
    <CardTitle className="text-lg md:text-xl font-bold">
      Welcome to ByteSimple 👋
    </CardTitle>
    <p className="text-muted-foreground text-sm mt-1">
       Let’s get you started! Fill in your details to create an account.
    </p>
  </CardHeader>

  <form  onSubmit={(e) => e.preventDefault()}>
    <CardContent className="flex flex-col gap-4">
      <div>
        <CardTitle className="text-base mb-1 mt-4">Name</CardTitle>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
        />
      </div>
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
        <CardTitle className="text-base mb-1">Password
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
        <CardTitle className='text-base mb-1 mt-3'>Confirm Password</CardTitle>
          <Input
            className="pr-10"
            value={confirmPassword}
            onChange={(e) => {
              setError("");
              setConfirmPassword(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
          />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button disabled={loading} onClick={onSubmit} type="submit">
        {loading ? <DotLoader size={20} className="text-primary" /> : "Sign Up"}
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
  <p className="text-sm text-muted-foreground">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setIsSignIn(true)}>Sign In</span></p>
</div>
</>

  )
}

export default SignUp
