"use client"
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui'
import { serverUrl } from '@/lib/exportEnv'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app'
import React from 'react'

export default function page() {
    const parms = useSearchParams()
    const token = parms.get('token')
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const router = useRouter()
    const [error, setError] = React.useState("")
    const handleReset = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
       if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
       }
       try {
        const res = await axios.post(`${serverUrl}/auth/forgot-password?token=${token}`,{
                password
            })
            router.replace("/")
       } catch (error) {
       }
    }
  return (
    <div className='h-[88vh] flex justify-center items-center'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Forgot Password</CardTitle>
            <p className='text-muted-foreground text-sm'>Please enter your new password</p>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col' onSubmit={handleReset}>
              <CardTitle className='text-md mb-2'>Password</CardTitle>
            <Input value={password} onChange={(e)=>{
              setError("")
              setPassword(e.target.value)}} type="text" placeholder="Password" />
            <CardTitle className='text-md mt-4 mb-2'>Confirm Password</CardTitle>
            <Input value={confirmPassword} onChange={(e)=>{
              setError("")
              setConfirmPassword(e.target.value)}} type="text" placeholder="Confirm Password" />
            {error && <p className='text-red-500'>{error}</p>}
            <Button className='mt-4 font-semibold' type='submit'>Reset Password</Button>
            </form>
          </CardContent>
        </Card>       

    </div>
  )
}
