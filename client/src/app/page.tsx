import LandingPage from '@/components/sections/landingPage';
import { serverUrl } from '@/lib/exportEnv';
import React from 'react'

export default async function page() {
  const res = await fetch(`${serverUrl}/service-demo`,{next:{revalidate:604800}})
  const data = await res.json()
  const serviceDemo = data.serviceDemo
  const res2 = await fetch(`${serverUrl}/service`,{next:{revalidate:604800}})
  const data2 = await res2.json()
  const services = data2.services
  return (
    <div className='bg-black'>
      <LandingPage services={services} serviceDemo={serviceDemo}/>
    </div>

  );
}
