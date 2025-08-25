import React from 'react'
import { ContactForm } from '../majorUi/contactForm'
import InViewAnimation from '../majorUi/inViewAnimation'

export default function Contact() {
    return (
        <div className='py-5 md:py-10 mb-10'>
            <div className='mb-8 md:mb-12'>
            <InViewAnimation className='flex justify-center' delay={0.15}>
                <h1 className='text-foreground text-3xl md:text-5xl text-center font-extrabold px-5 md:px-10 leading-tight max-w-4xl'>Let’s Build Your Digital Presence Together</h1>
            </InViewAnimation>
            </div>
                  
            <InViewAnimation delay={0.3} className=' flex justify-center items-center gap-17'>
                <ContactForm />
                 </InViewAnimation>
        </div>
    )
}
