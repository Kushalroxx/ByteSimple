import React, { use, useEffect, useRef, useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, Button, CardTitle, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useAtom } from 'jotai'
import { userAtom } from '@/lib/atoms'
import { useRouter } from 'nextjs-toploader/app'

export default function OtpComp({email, password, name, setOpen, otpOpen, setOtpOpen}:{
    otpOpen:boolean,
    setOtpOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    email:string,
    password:string,
    name:string}) { 
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useAtom(userAtom)
    const [error, setError] = useState("")
    const router = useRouter()
    const firstSlot =useRef<HTMLInputElement|null>(null)
    useEffect(() => {
        const timeOut = setTimeout(() => {
            firstSlot.current?.focus()
        }, 200)
        return () => clearTimeout(timeOut)
    },[otpOpen])
    const onOtpSubmit = async() => {
        setError("")
        try {
          setLoading(true)
          const res = await axios.post(`${serverUrl}/auth/signup/verify`,{
            email,
            password,
            name,
            otp
          },{withCredentials:true})
            setLoading(false)
            setUser(res.data)
            setOpen(false)
            setOtpOpen(false)
            if (res.data.type === "admin" || res.data.type === "super-admin") {
                router.push("/admin/dashboard")
                return
            }
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
        }
      }
    
  return (
    <AlertDialog open={otpOpen} onOpenChange={setOtpOpen}>
    <AlertDialogContent className='w-full flex flex-col' >
          <div className='mb-6'>
            <AlertDialogTitle className='text-lg md:text-xl font-bold mb-1'>Enter OTP</AlertDialogTitle>
            <AlertDialogDescription className='text-muted-foreground text-sm'>
              Enter the OTP sent to your email <span className='font-semibold text-foreground/90'>{email}</span>
            </AlertDialogDescription>
          </div>
          <form className='flex flex-col' onSubmit={onOtpSubmit} action="submit">
          <div className="flex flex-col justify-center items-center gap-2">
            <InputOTP ref={firstSlot} value={otp} onChange={e=>{
                setError("")
                setOtp(e)}} maxLength={6}>
          <InputOTPGroup >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <Button type='submit' onClick={onOtpSubmit} disabled={loading || otp.length !== 6} className='flex mt-4 font-medium'>Submit Otp</Button>
        </form>
        <AlertDialogFooter>
    <AlertDialogCancel className="absolute top-4 right-4 text-2xl px-2 hover:bg-muted rounded-md">
      ×
    </AlertDialogCancel>
  </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

  )
}
