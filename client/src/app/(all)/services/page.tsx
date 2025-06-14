import Services from '@/components/sections/services'
import { serverUrl } from '@/lib/exportEnv'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
   title: "ByteSimple - Services",
  description:
    "Discover the full range of services offered by ByteSimple — from UI/UX design and custom software development to MVP launches, web applications, mobile apps, and cloud solutions.",
  keywords: [
    "ByteSimple services",
    "software development services",
    "UI/UX design agency",
    "web application development",
    "mobile app development",
    "startup MVP services",
    "product design and development",
    "full-stack development",
    "custom software solutions",
    "cloud-based apps",
    "digital product agency",
    "web development agency",
    "tech partner for startups",
    "software engineering services",
    "software development company",
    "digital product development",
    "MVP development",
    "mobile app development",
    "custom software development",
    "web application development",
    "UI/UX design services",
    "full-stack development services",
    "cloud application development",
    "SaaS development",
    "digital product agency",
  ],
}
export default async function page() {
  const res = await fetch(`${serverUrl}/service`,{next:{
    revalidate:604800
  }})
  const data = await res.json()
  console.log(data);
  
  return (
    <div>
      <Services services={data.services}/>
    </div>
  )
}
