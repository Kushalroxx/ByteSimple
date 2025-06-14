"use client"
import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../ui'
import {z} from "zod"
import { serverURL } from '@/lib/exportEnv'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'nextjs-toploader/app'
import { Loader } from '../ui'

function SignIn() {
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
      const res = await axios.post(`${serverURL}/auth/signin`,{
        email,
        password
      },{withCredentials:true})
      console.log(res);
      
        setLoading(false)
        router.push("/dashboard")
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
  if (loading) {
    return (
      <Loader/>
    )
  }
  return (
    <div className='flex justify-center items-center h-screen bg-background'>
      <Card className='w-full sm:w-3/4 lg:w-1/3 px-3 py-9'>
        <CardHeader>
            <CardTitle className=' text-lg md:text-2xl sm:text-3xl'>
                Sign In
                </CardTitle>
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
        </CardContent>
            </form>
      </Card>
    </div>
  )
}

export default SignIn
