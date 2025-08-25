"use client"
import React, { useEffect } from 'react'
import { dashboardInterface } from '@/lib/interfaces'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'
import { Loader } from '@/components/ui'
import DashboardCards from '../majorUi/DashboardCards'
import { useAtom } from 'jotai'
import { userAtom } from '@/lib/atoms'

function Dashboard() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = React.useState<dashboardInterface|null>(null)
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    const dashboard = async () => {
      try {
        if (user?.type==="admin"||user?.type==="subAdmin") {
          const res = await axios.get(`${serverUrl}/admin/dashboard`,{
            withCredentials:true
          })
          setDashboardData(res.data)
          return
        }
        if (user?.type==="user") {
          
        }
        
      } catch (error) {
        if (error instanceof AxiosError) {
          if(error.status === 401){
            router.push("/")
          }}
      }}
      dashboard()
},[user])
if (dashboardData === null) {
  return (
    <div className='h-[85vh] flex justify-center items-center'>
      <Loader/>
    </div>
  )
}
  return (
    <div className='flex flex-wrap justify-center gap-2 pt-7 bg-background/90 items-start h-screen w-full px-2'>
      {
        dashboardData && <>
        <DashboardCards name="Total Contacts" count={dashboardData.data[0].noOfContact}/>
        <DashboardCards name="Total Blogs" count={dashboardData.data[1].noOfBlogs}/>
        <DashboardCards name="Total Services" count={dashboardData.data[2].noOfServices}/>
        <DashboardCards name="Total Services Demos" count={dashboardData.data[3].noOfServicesDemo}/>
        </>
      }
          </div>
  )
}

export default Dashboard
