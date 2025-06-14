import SignIn from '@/components/sections/SignIn'
import { serverUrl } from '@/lib/exportEnv';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {  
  const cookie = await cookies()
  const accessToken = cookie.get("accessToken")
  if(accessToken){
    redirect("/admin/dashboard")
  }
  return (
    <>
      <SignIn/>
    </>
  )
}
