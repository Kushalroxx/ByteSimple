"use client"
import { serverUrl } from '@/lib/exportEnv'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
    const router = useRouter()
    useEffect(()=>{
        const signout = async()=>{
            await axios.get(`${serverUrl}/auth/signout`,{
                withCredentials:true
            })
        }
        signout().then(()=>{
            router.push("/signin")

        }).catch((error)=>console.log(error)
        )
    },[])
  return (
    <div>
    </div>
  )
}
