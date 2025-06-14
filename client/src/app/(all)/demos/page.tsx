import Demos from '@/components/sections/demos'
import { serverUrl } from '@/lib/exportEnv'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title: "ByteSimple - Demos",
  description:
    "Explore ByteSimple Demos — a showcase of our innovative, high-performance digital products, web apps, and software solutions built for real-world impact.",
  keywords: [
    "ByteSimple demos",
    "software demos",
    "product showcase",
    "web app examples",
    "UI/UX demos",
    "MVP demos",
    "ByteSimple portfolio",
    "frontend and backend demo",
    "digital product demos",
    "interactive web design showcase",
    "digital product demos",
    "web app demos",
    "mobile app demos",
    "custom software demos",
    "web development demos",
    "app development demos",
    "startup MVP demos",
    "eCommerce demos",
    "mobile app demos",
    "web app demos",
    "product design demos",
    "UI/UX demos",
    "software for startups",
    "agile development demos",
    "full-stack development demos",
    "cloud application demos",
    "SaaS demos",
    "digital product agency",
    "tech partner for startups",
    "software engineering demos",
    "cross-platform app demos",
    "Next.js demos",
    "React Native demos",
    "API integrations demos",
  ],
}
export default async function page() {
  const res = await fetch(`${serverUrl}/service-demo`,{next:{
    revalidate:604800
  }})  
  const data = await res.json()
  
  return (
    <div>
      <Demos serviceDemos={data.serviceDemo}/>
    </div>
  )
}
