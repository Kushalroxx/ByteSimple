import Contact from '@/components/sections/contact'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title:"ByteSimple - Contact us",
  description:"Have a project in mind or a question? Get in touch with ByteSimple — your trusted partner in building fast, user-centric digital solutions. Reach out via email, phone, or our online contact form.",
  keywords: [
    "ByteSimple contact",
    "web development agency contact",
    "software solutions support",
    "UI/UX design agency India",
    "hire developers",
    "custom software development",
    "MVP development",
    "mobile app development",
    "web application development",
    "full-stack development",
    "digital product development",
    "web development agency", 
    "eCommerce development",
    "software development company",
    "startup MVP development",
    "contact web design company",
    "ByteSimple email",
    "ByteSimple phone",
    "ByteSimple inquiry",
    "ByteSimple contact form",
    "ByteSimple support",
    "ByteSimple customer service",
    "ByteSimple customer care",
  ],
}
export default function page() {
  return (
    <div>
      <Contact/>
    </div>
  )
}
