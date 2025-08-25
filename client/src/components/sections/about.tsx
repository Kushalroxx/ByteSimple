"use client"
import React, {useRef} from 'react'
import { aboutInterFace } from '@/lib/interfaces';
import InViewAnimation from '../majorUi/inViewAnimation';
import { CardHeader } from '../ui';
import { useRouter } from 'nextjs-toploader/app';
import { motion } from 'framer-motion';
import { RainbowButton } from '../magicui/rainbow-button';

export default function About({ aboutArr }: {
  aboutArr?: aboutInterFace[]
}) {
  const router = useRouter()
  const aboutRef = useRef<HTMLDivElement>(null);
  const [underlineVisible, setUnderlineVisible] = React.useState(false);
  const handleClick = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className='bg-gradient-to-b from-black via-gray-950 to-black pt-24 px-2 pb-20 '>
      <div className="h-[80vh] flex flex-col justify-center px-6 md:px-12  ">
  <InViewAnimation delay={0.1}>
    <h3 className=" inline-block px-4 py-2 text-lg md:text-xl font-semibold text-orange-400 bg-orange-500/10 rounded-full">
       oh hey
    </h3>
  </InViewAnimation>

  {/* Main Heading */}
  <InViewAnimation delay={0.3}>
    <h1 className="mt-6 text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-white">
      We’re{" "}
      <span className="relative inline-block">
        <span onPointerEnter={() => setUnderlineVisible(true)} onPointerLeave={() => setUnderlineVisible(false)} className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">ByteXylon</span>
        <motion.span initial={{ width: "0%" }} animate={{ width: underlineVisible ? "100%" : "0%" }} transition={{ duration: 0.3 ,type:"tween"}} className={`absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full`}></motion.span>
      </span>
      <br />
      <span className="text-gray-300 font-[600]">Our work’s no Joke.</span>
    </h1>
  </InViewAnimation>
  <InViewAnimation delay={0.5}>
    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
  We blend strategy, design, and technology to help brands stand out, scale fast, and leave a lasting mark.
</p>
  </InViewAnimation>
<InViewAnimation delay={0.7}>
  <RainbowButton
  onClick={handleClick}
  className="mt-8 md:mt-10 py-5 md:py-6 md:text-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg shadow-xl shadow-white/10 border rounded-full"
>
  How We Made Brands Unforgettable{" "}
  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">↓</span>
</RainbowButton>

</InViewAnimation>
</div>

    <InViewAnimation>
  <h1 ref={aboutRef} className="mt-32 text-5xl md:text-6xl font-extrabold pb-4 text-center relative ">
    Who We Are
    <span className="block h-1 w-52 mb-4 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-2 rounded"></span>
  </h1>
</InViewAnimation>

<InViewAnimation>
  <CardHeader className="max-w-3xl mx-auto">
    <p className="text-white/90 text-xl md:text-2xl font-semibold mb-4">
      We turn bold ideas into websites that make people stop, look, and buy.
    </p>
    <p className="text-foreground/80 text-lg md:text-xl mb-4">
      Your business is <strong className="text-white">unique</strong> — your
      website should be <strong className="text-white">too</strong>. No
      cookie-cutter templates. No generic solutions. We craft sites that feel
      yours — and work <strong className="text-white">24/7</strong> to bring
      you customers, sales, and trust.
    </p>
    <p className="text-foreground/80 text-lg md:text-xl">
      No tech headaches. No wasted time. Just a clear, simple process that
      takes you from{" "}
      <strong className="text-white">“I need a website”</strong> to{" "}
      <strong className="text-white">“I love my website”</strong> — faster than
      you thought possible.
    </p>
<div className='flex justify-center'>

    <RainbowButton onClick={() => router.push("/contactus")} className='mt-8 md:mt-10 py-6 md:text-lg text-base font-semibold  transition-all duration-300 hover:shadow-lg shadow-xl shadow-white/10 border rounded-full'
    >
      Let’s Get Started
    </RainbowButton>
</div>
  </CardHeader>
</InViewAnimation>

    </div>
  )
}
