import React from 'react'
import { ContactForm } from '../majorUi/contactForm'
import InViewAnimation from '../majorUi/inViewAnimation'

export default function Contact() {
    return (
        <div className='py-10 md:py-20'>
            <div className='mb-20'>
            <InViewAnimation delay={0.15}>
                <h1 className='text-foreground text-4xl md:text-7xl md:pt-14 w-3/4 md:w-3/4 font-extrabold px-5 md:px-10 leading-tight'>Let’s Build Your Digital Presence Together</h1>
            </InViewAnimation>
            <InViewAnimation delay={0.3}>
                <p className='text-foreground/55 mt-2 md:mt-6 break-words whitespace-normal md:text-lg px-5 md:px-10 md:w-[57%] tracking-wide'>We craft custom websites that do more than just look great — <br></br>they work strategically to solve your unique business challenges.     
                     Whether you need a seamless user experience, powerful functionality, or a full-scale redesign, our team brings deep expertise and a results-driven mindset to every project.
                    Let’s turn your ideas into a high-performing digital presence that drives engagement, builds trust, and grows your business.</p>
                    </InViewAnimation>
            </div>
                  
            <div className=' flex justify-center items-center gap-17'>
                <ContactForm />
            <div className=' md:flex flex-col mb-20 pt-6 hidden w-[38%]'>
            <h1 className='text-foreground text-4xl md:text-7xl md:pt-14 font-extrabold'>
                Let's get started today!
            </h1>

            <p className='text-foreground/55 md:text-lg mt-2 md:mt-6 break-words whitespace-normal pb-6 md:pb-0 tracking-wide'>
                Contact us, and let’s talk about how we can help you grow your business with a powerful, custom-built website.
            </p>
            </div>

            </div>
        </div>
    )
}
