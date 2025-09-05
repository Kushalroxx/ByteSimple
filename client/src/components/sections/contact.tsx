"use client"
import React, { useState } from 'react'
import { ContactForm } from '../majorUi/contactForm'
import InViewAnimation from '../majorUi/inViewAnimation'
import { Loader } from '../ui'

export default function Contact() {
    const [loading, setLoading] = useState(false)
    if (loading) {
            return(<div className='h-screen flex justify-center items-center'><Loader/></div>)
          }
    return (
        <div className='pt-29 md:pt-32 mb-10'>
            <div className='mb-8 md:mb-12'>
            <InViewAnimation className='flex justify-center' delay={0.15}>
                <h1 className='text-foreground text-3xl md:text-5xl text-center font-extrabold px-5 md:px-10 leading-tight max-w-4xl'>Let’s Build Your Digital Presence Together</h1>
            </InViewAnimation>
            </div>
                  
            <InViewAnimation delay={0.3} className=' flex justify-center items-center px-4'>
                <ContactForm loading={loading} setLoading={setLoading}/>
                 </InViewAnimation>
        </div>
    )
}
