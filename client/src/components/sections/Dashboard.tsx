"use client"
import React, { useEffect } from 'react'
import { dashboardInterface } from '@/lib/interfaces'
import axios, { AxiosError } from 'axios'
import { serverUrl } from '@/lib/exportEnv'
import { useRouter } from 'nextjs-toploader/app'
import { Loader } from '@/components/ui'
import DashboardCards from '../majorUi/DashboardCards'

function Dashboard() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = React.useState<dashboardInterface|null>(null)
  useEffect(() => {
    const dashboard = async () => {
      try {
        const res = await axios.get(`${serverUrl}/admin/dashboard`,{
          withCredentials:true
        })
        console.log(res.data);
        
        setDashboardData(res.data)
      } catch (error) {
        if (error instanceof AxiosError) {
          if(error.status === 401){
            router.push("/signin")
          }}
      }}
      dashboard()
},[])
if (dashboardData === null) {
  return (
    <Loader/>
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
