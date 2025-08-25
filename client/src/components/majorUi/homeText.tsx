"use client"
import Title from "./title"
import Description from "./description"
import InViewAnimation from "./inViewAnimation"
import { useRouter } from "nextjs-toploader/app"
import { TypingAnimation } from "../magicui/typing-animation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../ui"
import { RainbowButton } from "../magicui/rainbow-button"

const wordArr = ["Fast Sites", "Big Ideas", "Real Value", "Efficiency", "SEO Power", "Trust"];


function HomeText() {
  const [word, setWord] = useState(wordArr[0])
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      const index = wordArr.indexOf(word)
      const nextIndex = (index + 1) % wordArr.length
      setWord(wordArr[nextIndex])
    }, 3000)
    return () => clearInterval(interval)
  }, [word])

  return (
    <div 
      id="title" 
      className="px-[3%] pt-32 "
    >
      {/* Title with rotating word */}
      <div className="flex gap-3 md:gap-7 justify-center items-center">
        <InViewAnimation className="relative">
          <div className="relative">
          
            <Title className="relative text-4xl md:text-5xl lg:text-6xl leading-tight">
              Build
            </Title>
            <p className="sr-only">
              Fast, Responsive, Scalable, Secure, Modern websites built with ByteSimple.
            </p>
          </div>
        </InViewAnimation>
        
        <InViewAnimation >
          <div className="flex">
            <TypingAnimation 
              className="font-semibold text-4xl md:text-5xl lg:text-7xl text-foreground/90 leading-tight"
              key={word}
            >
              {word}
            </TypingAnimation>
            <motion.span
              className="ml-2 w-[3px] bg-foreground/90 rounded"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5 
              }}
            />
          </div>
        </InViewAnimation>
      </div>
      
      {/* Description */}
      <InViewAnimation className="flex justify-center items-center" >
        <div className="mt-10 md:mt-12 md:w-2/3 w-4/5 px-2">
          <Description className="text-lg lg:text-xl text-center text-gray-100">
          <>
            We build battle-tested, scalable platforms without bloated code or delays.
            <span className="font-semibold"> Everything tailored to your business goals.</span>
          </>
          </Description>
          
        </div>
      </InViewAnimation>
      
      {/* Buttons */}
      <InViewAnimation>
        <div className="flex flex-col justify-center sm:flex-row gap-5 md:gap-8 pt-8 md:pt-8 px-12 md:px-0" >
        <RainbowButton 
          variant="default" 
          onClick={() => router.push("/contactus")} 
          className="h-11 px-6 text-sm md:text-base font-semibold rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
          >
          Request a Quote
        </RainbowButton>
        <Button 
          variant="default" 
          onClick={() => router.push("/services")} 
          className="h-11 px-6 bg-black/60 border border-white/20 hover:bg-black text-white text-sm md:text-base font-semibold rounded-3xl"
          >
          See What We Do
        </Button>
          </div>
      </InViewAnimation>
    </div>
  )
}

export default HomeText